// <reference types="Cypress" />
const sizes = ['ipad-2', 'ipad-mini', 'iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+','iphone-7',
    'iphone-8', 'iphone-x', 'iphone-xr', 'iphone-se2', 'macbook-11', 'macbook-13', 'macbook-15','macbook-16',
    'samsung-note9','samsung-s10']

var screenshotTaken = false;
describe('Test Registarion Functionality', function () {
   
    
    //called after describe and before it block
    beforeEach(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            this.data = data
        })
    })

    sizes.forEach((size) => {
        // make assertions on the logo using
        // an array of different viewports
        it(`should test resgitration functionality in ${size} screen`, function () {
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }           
            cy.visit(Cypress.env('url'));
            cy.get('.btnn-secondary').click()
            cy.wait(10000)
            if (!screenshotTaken) {
                cy.percySnapshot('Registration page');
                screenshotTaken = true;               
            }
            cy.get(':nth-child(1) > .form-control').type(this.data.firstName)
            cy.get(':nth-child(2) > .form-control').type(this.data.lastName)
            cy.get('.text-right > .btn').click()
            cy.get('.form-control').type(this.data.OCNCustomer)
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
            // cy.clearLocalStorage()
            // cy.clearCookies()
            cy.reload(true)
            //cy.visit(Cypress.env('url'));
            cy.wait(6000)
        })

    })



})