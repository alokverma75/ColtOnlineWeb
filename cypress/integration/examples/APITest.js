// <reference types="Cypress" />


describe('Test API Functionality', function () {
    const spok = require('cy-spok')
    const chaiSubset = require('chai-subset');
    chai.use(chaiSubset);
    

    //called after describe and before it block
    before(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            this.data = data
        })
    })

    it.only('should test api functionality', function () {
       cy.request('http://216.10.245.166/Library/GetBook.php?AuthorName=Alok Verma').as('get')
        // cy.server()
        // cy.route('GET', 'http://216.10.245.166/Library/GetBook.php?AuthorName=Alok Verma').as('get')

        
        cy.get('@get').should((response) => {
                expect(response.status).to.eq(200)
            expect(response.body).to.containSubset([
                    {
                        "book_name": "Learn Rest Automation with Java",
                        "isbn": "medhu",
                        "aisle": "229"
                },
                {
                    "book_name": "Learn Rest Automation with Java",
                    "isbn": "medhu",
                    "aisle": "230"
                }
                ])
            expect(response.body[0].book_name).to.eq('Learn Rest Automation with Java')
            expect(response.body[0].isbn).to.eq('medhu')
            expect(response.body[0].aisle).to.eq('229')
            
            })
    })

    it('cy.request() with query parameters', () => {
        // will execute request
        // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
        cy.request({
            url: 'http://216.10.245.166/Library/GetBook.php?AuthorName=Alok Verma',
            qs: {
                AuthorName: 'Alok Verma'
            },
        })
            .its('body')
            .should('be.an', 'array')
            .and('have.length', 13)
            .its('0') // yields first element of the array
            .should('contain', {
                "book_name": "Learn Rest Automation with Java",
                "isbn": "medhu",
                "aisle": "229"
            })
    })

    it('cy.request() with post parameters', () => {
        // will execute request
       
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
        "name": "Learn Appium Automation with Java",
            "isbn": "medhu",
            "aisle": "2013",
            "author": "Medhu"
        }).then(function(response) {
            expect(response.body).to.have.property("Msg", "successfully added")
            expect(response.body).to.have.property("ID", "medhu2013")
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')
        })        
    })


    it('spoks', () => {
        const object = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            helloWorld: 'hello world',
            anyNum: 999,
            anotherNum: 888,
            anArray: [1, 2],
            anotherArray: [1, 2, 3],
            anObject: {},
        }

        // using Spok
        // https://github.com/thlorenz/spok#readme
        cy.wrap(object, { timeout: 2000 }).should(
            spok({
                $topic: 'spok-example',
                one: spok.ge(1),
                two: 2,
                three: spok.range(2, 6),
                four: spok.lt(5),
                helloWorld: spok.startsWith('hello'),
                anyNum: spok.type('number'),
                anotherNum: spok.number,
                anArray: spok.array,
                anObject: spok.ne(undefined),
            }),
        )
    })
})