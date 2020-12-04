/// <reference types="Cypress" />

import UtilPage from '../../support/pageObjects/UtilPage';
import RegistrationPage from '../../support/pageObjects/billingPages/RegistrationPage';



const listOfDevices = new UtilPage().getListOfDevicesForResponsiveness();

var screenshotTaken = false;
describe('Test Billing Page Registration Functionality', function () {
    const registrationPage = new RegistrationPage();
    const utilPage = new UtilPage();
    
    //called after describe and before it block
    before(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            globalThis.data = data
        })
    })

    beforeEach(function () {
     cy.clearLocalStorage()
     cy.clearCookies()
    })

    listOfDevices.forEach((device) => {
        // make assertions on the logo using
        // an array of different viewports
        it(`should test resgitration functionality in ${device} screen`, function () {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1])
            } else {
                cy.viewport(device)
            }           
            utilPage.visitBillingPage()
            registrationPage.getRegisterButton().click()
            cy.wait(10000)
            if (!screenshotTaken) {
                //If screenshot not taken then take screenshot once and not for every iteration of device type
               utilPage.takePercySnapShot('Registration page');
               //After screnshot taken then set it to true so that it's not repeated afterwards
               screenshotTaken = true;               
            }
            registrationPage.getFirstNameField().type(data.firstName, { force: true })
            registrationPage.getLastNameField().type(data.lastName, { force: true })
            registrationPage.getNextButton().click({ force: true })
            registrationPage.getCustomerNumberField().type(data.OCNCustomer, { force: true })
            registrationPage.getNextButtonToUserDetailsPage().click({ force: true })
            registrationPage.getEmailAddressTextField().type(data.email, { force: true })
            registrationPage.getPhoneNumberTextField().type(data.phoneNumber, { force: true })
            registrationPage.getNextButton().click({ force: true })
            cy.wait(6000)
            registrationPage.getNextButton().click()
            registrationPage.getNextButton().click()
            registrationPage.getTermsAndConditionsCheckBox().click({ force: true })
            cy.wait(4000)
            registrationPage.getSubmitButton().click({ force: true })            
            utilPage.reloadPage()            
            cy.wait(6000)
        })

    })



})