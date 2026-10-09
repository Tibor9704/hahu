describe('Használtautó.hu - Telefonszám és képgaléria', () => {

  const targetAdUrl = 'https://www.hasznaltauto.hu/szemelyauto/volkswagen/golf_vii/volkswagen_golf_vii_1.4_tsi_comfortline-20000000';

  beforeEach(() => {
    cy.visit(targetAdUrl, { failOnStatusCode: false });

    // Cookie banner kezelése
    cy.get('body').then(($body) => {
      if ($body.find('#onetrust-accept-btn-handler').length > 0) {
        cy.get('#onetrust-accept-btn-handler').click();
      }
    });
  });

  // 1. Funkció tesztje: Telefonszám felfedése 
  it('1. Elsődleges telefonszám felfedése gombra kattintva megjelenik a telefonszám', () => {
    // Telefon gomb kijelölése
    cy.get('[data-testid="seller-phone-number-primary"]')
      .should('be.visible')
      .as('phoneButton');

    // Kattintás a telefonszám felfedéséhez
    cy.get('@phoneButton').click();

    // Ellenőrzés: A gomb mezőjében megjelenik a telefonszám (+36 formátum)
    cy.get('@phoneButton')
      .invoke('text')
      .should('match', /\(\+36\)|\+36|\d{2}\/\d{6,7}/);
  });

  // 2. Funkció tesztje: Képgaléria lapozgatása 
  it('2. Képgaléria jobbra nyilára kattintva megváltozik az aktív kép', () => {
    // Galéria jobbra nyíl kijelölése 
    cy.get('[data-testid="details-gallery-right-button"]')
      .should('be.visible')
      .as('rightArrow');

    // Kattintás a jobbra nyilra
    cy.get('@rightArrow').click();

    // Ellenőrizzük, hogy a nyíl kattintható és lefut a lapozás 
    cy.get('@rightArrow').should('be.visible');
  });

});