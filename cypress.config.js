const { defineConfig } = require("cypress");
const path = require('path');
const mongo = require('cypress-mongodb');
const seeder = require('cypress-mongo-seeder')
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const mongouri = "mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai"
const fileFullPath = path.resolve(__dirname + '/cypress/fixtures/myData.json');
const fileFullPath1 = path.resolve(__dirname + '/cypress/fixtures/new.json');
const usage1dpath = path.resolve(__dirname + '/cypress/fixtures/usage1-d.json');
var mongodb = require("mongodb");




//const folder = '/Volumes/D Storage Drive/Cypress-Test-Project/cypress/fixtures/';
const folder = path.resolve(__dirname +  '/cypress/fixtures/');
const dropCollections = false;
const dbName = 'alagamai';


const getMongoDB = async () => {
  const client = await MongoClient.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  return db;
};

module.exports = defineConfig({
  //https://cloud.cypress.io/projects/5rq8fn/runs
  // Record key: 7835e1bc-951d-4c79-beba-157c7faede94
  projectId: '5rq8fn',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mongo.configurePlugin(on);


      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        'seed:resetdb': () => {
        //     cy.dropCollection('myData').then(res => {
        //     cy.log(res); // Error object if collection doesn’t exist
        // });
           return null;
        },
        'get:files': () => {
          const directory = '/Volumes/D Storage Drive/Cypress-Test-Project/cypress/fixtures/';
          return fs.readdirSync(directory);
          
        },
        'seed:database': () => {
          return seeder.seedAll(mongouri, folder, dropCollections);
          // return seeder
          //.seedSingleCollection(mongouri, fileFullPath, dropCollections);
         // seeder.seedSingleCollection(mongouri, fileFullPath1, dropCollections);

        },
        'seed:singleDb': () => {
           return seeder
          .seedSingleCollection(mongouri, usage1dpath, true);
        },
        // 'connect:mongodb': () => {
        //   return MongoClient.connect(mongouri);
        //  },
         'connect:mongodb': () => {
            var client = mongodb.MongoClient;
            const results = [];

           return new Promise((resolve, reject) => {

             client.connect(mongouri, function (err, client) {
              var db = client.db("alagamai");
              var collection = db.collection("myData");
              var query = {};
              var cursor = collection.find(query);

              collection.find(query).toArray(function(err, results) {

              console.log('Found the following documents:');
              console.log(results);
            
              if (err) {
                 reject(err);
              } else {
                  resolve(results);
              }
                //Close the client connection
                client.close();
              })
            });
          })
        },
        'get:collectionNames': () => {
          var client = mongodb.MongoClient;
          const results = [];
          return new Promise((resolve, reject) => {
           client.connect(mongouri, function (err, client) {
            var db = client.db("alagamai");
            var query = {};
            db.listCollections().toArray(function(err, results) {
            console.log('Found the following collections:');
            console.log(results);
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
              //Close the client connection
              client.close();
            })
          });
        })
      },
        'get:mongodb': () => {
          var client = mongodb.MongoClient;
          const results = [];
          return new Promise((resolve, reject) => {
            client.connect(mongouri, function (err, client) {
              if (err) {
                reject(err);
              } else {
                var db = client.db("test-data-copy");
                var collection = db.collection("myData");
                resolve(collection);
              }
            });
          });
        },
        'aggregate:energyTot': () => {
          // {
          //   _id: "$building_id",
          //   EnergyTot: {
          //     $sum: "$energy",
          //   },
          // }    
          var client = mongodb.MongoClient;
          const results = [];
          return new Promise((resolve, reject) => {
            client.connect(mongouri, function (err, client) {
              if (err) {
                reject(err);
              } else {
                var db = client.db("alagamai");
                var collection = db.collection("usage1-d");
                var options = {
                  allowDiskUse: false
                };
                var pipeline = [
                  {
                      "$group": {
                          "_id": "$building_id",
                          "EnergyTot": {
                              "$sum": "$energy"
                          }
                      }
                  }
                ];
                var cursor = collection.aggregate(pipeline, options);
                cursor.toArray(function(err, results) {

                  console.log('Found the following documents:');
                  console.log(results);
                  resolve(results);
                })
              };
            });
          })
        },
       // 'get:mongodb': getMongoDB,
        "env": {
          "mongodb": {
            "uri": "mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai",
            "database": "alagamai",
            "collection": "myData"
          }
        }
  })
  },
  
    
    //specPattern : 'cypress/integration/examples/*.js'
    specPattern : "**/*.js"
  },
});
