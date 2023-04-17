/// <reference types="cypress" />


describe('check() - checkbox and radio test', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions')
    })

    it('check() - check a specific check box', () => {
        cy.get('.action-checkboxes [value="checkbox1"]').check().should('be.checked')
    })

    it('check() - check all check boxes that is not disabled', () => {
        cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked')
    })

    it('check() - display text of all check boxes', () => {
        cy.get('.action-checkboxes [type="checkbox"]')
        .then($cbs => {
            cy.wrap($cbs).each(($el, indix, $list) => {
                const labelText = $el.parent().text().trim();
                cy.task("log", labelText);            
            })
        })
    })

    it('check() - check first check box', () => {
        cy.get('.action-checkboxes [type="checkbox"]').first().check()
        .should('be.checked')
    })

    it('check() - check last check box', () => {
        cy.get('.action-checkboxes [type="checkbox"]').last().check()
        .should('be.checked')
    })

    it('check() - check check box by index', () => {
        cy.get('.action-checkboxes [type="checkbox"]').eq(2).check()
        .should('be.checked')
    })

    it('check(value) - check a checkbox using specific value', () => {
        cy.get('.action-multiple-checkboxes [type="checkbox"]').check('checkbox1')
        .should('be.checked')

    })

    it('check([value1, value2]) - check multiple checkboxes using values', () => {
        cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox2', 'checkbox3'])
        .should('be.checked')
    })

    it('uncheck() - uncheck all check boxes that is not disabled', () => {
        cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked')
    })

    it('uncheck(value) - check a checkbox using specific value', () => {
        cy.get('.action-check [type="checkbox"]').uncheck('checkbox3')
        .should('not.be.checked')
    })
    it('check([value1, value2]) - check multiple checkboxes using values', () => {
        cy.get('.action-check [type="checkbox"]').uncheck(['checkbox1', 'checkbox3'])
        .should('not.be.checked')
    })
    it('check() - check last radio box that is not disabled', () => {
        cy.get('.action-radios [type="radio"]').not('[disabled]').check().should('be.checked')
    })
    it('check() - check specific radio box that is not disabled', () => {
        cy.get('.action-radios [type="radio"]').not('[disabled]').check('radio1').should('be.checked')
    })
})
