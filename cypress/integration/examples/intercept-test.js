
describe('intercpetion', () => {
    it('extract http response', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept(
            {
            method: 'GET', 
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            }
        ).as('data')
        cy.get('.btn-primary').click()
        cy.wait('@data').then(res => {
            cy.task("log", res.response.body[2])
        })

    })

    it('intercept with PATH', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept(
            {
            path: '/Library/GetBook.php?AuthorName=shetty'
            }
        ).as('data')
        cy.get('.btn-primary').click()
       // cy.wait('@data').its('response.statusCode').should('eq', 200)
        cy.wait('@data').its('response.body[1]').should('have.property', 'book_name' )
       // cy.wait('@data').its('request.query.AuthorName').should('eq', 'shetty' )
       //  cy.wait('@data').its('request.url').should('include', 'AuthorName=shetty')
    })

    it('intercept with path', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept( 'GetBook.php?AuthorName=shetty').as('data')
        cy.get('.btn-primary').click()
        cy.wait('@data').then(res => {
            cy.task("log", res)
        })
        // cy.get('p').should('have.text', 'Oops only 1 Book available')
        //cy.wait(100000)
    })


    it('verify using assert', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept(
            {
            method: 'GET', 
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            }
        ).as('data')
        cy.get('.btn-primary').click()
       // cy.wait('@data').its('response.statusCode').should('eq', 200)
       // cy.wait('@data').its('response.body[1]').should('have.property', 'book_name' )
       // cy.wait('@data').its('request.query.AuthorName').should('eq', 'shetty' )
         cy.wait('@data').its('request.url').should('include', 'AuthorName=shetty')

    })

    it('mock http response', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept(
            {
            method: 'GET', 
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            }, 
            {
                statusCode: 200,
                body:  [{"book_name":"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}]

            }
        ).as('mockRes');

        cy.get('.btn-primary').click()

        cy.wait('@mockRes').then(res => {
            cy.task("log", res)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
      //  cy.wait(100000)
    })

    it('mock http response - method,url,static response', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept(
            'GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            {
                statusCode: 200,
                body:  [{"book_name":"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}]

            }
        ).as('mockRes');

        cy.get('.btn-primary').click()

        cy.wait('@mockRes').then(res => {
            cy.task("log", res)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
      //  cy.wait(100000)
    })


    it('mock http response using interception.reply method', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

        //req.headers['Authorization'] = 'Bearer your-access-token';
        req.reply({
            statusCode: 200,
            body:  [{
                "book_name":"Learn Cypress automation with BBD",
                "isbn":"abcd",
                "aisle":"2200"
            }]
        })
        }).as('mockRes')

        cy.get('.btn-primary').click()
        cy.wait('@mockRes').then((interception) => {
            //expect(interception.request.headers['AuthorizatstatusCode: 200, body: { data: [{"book_name"ion']).to.equal('Bearer your-access-token');
            // interception.reply({ :"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}] } });
            cy.task("log", interception)
        });
        
        cy.get('p').should('have.text', 'Oops only 1 Book available')

        //cy.wait(100000)
    })

    it('mock http response using req.continue method', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=mulhotra" ;
            req.continue((res) => {
               // res.statusCode = 200;
               res.body =  'Hey Alagammai, 404 not found'
            })

        }).as('mockRes')

        cy.get('.btn-primary').click()
        cy.wait('@mockRes').then((interception) => {
            cy.task("log",  interception.response.statusCode)
            cy.task("log",  interception.response.body)
        });
        
       // cy.wait(100000)
    })

    it('mock http response using fixtures', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

        //req.headers['Authorization'] = 'Bearer your-access-token';
        req.reply({
            statusCode: 200,
            fixture:  'intercept-test.json'
        })
        }).as('mockRes')

        cy.get('.btn-primary').click()
        cy.wait('@mockRes').then((interception) => {
            //expect(interception.request.headers['AuthorizatstatusCode: 200, body: { data: [{"book_name"ion']).to.equal('Bearer your-access-token');
            // interception.reply({ :"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}] } });
            cy.task("log", interception)
        });
        
       // cy.get('p').should('have.text', 'Oops only 1 Book available')

       // cy.wait(100000)
    })

    it('using fixture as static response body - method, url, fixture', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', 
        {fixture: 'intercept-test.json'}).as('mockRes')

        cy.get('.btn-primary').click()
        cy.wait('@mockRes').then((interception) => {
            //expect(interception.request.headers['AuthorizatstatusCode: 200, body: { data: [{"book_name"ion']).to.equal('Bearer your-access-token');
            // interception.reply({ :"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}] } });
            cy.task("log", interception)
        });
        
        cy.get('p').should('have.text', 'Oops only 1 Book available')

       // cy.wait(100000)
    })

    it('Stub headers, status code, and body all at once ', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

        //req.headers['Authorization'] = 'Bearer your-access-token';
        req.reply({
            statusCode: 404,    //response status code
            body:  'Hey Alagammai, 404 not found',  // response body
            headers: {   //response headers 
                'x-not-found': 'true',
            }
        })
        }).as('mockRes')

        cy.get('.btn-primary').click()
        cy.wait('@mockRes').then((interception) => {
            expect(interception.response.body).to.equal('Hey Alagammai, 404 not found');
            expect(interception.response.statusCode).to.equal(404)
            // interception.reply({ :"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}] } });
            cy.task("log", interception)
        });    

        //cy.wait(100000)
    })



    it('mock http request headers', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

        //req.headers['Authorization'] = 'Bearer your-access-token';
        req.headers['Host'] =  "rahulshettyacademy-updated.com"
        }).as('mockReq')

        cy.get('.btn-primary').click()
        cy.wait('@mockReq').then((interception) => {
            //expect(interception.request.headers['AuthorizatstatusCode: 200, body: { data: [{"book_name"ion']).to.equal('Bearer your-access-token');
            // interception.reply({ :"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}] } });
            cy.task("log", interception)
            expect(interception.request.headers['Host']).to.equal('rahulshettyacademy-updated.com')
        });
        

        //cy.wait(100000)
    })

    it('mock http request url', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {

        //req.headers['Authorization'] = 'Bearer your-access-token';
        req.url =  "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=changed-name"
         req.continue((r) => {
            expect(r.statusCode).to.equal(404)
         //   cy.task("log", r.statusCode)
         })
          
        }).as('mockReqBody')

        cy.get('.btn-primary').click()
        cy.wait('@mockReqBody').then((interception) => {
            //expect(interception.request.headers['AuthorizatstatusCode: 200, body: { data: [{"book_name"ion']).to.equal('Bearer your-access-token');
            // interception.reply({ :"Learn Cypress automation with BBD","isbn":"abcd","aisle":"2200"}] } });
            cy.task("log", interception)
            expect(interception.request.url).to.include("changed-name")
        });
        

        //cy.wait(100000)
    })

})