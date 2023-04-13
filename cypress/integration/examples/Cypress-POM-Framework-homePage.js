// import class and create object for class 

import { writeFile } from 'fs'
import '../pageObjects/homePage'
import homePage from '../pageObjects/homePage'
import { faker } from '@faker-js/faker'
const data  = require('../../fixtures/home-page.json')

describe('test pom', () => {
    it('generate fixture file', () => {
        const randomIndex = Math.floor(Math.random() * 2); // generate a random integer between 0 and 1
        const empStatus = randomIndex === 0 ? "Student" : "Employed"; // use a ternary operator to select a string based on the random index
        const gender = randomIndex === 0 ? "Male" : "Female";
        const data = []
        const homeData = {
            name : faker.name.firstName(),
            email: faker.internet.email(name),
            password: 'pass@123',
            gender: gender,
            status: empStatus

        }
        //data.push(homeData)
        let jsonData = JSON.stringify(homeData, null, 2);

        cy.writeFile('./cypress/fixtures/home-page.json', jsonData, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          })

    })
    it('Submit form', () => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
       // const hp = new homePage();
        homePage.enterName(data.name);
        homePage.enterPassword(data.password)
        homePage.enterEmail(data.email)
        homePage.setGender(data.gender)
        //cy.pause()
        homePage.setEmpStatus(data.empStatus)
    })

})