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
        
        it(`should test download pdf invoice functionality in ${device} screen`, function () {
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

            // cy.get('div:nth-of-type(1) > .card.ct-cardview.ct-cardview-invoice.h-100.m-0 > .card-footer.ct-cardview-footer.ct-cardview-invoice-footer.pb-4.py-0 > .col-12.p-0 > .d-flex > .ct-btn-dropdown.mr-3 > button#dropdownMenuButton').click()
            cy.get(':nth-child(4) > .card > .card-footer > .col-12 > .d-flex > .ct-btn-dropdown.mr-3 > #dropdownMenuButton').click()

            //try first radio button option of Invoices
            // cy.get('div:nth-of-type(1) > .ng-star-inserted > .custom-control.custom-radio.mb-3.mt-2 > .custom-control-label.pl-4').click()
            cy.get('.ng-star-inserted > .custom-control > .custom-control-label').click()
            cy.get('.btn-container > .btn').click()
            // cy.get('.btn.ct-btn-primary.download-btn.w-100').invoke('removeAttr', 'target').click({ force: true })
            cy.readFile('C:\\Users\\Medhansh\\Downloads\\GB_Invoice_22246_168226_2020103002261.pdf','binary').then(fileContent => {

                expect(fileContent).to.include('emea-ubsbilling@mdsl.com')
                expect(fileContent).to.include('GB447151456')
                expect(fileContent).to.include('168226')
                expect(fileContent).to.include('22246')
                expect(fileContent).to.include('2020103002261')
                expect(fileContent).to.include('11-Dec-2020')
                expect(fileContent).to.include('Adjustments & Credits')
                expect(fileContent).to.include('-173.25')
                expect(fileContent).to.include('1-35825677017')
                expect(fileContent).to.include('2020101052463')
                expect(fileContent).to.include('Total Charges')
                expect(fileContent).to.include('-173.25')
            })
            //.should('contain', 'emea-ubsbilling@mdsl.com') 
            
            cy.wait(3000)

        }); //End it 
        it(`should test list view search functionality in ${device} screen`, function () {
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

            cy.get('.border-left > .fas').click()
            cy.get(':nth-child(1) > [style="text-align: left; position: absolute; left: 1372px; height: 46px; width: 95px;"] > .ct-action').click()
            cy.get('div#ctpopup > ul > li:nth-of-type(1)').trigger('mouseover')
            //cy.get('.ct-megamenu-vertical > :nth-child(1)').trigger('mouseover')
            // cy.get('li:nth-of-type(1) > .ct-megamenu-submenu-right > div:nth-of-type(1) > .ct-megamenu-item > a[target="_blank"]').invoke('removeAttr', 'target').click({force: true})
            cy.get('.fa-angle-double-right.fas').click({ force: true })
            cy.get('.fa-angle-double-left.fas').click({ force: true })
            cy.get('.d-lg-block.d-none.ng-star-inserted.searchitem-container.w-100  .form-control.ng-pristine.ng-untouched.ng-valid').type('2020143002598')
            cy.get('.d-lg-block.d-none.ng-star-inserted.searchitem-container.w-100 .ct-icon-box > .fa.fa-search').click()
            cy.get('.col-lg-9 > .chips-container > .chip').then(element => {

                const serachedValue = element.text()
                
                expect(serachedValue).to.include('2020143002598')
            })

            cy.wait(3000)

        }); //End it  
        it(`should test list view add columns functionality in ${device} screen`, function () {
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

            cy.get('.border-left > .fas').click()
            cy.get(':nth-child(1) > [style="text-align: left; position: absolute; left: 1372px; height: 46px; width: 95px;"] > .ct-action').click()
            cy.get('.fa.fa-columns').click()
            cy.wait(4000)
            cy.get('.columncustomiser_scrollbox > :nth-child(4) > span').click()
            cy.get('.btn.ct-btn-tertiary-alt.float-right').click()

            cy.get('div:nth-of-type(10)  .tabulator-col-title').then(element =>{

                const columnAdded = element.text()
                expect(columnAdded).to.eq('Billing Company Name')
            })

            cy.wait(3000)
            //Now revert the changes
            cy.get('.fa.fa-columns').click()
            cy.get('.row > :nth-child(3) > :nth-child(8)').click()
            cy.get('.btn.ct-btn-tertiary-alt.float-right').click()


        }); //End it 
        
        it.only(`should test download excel functionality in ${device} screen`, function () {
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

            cy.get('.border-left > .fas').click()
            cy.wait(4000)
            cy.get(':nth-child(4) > .ct-icon-box > .fa').click()
             cy.readFile('C:\\Users\\Medhansh\\Downloads\\Billing.xlsx', 'utf-8').then(fileContent => {

                 expect(fileContent).to.include('17.79')
                 expect(fileContent).to.include('2020101063126')
                 expect(fileContent).to.include('NEOS NETWORKS LIMITED')
                 expect(fileContent).to.include('22624')
                 expect(fileContent).to.include('116638')
                 expect(fileContent).to.include('Open')
            
             })
            // //.should('contain', 'emea-ubsbilling@mdsl.com') 

            // cy.wait(3000)

        }); //End it 
        
    });
});

   
