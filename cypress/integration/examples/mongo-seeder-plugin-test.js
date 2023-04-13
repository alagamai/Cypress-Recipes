// Go to atlas web interface using alagamai.n@gamil.com
// edit user - db:admin - alagamai
const seeder  = require('cypress-mongo-seeder');
//const { plugin } = require('mongoose');
const path = require('path');
const colList = []

describe ('Reset DB test', () => {
   it('get collections', () => {
      cy.task("get:collectionNames").then(res => {
            cy.task("log", res);
            for(let i =0 ; i< res.length; i++) {
            cy.task("log", res[i].name)
               colList.push(res[i].name)
         }
      })
   })
    
   it('drop collection', () => {
      Cypress.env('mongodb', { uri: 'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai', database: 'alagamai'});

      for (let i =0 ; i < colList.length; i++) {
         cy.dropCollection(colList[i],  {failSilently: true}).then(res => {
            cy.task("log", res); // Error object if collection doesn’t exist
        });
      }
   })
})

describe ('Mongo seeder - Seed all files in Cypress', () => {
      it('Seeder all',  () => {
         cy.task("seed:database").then(seeded => {
            cy.wait(5000)
            cy.task("seed:database").then(seeded => {
               cy.task("log", 'Seeded -> ' +  seeded);
             });
          });

      })
})

  