// <reference types="Cypress" />

describe('Test Login Functionality', function () {

    //called after describe and before it block
    before(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            this.data = data
        })
    })

    it('should test login functionality', function () {

        cy.visit(Cypress.env('url'))
        cy.percySnapshot('LoginPage Test');
        cy.get("#userId").type(this.data.InternalAdmin)
        cy.get("#password").type(this.data.password)
        cy.get('.btnn-danger').click()
        cy.wait(6000)
        
      
    })
})