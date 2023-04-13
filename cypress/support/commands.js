// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const { MongoClient } = require('mongodb');

Cypress.Commands.add('insertDataIntoMongoDB', (collectionName, data) => {
    const uri = Cypress.env('mongodb+srv://alagamai:Pass@cluster0.k5k1oim.mongodb.net/test');
    const client = new MongoClient(uri);
    return client.connect()
      .then((client) => {
        const db = client.db();
        const collection = db.collection(collectionName);
        return collection.insertMany(data)
          .finally(() => client.close());
      });
  });
  
  // Add a command to retrieve data from the MongoDB database
  Cypress.Commands.add('getDataFromMongoDB', (collectionName) => {
    const uri = Cypress.env('mongodb+srv://alagamai:Pass@cluster0.k5k1oim.mongodb.net/test');
    const client = new MongoClient(uri);
    return client.connect()
      .then((client) => {
        const db = client.db();
        const collection = db.collection(collectionName);
        return collection.find().toArray()
          .finally(() => client.close());
      });
  });