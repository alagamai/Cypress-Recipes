// using cypress-mongodb plug in, drop collection, insert one or many records
const mongo = require('cypress-mongodb');
import { faker } from '@faker-js/faker';
import { func } from 'assert-plus';


function getRandVal() {
    return Math.floor(Math.random() * 9990001) + 10000;
}


describe("cypress-mondgo test", () => {
    it ("insert one record test", () => {  
       //env set up for cypress-mongodb plugin
       Cypress.env('mongodb', { uri: 'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai' });
        //    cy.dropCollection('test').then(res => {
        //     cy.log(res); // Error object if collection doesn’t exist
        // });
        const data1 = {
         name: faker.name.findName(),
         email : faker.internet.email(), 
         phone: faker.phone.phoneNumber(), 
         address: faker.address.streetAddress(),
         city: faker.address.city()
         }
        debugger
        cy.insertOne(data1, {collection: 'myData', seed: true, database: 'alagamai'}).then(res => {
        console.log(res); // prints the id of inserted document
        });
    })

    it ("insert many record test - 1", () => {  

        const data = [
        {    
            name: faker.name.findName(),
            email : faker.internet.email(), 
            phone: faker.phone.phoneNumber(), 
            address: faker.address.streetAddress(),
            city: faker.address.city()
        },          
        { 
            name: faker.name.findName(),
            email : faker.internet.email(), 
            phone: faker.phone.phoneNumber(), 
            address: faker.address.streetAddress(),
            city: faker.address.city()
        }
        ];

        cy.insertMany(data, {collection: 'myData', database: 'alagamai'}).then(res => {
             cy.log(res); // prints the id of inserted document
        });
    })

    it ("insert many record test - 2", () => {  

        const restaurant = [  
            {  energy : getRandVal(), name : faker.company.companyName(), borough : "Brooklyn" },
            {  energy : getRandVal(), name : faker.company.companyName(), borough : "Brooklyn" },
            {  energy : getRandVal(), name : faker.company.companyName(), borough : "Manhattan" },
            {  energy : getRandVal(), name : faker.company.companyName(), borough : "Manhattan" },
            {  energy : getRandVal(), name : faker.company.companyName(), borough : "Queens" },
        ];

        //    cy.dropCollection('restaurant').then(res => {
        //           cy.log(res); // Error object if collection doesn’t exist
        //        });
        //      cy.wait(5000)
        
         cy.insertMany(restaurant, {collection: 'restaurant', seed: true, database: 'alagamai'}).then(res => {
                cy.log(res); // prints the id of inserted document
        });
    })
    it('drop colleciton', () => {
        cy.task("log", "Dropping collection ...")
        Cypress.env('mongodb', { uri: 'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai', database: 'alagamai'});
        return cy.dropCollection('roles',  {failSilently: true}).then(res => {
            cy.log(res); // Error object if collection doesn’t exist
        });

    })
})

