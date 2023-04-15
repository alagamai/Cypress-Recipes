/// <reference types="cypress" />
import { faker }  from '@faker-js/faker'
const { split } = require("lodash");


const ELEMENTS = {
    BUTTON_SELECTOR : 'a',
    BUTTON_TEXT : 'Button',
    CONTACT_NAME : '#et_pb_contact_name_0',
    CONTACT_EMAIL : '#et_pb_contact_email_0',
    CONTACT_MSG: '#et_pb_contact_message_0',
    CAPTCHA: 'input.et_pb_contact_captcha',
    CAPTCH_ANSWER: '[name="et_pb_contact_captcha_0"]',
    FIRST_DIGIT:   'data-first_digit',
    SECOND_DIGIT: 'data-second_digit',
    SUCC_MSG: 'et-pb-contact-message',
}

let cnt;
let captcha_ans

class submit_form_locators_pom {
    getButton() {
        //cy.contains(selector, content)
        return cy.contains(ELEMENTS.BUTTON_SELECTOR, ELEMENTS.BUTTON_TEXT)
    }

    clickButton() {
        this.getButton.click()
    }

    getContactName() {
        return cy.get(ELEMENTS.CONTACT_NAME)
    }

    enterContactName(name) {
        this.getContactName().type(name) 
        this.getContactName().should('have.value', name)
    }

    getContactEmail() {
        return cy.get(ELEMENTS.CONTACT_EMAIL)
    }

    enterContactEmail(email) {
        this.getContactEmail().type(email) 
        this.getContactEmail().should('have.value', email)
    }

    getContactMsg() {
        return cy.get(ELEMENTS.CONTACT_MSG)
    }

    enterContactMsg(msg) {
        this.getContactMsg().type(msg) 
        this.getContactMsg().should('have.value', msg)
    }


    getCaptchaQuestion() {
        return new Promise((resolve, reject) => {
            cy.get(ELEMENTS.CAPTCHA).invoke('attr', ELEMENTS.FIRST_DIGIT).then(dig1 => {
                cy.get(ELEMENTS.CAPTCHA).invoke('attr', ELEMENTS.SECOND_DIGIT).then(dig2 => {
                  cy.task("log", "display sum *** " + dig1 + dig2)
                  let sum = parseInt(dig1) + parseInt(dig2)
                   cy.task("log", "display sum *** " + sum )
                   this.captcha_ans = sum;
                   resolve(sum);
                 })
            })
         })
    }

    fillCaptchaAnswer(sum) {
        cy.get(ELEMENTS.CAPTCH_ANSWER).type(sum)
    }

    clickSubmitButton() {
        cy.contains(`button`, `Submit`).click()
    }

    submit_contact_form() {
        this.enterContactName(faker.name.firstName())
        this.enterContactEmail(faker.internet.email())
        this.enterContactMsg("test message")
        this.getCaptchaQuestion().then(ans => {
            this.fillCaptchaAnswer(ans);
        })
        this.clickSubmitButton()
        cy.wait(2000)
        cy.contains(`p`, `Thanks for contacting us`).should('be.visible')

    }

}

module.exports = new submit_form_locators_pom()