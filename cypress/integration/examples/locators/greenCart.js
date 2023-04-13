import greenCart_locators from '../../pageObjects/greenCart_locators.js'

describe('locators using css selectors - class', () => {
    it('locators by class test', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        greenCart_locators.verify_product_added_to_cart();

    })


})