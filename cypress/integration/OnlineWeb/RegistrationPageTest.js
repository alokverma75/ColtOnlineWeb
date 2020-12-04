/// <reference types="Cypress" />

import UtilPage from '../../support/pageObjects/UtilPage';
import RegistrationPage from '../../support/pageObjects/RegistrationPage';


const listOfDevices = new UtilPage().getListOfDevicesForResponsiveness();

var screenshotTaken = false;
describe('Test Registarion Functionality', function () {
    const registrationPage = new RegistrationPage();
    const utilPage = new UtilPage();
    
    //called after describe and before it block
    beforeEach(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            this.data = data
        })
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
            utilPage.getMyBillingURL()
            registrationPage.getRegisterButton().click()
            cy.wait(10000)
            if (!screenshotTaken) {
                //If screenshot not taken then take screenshot once and not for every iteration of device type
               utilPage.takePercySnapShot('Registration page');
               //After screnshot taken then set it to true so that it's not repeated afterwards
               screenshotTaken = true;               
            }
            registrationPage.getFirstNameField().type(this.data.firstName)
            registrationPage.getLastNameField().type(this.data.lastName)
            registrationPage.getNextButton().click({ force: true })
            registrationPage.getCustomerNumberField().type(this.data.OCNCustomer)
            registrationPage.getNextButtonToUserDetailsPage().click({ force: true })
            registrationPage.getEmailAddressTextField().type(this.data.email)
            registrationPage.getPhoneNumberTextField().type(this.data.phoneNumber)
            registrationPage.getNextButton().click({ force: true })
            cy.wait(3000)
            registrationPage.getNextButton().click()
            registrationPage.getNextButton().click()
            registrationPage.getTermsAndConditionsCheckBox().click()
            cy.wait(4000)
            registrationPage.getSubmitButton().click({ force: true })            
            utilPage.reloadPage()            
            cy.wait(6000)
        })

    })



})