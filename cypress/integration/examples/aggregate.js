// using cypress-mongodb plug in, drop collection, insert one or many records
const mongo = require('cypress-mongodb');
const { spawn } = require('child_process');

const mongoURI = "mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai"
const dbName = 'alagamai';
const collectionName = 'usage1-d';

describe('Aggregate function test', () => {
  
  it('execute db.collection.find command via mongosh', () => {
    const dbName = 'alagamai';
    const command = `db.getMongo().getDBNames().indexOf('${dbName}') !== -1`;   
    const mongoCommand = `mongosh "${mongoURI}" --eval "db.getCollection('${collectionName}').find()"`;

    //cy.exec('mongosh "mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai" --eval "db.getCollection(\'usage1-d\').find()"')
      cy.exec(mongoCommand)
      .then((result) => {
        // handle the result
        // const output = JSON.parse(result.stdout);
        const data = result.stdout
        cy.task("log", "Results *** " +result.stdout)
      });
  });

  it('execute db.collection.aggregate command via mongosh', () => {
   // const mongoCommand = `mongosh ${mongoURI} --eval "db.getCollection(\'${collectionName}\').aggregate([ { $group: { _id: null, totalEnergy: { $sum: \'$energy\' } } } ])"`;
   const cmd = "db.getCollection('usage1-d').aggregate([{ $sort: { energy:1}}])";
   const mongoCommand = `mongosh ${mongoURI} --eval "${cmd}"`;

    // cy.exec(mongoCommand)   
    //  .then((result) => {
    //     const data = result.stdout
    //     cy.task("log", "Results *** " +result.stdout)
    //   });
  });


    it('should aggregate documents in a collection', () => {
           cy.task("aggregate:energyTot")
          .then((res) => {
            // const db = client.db('alagamai');
            // const collection = db.collection('restaurant');
            cy.task("log" , res)

            cy.task("log", res[0].EnergyTot)
            cy.task("log", res[0]['EnergyTot'])
            cy.task("log", res[0]._id)
          })
        })
  });
      

