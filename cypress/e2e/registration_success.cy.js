describe('Használtautó.hu - Sikeres regisztráció', () => {

  it('Sikeres regisztrációs folyamat kitöltése', () => {
    cy.visit('https://www.hasznaltauto.hu/regisztracio', {
      failOnStatusCode: false
    });

    // Cookie banner elfogadása
    cy.get('body').then(($body) => {
      if ($body.find('#onetrust-accept-btn-handler').length > 0) {
        cy.get('#onetrust-accept-btn-handler').click();
      }
    });

    // Egyedi e-mail generálása
    const timestamp = Date.now();
    const testEmail = `test_automation_${timestamp}@mailinator.com`;

    // 1. Név kitöltése
    cy.get('input[name="name"]', { timeout: 10000 })
      .should('be.visible')
      .type('Teszt Elek');

    // 2. E-mail és E-mail megerősítés kitöltése
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="confirmEmail"]').type(testEmail);

    // 3. Irányítószám kitöltése 
    cy.get('input[role="combobox"]').type('1051');

    // 4. Jelszó és Jelszó megerősítés kitöltése
    cy.get('input[name="password"]').type('BiztonsagosJelszo123!');
    cy.get('input[name="confirmPassword"]').type('BiztonsagosJelszo123!');

    // 5. ÁSZF és Adatvédelem elfogadása
    cy.get('input[type="checkbox"]').check({ force: true });

    // 6. Regisztráció gomb megnyomása
    cy.get('button[data-testid="submit-button"]').click();

    // 7. Sikeres regisztráció vagy átirányítás ellenőrzése
    cy.url().should('include', '/sikeres-regisztracio');
  });

});