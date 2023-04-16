// generate json file 
// try with date function to generate fields 
// dump json file into single collection 
import { faker } from '@faker-js/faker';
const fs = require('fs');
const drop = true;
//const MongoClient = require('mongodb').MongoClient;


const generateJSON = () => {
  const data = [];

  const date = new Date();
  date.setDate(date.getDate() - 10);
  date.setUTCHours(3, 0, 0, 0);

  const sensor_id_1_g1 = "6416c0251d77f45086e40ce6";
  const build = [ 
    ["6416c0251d77f45036e4ee55" , "Active"],
     ["2346c0251d77f45036e40ce6", "Inactive"],
     ["8906c0251d77f45036e4ffaa", "Active"],
     ["1356c0251d77f45036e40044", "Inactive"]
  ];

  for (let i = 0; i < 10; i++) {
    date.setDate(date.getDate() + 1)
    const timeStampISO = date.toISOString()
    cy.task("log",timeStampISO)

    // input from the user

    var randNum =  Math.floor(Math.random() * 4);
    var energyVal = Math.floor(Math.random() * 9990001) + 10000;

    var power = Math.floor(Math.random() * 9990001) + 10000;

    const user = {
      sensor:  {"$oid" : sensor_id_1_g1 },
      time_stamp: timeStampISO,
      building_id:   {"$oid" : build[randNum][0] },
      building_status:  build[randNum][1],
      energy: energyVal,
      power: power,
    };
    data.push(user)
  }

  let jsonData = JSON.stringify(data, null, 2);
  cy.writeFile('./cypress/fixtures/usage1-d.json', jsonData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  })

  return JSON.stringify(data, null, 2);
}


describe('generate json', () => {
  it ('json function', () => {
    cy.task("log", generateJSON());
    cy.wait(5000)
    cy.task("seed:singleDb");


  })
})

