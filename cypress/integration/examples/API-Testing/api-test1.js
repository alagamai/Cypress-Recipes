import { faker } from '@faker-js/faker'

const END_PT = {
    "USER_URL": "https://gorest.co.in/public/v2/users/",
    "URL2": "https://gorest.co.in/public/v2/posts/",
    "URL3": "https://pokeapi.co/api/v2/pokemon/",
    "URL4": "https://gorest.co.in/public/v2/graphql",
    "Bearer_Rest": "e2360bb230c2fc83af7451f8346d9fcdb699879e3a8f14462a2187f9d670675e",
    "Bearer_Graph": "3df84f0ba9a2028aa6efe7519e3d73466cb301501858acabaad74119082f3b02"
  }

function listSingleUser(id) {
    cy.request({
        method: 'GET', 
        auth: {
            'bearer':  END_PT.Bearer_Rest
        },  
        url: END_PT.USER_URL + id,
        failOnStatusCode: false, 

    }).as('resp')

    //cy.get('@resp').its('status').should('eq', 200)
    cy.get('@resp').then(response => {
        const data = response.body
        cy.task("log", JSON.stringify(response.body))
       // cy.task("log", data[0].name);
    })

}

describe('api testing', () => {
    let id = '';
    it('create user - api post test', () => {
        const randomIndex = Math.floor(Math.random() * 2); // generate a random integer between 0 and 1
        const gender = randomIndex === 0 ? "Male" : "Female";
        let name = faker.name.firstName()
        cy.request({
            method: 'POST',
            url:  END_PT.USER_URL,
            failOnStatusCode : false,
            auth: {
                'bearer':  END_PT.Bearer_Rest
            },  
            body: {
                "name": name, 
                "gender": gender,
                "email": faker.internet.email(name),
                "status": "active"
            }
        }).as('resp')

        cy.get('@resp').then(response => {
            cy.task("log", response.body)
            cy.task("log", response.body.id)
            id = response.body.id
            cy.task("log", id)

        })
    })

    it('Update user - api patch test', () => {
        const randomIndex = Math.floor(Math.random() * 2); // generate a random integer between 0 and 1
        const gender = randomIndex === 0 ? "Male" : "Female";
        let name = faker.name.firstName()
        cy.request({
            method: 'PATCH',
            url:  END_PT.USER_URL + id,
            failOnStatusCode : false,
            auth: {
                'bearer':  END_PT.Bearer_Rest
            },  
            body: {
                "name": name, 
                "email": faker.internet.email(name),
                "status": "inactive"
            }
        }).as('resp')

        cy.get('@resp').then(response => {
            cy.task("log", response.body)
        })
        listSingleUser(id);
    })



    it("list all user - api get test", () => {

        cy.request({
            method: 'GET', 
            auth: {
                'bearer':  END_PT.Bearer_Rest
            },  
            url: END_PT.USER_URL,
            failOnStatusCode: false, 

        }).as('resp')

        //cy.get('@resp').its('status').should('eq', 200)
        cy.get('@resp').then(response => {
            const data = response.body
            cy.task("log", JSON.stringify(response.body))
           // cy.task("log", data[0].name);
        })

    })

    it('delete user', () => {
        cy.request({
            method: 'DELETE', 
            auth: {
                'bearer':  END_PT.Bearer_Rest
            },  
            url: END_PT.USER_URL + id,
            failOnStatusCode: false, 
    
        }).as('resp')
    
        //cy.get('@resp').its('status').should('eq', 200)
        cy.get('@resp').then(response => {
            const data = response.body
            cy.task("log", JSON.stringify(response.body))
           // cy.task("log", data[0].name);
        })
        listSingleUser(id);

    })

})