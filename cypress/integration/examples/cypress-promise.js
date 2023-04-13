/// <reference types="cypress" />

const { hidden } = require("colorette");

function cyPromiseTest() {
    return new Cypress.Promise((resolve, reject) => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.brand.greenLogo')
    .then((e) => {
        cy.task("log", "heading +++" +   e.text() )
        resolve(e.text())
    })
 
    //reject('error oops!')
})
}


describe('promise test', () => {
    it('Cypress Promise test', () => {
        cyPromiseTest().then(msg => {
            cy.task("log", msg)
        }).catch(err => {
            cy.task("log", err)
        })

    })
    it('promise1', () => {
      
       cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.brand.greenLogo').should('be.visible')
        .then((e) => {
            cy.task("log", "heading +++" +   e.text() )
        })
    })
    it('promise2', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.url()
        .then((u) => {
            cy.task("log", u)
            cy.task("log", u.split('/'))
        })
    })
    // find hidden elements in the page 
    it('promise3', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.product:visible')
        .then(($cnt) => {
            cy.task("log", "Found " + $cnt.length)
        })
        
    })

    it('promise4', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.product-action').first()
        .then(($cnt) => {
            cy.task("log", "Found " + $cnt.length)
            cy.wrap($cnt).click({force : true})
        })
        
    })
})