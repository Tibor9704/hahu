describe('Használtautó.hu - Regisztráció mező validációk', () => {

  beforeEach(() => {
    // Navigáció a regisztrációs oldalra (failOnStatusCode engedélyezve a biztonsági válaszok kezelésére)
    cy.visit('https://www.hasznaltauto.hu/regisztracio', {
      failOnStatusCode: false
    });

    // Cookie banner elfogadása
    cy.get('body').then(($body) => {
      if ($body.find('#onetrust-accept-btn-handler').length > 0) {
        cy.get('#onetrust-accept-btn-handler').click();
      }
    });
  });

  it('1. E-mail mező validáció - Érvénytelen formátum esetén hibaüzenet jelenik meg', () => {
    // E-mail mező kiválasztása és hibás formátum beírása
    cy.get('input[name="email"]', { timeout: 10000 })
      .should('be.visible')
      .type('invalid_email_format');

    // Kijelölés elvétele a mezőről a validáció kiváltásához
    cy.get('input[name="email"]').blur();

    // Hibaüzenet ellenőrzése
    cy.get('input[name="email"]')
      .parents('.MuiFormControl-root')
      .find('.MuiFormHelperText-root.Mui-error')
      .should('be.visible');
  });

  it('2. Jelszó mező validáció - Üresen hagyás / blur esetén hibaüzenet jelenik meg', () => {
    // Jelszó mező kijelölése majd elhagyása kitöltés nélkül
    cy.get('input[name="password"]', { timeout: 10000 })
      .should('be.visible')
      .focus()
      .blur();

    // Hibaüzenet szövegének és láthatóságának ellenőrzése
    cy.get('input[name="password"]')
      .parents('.MuiFormControl-root')
      .find('.MuiFormHelperText-root.Mui-error')
      .should('be.visible')
      .and('contain', 'A mező kitöltése kötelező.');
  });

  it('3. E-mail megerősítés (confirmEmail) mező validáció - Eltérő érték esetén hibaüzenet', () => {
    // Megerősítő e-mail mező kitöltése
    cy.get('input[name="confirmEmail"]', { timeout: 10000 })
      .should('be.visible')
      .type('different_email@domain.com')
      .blur();

    // Hibaüzenet ellenőrzése
    cy.get('input[name="confirmEmail"]')
      .parents('.MuiFormControl-root')
      .find('.MuiFormHelperText-root.Mui-error')
      .should('be.visible');
  });

});