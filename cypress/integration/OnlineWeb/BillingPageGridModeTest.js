/// <reference types="Cypress" />

import UtilPage from '../../support/pageObjects/UtilPage';
import LoginPage from '../../support/pageObjects/billingPages/LoginPage';




const listOfDevices = new UtilPage().getListOfDevicesForResponsiveness();
var screenshotTaken = false;

describe('Test Billing Page Functionality', function () {

    chai.use(require('chai-subset'));
    chai.use(require('chai-string'));

    //called after describe and before it block
    before(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            globalThis.data = data
           
        })
    })

    beforeEach(function () {
        //cy.clearLocalStorage()
        //cy.clearCookies()
    })

    

    listOfDevices.forEach((device) => {

        const loginPage = new LoginPage();
        const utilPage = new UtilPage();
        it(`should test raise Ticket billing functionality in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
            } else {
                cy.viewport(device)
            }
            utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

            if (!screenshotTaken) {
                utilPage.takePercySnapShot('Login Page')
                screenshotTaken = true;
            }
            loginPage.getUserIDField().type(data.InternalAdmin)
            loginPage.getPasswordField().type(data.password)
            loginPage.getLoginButton().click()
            cy.wait(30000)
   
            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > #dropdownMenu1').click()
            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > .multi-level > :nth-child(1) > .dropdown-item.p-0').trigger('mouseover')
    
            cy.get('.dropdown.show > ul[role="menu"] > li:nth-of-type(1) > .dropdown-menu > li:nth-of-type(1) > .dropdown-item').invoke('removeAttr', 'target').click({ force: true })
                   cy.wait(15000)
   
        });
        it(`should test raise Ticket update legal in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
            } else {
                cy.viewport(device)
            }
            utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

            if (!screenshotTaken) {
                utilPage.takePercySnapShot('Login Page')
                screenshotTaken = true;
            }
            loginPage.getUserIDField().type(data.InternalAdmin)
            loginPage.getPasswordField().type(data.password)
            loginPage.getLoginButton().click()
            cy.wait(30000)

            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > #dropdownMenu1').click()
            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > .multi-level > :nth-child(1) > .dropdown-item.p-0').trigger('mouseover')
                
            cy.get('.dropdown.show > ul[role="menu"] > li:nth-of-type(1) > .dropdown-menu > li:nth-of-type(2) > .dropdown-item').invoke('removeAttr', 'target').click({ force: true })
                    cy.wait(3000)
        });
        it(`should test raise Ticket request compansation in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
            } else {
                cy.viewport(device)
            }
            utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

            if (!screenshotTaken) {
                utilPage.takePercySnapShot('Login Page')
                screenshotTaken = true;
            }
            loginPage.getUserIDField().type(data.InternalAdmin)
            loginPage.getPasswordField().type(data.password)
            loginPage.getLoginButton().click()
            cy.wait(30000)

            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > #dropdownMenu1').click()
            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > .multi-level > :nth-child(1) > .dropdown-item.p-0').trigger('mouseover')
            cy.get('.dropdown.show > ul[role="menu"] > li:nth-of-type(1) > .dropdown-menu > li:nth-of-type(3) > .dropdown-item').invoke('removeAttr', 'target').click({ force: true })
            cy.wait(3000)
        });
        it(`should test raise Ticket request copy bill in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
            } else {
                cy.viewport(device)
            }
            utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

            if (!screenshotTaken) {
                utilPage.takePercySnapShot('Login Page')
                screenshotTaken = true;
            }
            loginPage.getUserIDField().type(data.InternalAdmin)
            loginPage.getPasswordField().type(data.password)
            loginPage.getLoginButton().click()
            cy.wait(30000)

            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > #dropdownMenu1').click()
            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > .multi-level > :nth-child(1) > .dropdown-item.p-0').trigger('mouseover')
            cy.get('.dropdown.show > ul[role="menu"] > li:nth-of-type(1) > .dropdown-menu > li:nth-of-type(4) > .dropdown-item').then(element => {
                cy.log("Element clicked is==>  " + element.text())
            })
            cy.get('.dropdown.show > ul[role="menu"] > li:nth-of-type(1) > .dropdown-menu > li:nth-of-type(4) > .dropdown-item').invoke('removeAttr', 'target').click({ force: true })
            
            cy.wait(3000)

        });
        it.only(`should test raise Ticket request copy bill trial in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
            } else {
                cy.viewport(device)
            }
            utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

            if (!screenshotTaken) {
                utilPage.takePercySnapShot('Login Page')
                screenshotTaken = true;
            }
            loginPage.getUserIDField().type(data.InternalAdmin)
            loginPage.getPasswordField().type(data.password)
            loginPage.getLoginButton().click()
            cy.wait(30000)

            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > #dropdownMenu1').click()
            cy.get(':nth-child(1) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > .multi-level > :nth-child(1) > .dropdown-item.p-0').trigger('mouseover')
    
            cy.get('.dropdown.show > ul[role="menu"] > li:nth-of-type(1) > .dropdown-menu > li:nth-of-type(4) > .dropdown-item').then(element => {
              cy.log("Element clicked is ==> " + element.text())
            })
            cy.get('.dropdown.show > ul[role="menu"] > li:nth-of-type(1) > .dropdown-menu > li:nth-of-type(4) > .dropdown-item').invoke('removeAttr', 'target').click({ force: true })
                    cy.wait(3000)
  
        });
        it(`should test request duplicate billing functionality in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
            } else {
                cy.viewport(device)
            }
            utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

            if (!screenshotTaken) {
                utilPage.takePercySnapShot('Login Page')
                screenshotTaken = true;
            }
            loginPage.getUserIDField().type(data.InternalAdmin)
            loginPage.getPasswordField().type(data.password)
            loginPage.getLoginButton().click()
            cy.wait(45000)
            //cy.wait(4000)

            cy.get('.ct-mega-menu-title').then((element) => {

            const listOfValidNavBar = ['Home', 'Connectivity', 'Orders', 'Tickets', 'Services', 'Billing', 'Billing', 'Tools', 'Colt Classic']
                const text = element.text()
                listOfValidNavBar.forEach(item => {
                    expect(text).to.contain(item)
                })

            })
            //.ct-card-lozns.ct-lozns-inprogress
            cy.wait(5000)
            cy.scrollTo(5000, 15000)
            cy.wait(5000)
            cy.wait(5000)
            cy.scrollTo(15000, 20000)
            cy.get(':nth-child(13) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > #dropdownMenu1').scrollIntoView()
            cy.get(':nth-child(13) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > #dropdownMenu1').click()
            cy.get(':nth-child(13) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > .multi-level > :nth-child(3) > .p-0').click()
            cy.get('.pb-4 > :nth-child(1) > .custom-control-label').click()
            cy.get('.row > .ct-btn-primary').click()
            //cy.get('.ct-btn-primary').eq(5).click({force: true })
            cy.get('.row > .btn').click({ multiple:true,force: true })
            cy.get('.modal-header > .close').click()
            cy.wait(3000)
            cy.get(':nth-child(13) > .card > .card-footer > .col-12 > .d-flex > .ct-megamenu-vertical-main > .dropdown > .multi-level > :nth-child(1) > .dropdown-item.p-0').click()       

        })

        it(`should test scrolling functionality in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
        } else {
                cy.viewport(device)
        }
           utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

        if (!screenshotTaken) {
            utilPage.takePercySnapShot('Login Page')
            screenshotTaken =  true;           
        }
        loginPage.getUserIDField().type(data.InternalAdmin)
        loginPage.getPasswordField().type(data.password)
        loginPage.getLoginButton().click()
        cy.wait(45000)
        //cy.wait(4000)

            cy.get('.ct-mega-menu-title').then((element) =>{
                const listOfValidNavBar = ['Home','Connectivity','Orders','Tickets','Services','Billing','Billing','Tools','Colt Classic']
                const text = element.text()
                listOfValidNavBar.forEach(item =>{
                    expect(text).to.contain(item)
                })
                
            })
            
            cy.wait(5000)
            
            cy.get('.ct-cardview-body > *').find('.col-12.px-0').contains('4227325').scrollIntoView()
            cy.scrollTo(5000, 15000)
            cy.wait(5000)          
            cy.scrollTo(15000, 40000)
            cy.wait(5000)
            cy.scrollTo(40000, 80000)
            cy.wait(5000)
            cy.scrollTo(80000, 120000)
            cy.wait(5000)
            cy.scrollTo(120000, 160000)
            cy.wait(5000)
            cy.scrollTo(160000, 200000)
            cy.wait(5000)
            cy.scrollTo(200000, 240000)
            cy.wait(5000)
            cy.scrollTo(240000, 280000)
            cy.wait(5000)
            cy.scrollTo(280000, 320000)
            cy.wait(5000)
            cy.scrollTo(320000, 370000)
            cy.wait(5000)
            cy.scrollTo(370000, 420000)
            cy.wait(5000)
            cy.get('.ct-cardview-body > *').find('.col-12.px-0').contains('151264').scrollIntoView()
      
        })
    
     it(`should test Billing page functionality in ${device} screen for clicking a chkbox`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
        } else {
                cy.viewport(device)
        }
           utilPage.visitBillingPage()
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                //cy.log(err)
                return false
            })

        if (!screenshotTaken) {
            utilPage.takePercySnapShot('Login Page')
            screenshotTaken =  true;           
        }
        loginPage.getUserIDField().type(data.InternalAdmin)
        loginPage.getPasswordField().type(data.password)
        loginPage.getLoginButton().click()
        cy.wait(45000)
        //cy.wait(4000)

            cy.get('.ct-mega-menu-title').then((element) =>{

                const listOfValidNavBar = ['Home','Connectivity','Orders','Tickets','Services','Billing','Billing','Tools','Colt Classic']
                const text = element.text()
                listOfValidNavBar.forEach(item =>{
                    expect(text).to.contain(item)
                })
                
            })
            //.ct-card-lozns.ct-lozns-inprogress
        cy.wait(5000)
         cy.scrollTo(5000, 35000)
         cy.wait(5000)
        //  cy.scrollTo(5000, 15000)
        //  cy.wait(5000)
         cy.get('.ct-container').find('.custom-control-input').eq(19).scrollIntoView().click({ force: true }).should('be.checked')
            
            
        })
    });
});

   
