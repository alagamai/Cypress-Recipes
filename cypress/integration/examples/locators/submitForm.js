import submit_form from '../../pageObjects/submit_form_locators_pom.js';
import greenCart_locators from '../../pageObjects/submit_form_locators_pom.js'

describe('locators using css selectors - id, class, contains', () => {
    it('locators by id and class', () => {
        cy.visit('https://ultimateqa.com/complicated-page');
        submit_form.submit_contact_form();


    })


})