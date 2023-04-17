const { html } = require("common-tags");

describe('checkbox test using local html page', () => {
  it('unchecks all the checked check boxes so no checks are left', () => {
    cy.visit({
        url: 'cypress/integration/html/checkbox.html',
        method: 'GET',
      })
    cy.get('input[type="checkbox"]:checked')
    .then($checkboxes => {
       cy.wrap($checkboxes).each($checkbox => {
          cy.wrap($checkbox).uncheck();
       })
    })
    cy.get('input[type="checkbox"]:checked').should('not.exist');
  });
});