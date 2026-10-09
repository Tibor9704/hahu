describe('Használtautó.hu - Parkolóba rakom gomb', () => {

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

  it('2/b - Parkolóba rakom gomb kattintása nem bejelentkezett felhasználó esetén', () => {
    // Parkolóba rakom gomb megkeresése és kattintás
    cy.get('[data-controller="details--parking-button"]')
      .should('be.visible')
      .click();

    // Ellenőrzés: Mivel nincs bejelentkezve a felhasználó, felugrik a bejelentkezési ablak
    cy.get('#loginModal-title', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Bejelentkezés');

  });

});