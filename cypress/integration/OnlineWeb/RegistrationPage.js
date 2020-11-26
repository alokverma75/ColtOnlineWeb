// <reference types="Cypress" />

describe('Test Registarion Functionality', function () {

    //called after describe and before it block
    before(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            this.data = data
        })
    })

    it('should test resgitration functionality', function () {

        cy.visit(Cypress.env('url'));
        cy.get('.btnn-secondary').click()
        cy.wait(2000)
        cy.percySnapshot('Registration page Test');      
        cy.get(':nth-child(1) > .form-control').type(this.data.firstName)        
        cy.get(':nth-child(2) > .form-control').type(this.data.lastName)
        cy.get('.text-right > .btn').click()
        cy.get('.form-control').type("4159132")
        cy.get('.col-xs-5 > .btn').click()
        cy.get('.col-md-12 > .form-control').type(this.data.email)
        cy.get('.intl-tel-input > .form-control').type(this.data.phoneNumber)
        cy.get('.text-right > .btn').click({ force: true })
        cy.wait(3000)
        cy.get('.text-right > .btn').click()
        cy.get('.text-right > .btn').click()
        cy.get('.custom-control-label').click()
        cy.wait(4000)
        cy.get('#submitButtonUC01').click({ force: true })
        cy.wait(4000)
       
       
        
        

    })
})