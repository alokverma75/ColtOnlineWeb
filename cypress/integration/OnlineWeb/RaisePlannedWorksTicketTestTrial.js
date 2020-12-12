/// <reference types="Cypress" />

import UtilPage from '../../support/pageObjects/UtilPage';
import LoginPage from '../../support/pageObjects/billingPages/LoginPage';




const listOfDevices = new UtilPage().getListOfDevicesForResponsiveness();
var screenshotTaken = false;

describe('Test Raise Planned Works Ticket Functionality', function () {

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
        cy.clearLocalStorage()
        cy.clearCookies()
    })

    listOfDevices.forEach((device) => {

        const loginPage = new LoginPage();
        const utilPage = new UtilPage();
        it.only(`should test Raise Planned works ticket functionality in ${device} screen`, function () {
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
        cy.wait(15000)
        //cy.wait(4000)

            cy.get('.ct-mega-menu-title').then((element) =>{

                const listOfValidNavBar = ['Home','Connectivity','Orders','Tickets','Services','Billing','Billing','Tools','Colt Classic']
                const text = element.text()
                listOfValidNavBar.forEach(item =>{
                    expect(text).to.contain(item)
                })
                
            })

            //Lets click on Home link and then come back to same page just to test link
            cy.get('li:nth-of-type(1) > .ct-mega-menu-title.nav-link').invoke('removeAttr', 'target').click()

            //do some validation on visited url
            cy.url().should('include','dcp.colt.net')
            cy.wait(4000)
            //Lets validate some of the hidden values to check if we are on correct page
            cy.get('#localeName').then(localeName => {
                //For hidden fields we should use val() in place of text(): its jQuery way
                const name = localeName.val()
               // cy.log(name)
                expect(name).to.equal('dcp.colt.net')
            })

            cy.get('#colUserNameHidden').then(userName => {
                const name = userName.val()
                // cy.log(name)
                expect(name).to.equal(data.InternalAdmin)
            })
            //Lets go back now
            cy.go('back')

            //Click on Billing link
            cy.get('#ct-parent-link-11 > .ct-mega-menu-title').invoke('show')
            cy.get('#ct-meng-menu-container-11 > .ct-card-box > :nth-child(2) > :nth-child(2) > :nth-child(1) > .nav-link > .ng-tns-c3-0').click({ force: true })

            cy.url().should('include','tickets')
            cy.wait(25000)
            //now click on Raise button which is at 2nd index out of 3 found using the below class
            cy.get('.ct-btn-primary').eq(1).click({ force: true })
            cy.wait(10000)
            cy.get(':nth-child(3) > .ct-dtool-box > .curser-pointer > .card > .mb-0').click({ force: true })
            cy.get(':nth-child(1) > .section-info > .custom-control-label').click()
            cy.wait(2000)
            cy.get('.col-md-12 > :nth-child(2) > .ct-btn-primary').click({ force: true })
            cy.wait(5000)
            cy.get(':nth-child(1) > [tabulator-field="checkd"] > .custom-control').click()
           
            cy.get('.col-md-12 > :nth-child(2) > .ct-btn-primary').click({ force: true })

            //click on raise duplicate ticket
            cy.get('.col > .ct-btn-primary').click()

            

            //Page Provide details
            cy.get('#\\30 1 > .form-control').type('Test message from Alok', { force: true })
            cy.get('#\\30 4 > :nth-child(3) > .custom-control-label').click({ force: true })
            cy.get('#\\30 5 > :nth-child(3) > .custom-control-label').click({ force: true })
            cy.get('#\\30 8 > .form-control').type('Test company 123', { force: true })
            cy.get('#\\30 9 > .form-control').type('London', { force: true })
            cy.get('#\\31 0 > .form-control').type('Test equipment', { force: true })
            cy.get('#\\31 2 > .form-control').type('Test User', { force: true })
            //+49619680252603 phone number format for this so use this
            cy.get('#\\31 3 > .form-control').type('+49619680252603', { force: true })

            cy.get('#timezone').select('(GMT)Western Europe Time,London,Lisbon,Casablanca')

            //schedule date of power down
            cy.get('#start').click()
           //set button
            //cy.get('[class] [tabindex="0"]:nth-child(2)').click({ multiple: true, force: true })
           //trail code
            var date = new Date();
            date.setDate(date.getDate() + 90);

            var futureYear = date.getFullYear();
            var futureMonth = date.toLocaleString("default", { month: "short" });
            var futureDay = date.getDate();

            cy.log("Future year to select: " + futureYear);
            cy.log("Future month to select: " + futureMonth);
            cy.log("Future day to select: " + futureDay);

            

            function selectMonthAndYearPowerDown() 
            {
                cy.get('.owl-dt-calendar-control').find('.owl-dt-calendar-control-content').then(currentDate => {
                    cy.log("currentDate is " + currentDate.text())
                    var futureYearFound = currentDate.text().includes(futureYear)
                    cy.log("futureYearFound is " + futureYearFound)
                    var futureMonthFound = currentDate.text().includes(futureMonth)
                    cy.log("futureMonthFound is " + futureMonthFound)
                    if (!futureYearFound) {
                        cy.log("Inside Year loop" + !futureYearFound)
                        cy.get('[aria-label="Next month"]').click();
                        selectMonthAndYearPowerDown();
                    } else if (!futureMonthFound) {
                        cy.log("Inside Month loop" + !futureMonthFound)
                        cy.get('[aria-label="Next month"]').click();
                        selectMonthAndYearPowerDown();
                    } else {
                        cy.get('.owl-dt-calendar-cell-content').contains(futureDay).click();
                    }
                })
               
            }
            selectMonthAndYearPowerDown();
   
           cy.get('.owl-dt-container-buttons > *').eq(1).should('contain', 'Set')
           cy.get('.owl-dt-container-buttons > *').eq(1).click({ multiple: true, force: true })

            //till here
            cy.wait(5000)
            cy.get('#\\31 7 > .form-control').type('Test User', { force: true })
            cy.get('#\\31 8 > .form-control').type('+49619680252603', { force: true })
            cy.wait(8000)
            cy.get('#up').click({ force: true })
            //cy.get('[class] [tabindex="0"]:nth-child(2)').click({ multiple: true, force: true })
            //trail code
            var dateUp = new Date();
            dateUp.setDate(dateUp.getDate() + 60);

            var futureYearUp = dateUp.getFullYear();
            var futureMonthUp = dateUp.toLocaleString("default", { month: "short" });
            var futureDayUp = dateUp.getDate();

            cy.log("Future year to select: " + futureYearUp);
            cy.log("Future month to select: " + futureMonthUp);
            cy.log("Future day to select: " + futureDayUp);

            function selectMonthAndYearPowerUp() {
                cy.get('.owl-dt-calendar-control').find('.owl-dt-calendar-control-content').then(currentDate => {
                    cy.log("currentDate is " + currentDate.text())
                    var futureYearUpFound = currentDate.text().includes(futureYearUp)
                    cy.log("futureYearUpFound is " + futureYearUpFound)
                    var futureMonthUpFound = currentDate.text().includes(futureMonth)
                    cy.log("futureMonthUpFound is " + futureMonthUpFound)
                    if (!futureYearUpFound) {
                        cy.log("Inside Year loop" + !futureYearUpFound)
                        cy.get('[aria-label="Next month"]').click();
                        selectMonthAndYearPowerUp();
                    } else if (!futureMonthUpFound) {
                        cy.log("Inside Month loop" + !futureMonthUpFound)
                        cy.get('[aria-label="Next month"]').click();
                        selectMonthAndYearPowerUp();
                    } else {
                        cy.get('.owl-dt-calendar-cell-content').contains(futureDayUp).click();
                    }
                })

            }
            selectMonthAndYearPowerUp();
            cy.get('.owl-dt-container-buttons > *').eq(1).should('contain', 'Set')
            cy.get('.owl-dt-container-buttons > *').eq(1).click({ multiple: true, force: true })
            cy.wait(8000)
            // //till here

            cy.get('#comments').type('Test Comments', { force: true })
            cy.wait(5000)
           // cy.get('.owl-dt-container-buttons > *').eq(1).click({ multiple: true, force: true })
            //Next button
            cy.get('.btn.ct-btn-primary.ct-ml-sm.ng-star-inserted').click({ force: true })

            cy.wait(10000)

            //click on submit button not now as will lead to duplicate ticket error
            cy.get('button#finalsubmit').click({force:true})
            cy.wait(15000)  
        })
    });
});
   
