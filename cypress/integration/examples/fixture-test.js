import { faker } from '@faker-js/faker';
const roles =  require('../../fixtures/roles.json')

describe('fixture test', () => {
    beforeEach(()  => {
        cy.fixture('fixtures-test.json').as('data');
        cy.fixture('fixtures-test.json').then((data1) => {
            globalThis.data1 = data1;
            cy.task("log", data1[0].name)
        })
    })
    it('accessing fixture file', () => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get('@data').then(d => {
                //  cy.task("log", d[0].name)
                //  cy.task("log", d[0].gender)
        cy.get('form div:nth-child(1) input').type(d[0].name)
        cy.get('select').select(d[0].gender);
        })

    })

    it('accessing fixture file 1', () => {
       cy.visit('https://rahulshettyacademy.com/angularpractice/')

       cy.get('form div:nth-child(1) input').type(globalThis.data1[0].name)
       cy.get('select').select(globalThis.data1[0].gender);

   })

    it('read and write data into fixture file', () => {

     cy.fixture('fixtures-test.json').then((data) => {
        cy.writeFile('./cypress/fixtures/fixtures-test1.json',  data)          
     })
    })

    it('downlaod fixtures using requires', () => {
        expect(roles).to.deep.equal(
            {
                "_id": {
                  "$oid": "5cf91f45a8340a82e171d910"
                },
                "sensor": {
                  "$oid": "60e6c7ae0973e96ac3ebaeb8"
                },
                "username": "tweety",
                "email": "tweety@example.com",
                "password": "$2a$10$WMKahpQBSn9XyVMoIb8Ou.sSNKUmV1haSdqFTsKIqYx8.F111i/yy",
                "createdAt": {
                  "$date": {
                    "$numberLong": "1559664269476"
                  }
                },
                "updatedAt": {
                  "$date": {
                    "$numberLong": "1559664288545"
                  }
                }
              })

    })

     it('push array into new file', () => {
        const data = []
        //const users = []
        const date = new Date()

        date.setUTCDate(date.getUTCDate() - 5);

        for (let i=0; i< 5; i++) {

        const getName = faker.name.firstName();
        date.setUTCDate(date.getUTCDate() + 1 )
        const ISOdate = date.toISOString()

        const users = {
            name: getName,
            email:  faker.internet.email(getName),
            address: faker.address.streetAddress(), 
            phone:  faker.phone.number(),
            date:   ISOdate
        }
        data.push(users)
        }
        cy.writeFile('./cypress/fixtures/fixtures-users.json',  data)          

    })
})