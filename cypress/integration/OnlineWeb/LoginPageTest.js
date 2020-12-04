/// <reference types="Cypress" />

import UtilPage from '../../support/pageObjects/UtilPage';
import LoginPage from '../../support/pageObjects/billingPages/LoginPage';



const listOfDevices = new UtilPage().getListOfDevicesForResponsiveness();
var screenshotTaken = false;

describe('Test Login Functionality', function () {

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
        it(`should test login functionality in ${device} screen`, function () {
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
        cy.wait(10000)


        // Cypress.on('uncaught:exception', (err, runnable) => {
        //     // returning false here prevents Cypress from
        //     // failing the test
        //     //cy.log(err)
        //     return false
        // })
        
            utilPage.getAuthorizeAPIEndPoint().as('authorize')
            cy.get('@authorize').should((response) => {
            expect(response.status).to.eq(200)
            // expect(response).to.have.length(500)
            expect(response).to.have.property('headers').to.include({
                'server': 'Colt'
                // ,
                // 'content-type': 'application/json;charset=UTF-8'
            })
            //check for response bdoy to have all elements as below
            expect(response.body).property(data.authAPiJSONData.operationElement)
            expect(response.body).property(data.authAPiJSONData.dataElement)
            expect(response.body).to.containSubset
                (
                    {
                        "operationStatus": { "success": true, "messages": ["success"] }
                    }
                )

            //To test only selected data
            expect(response.body.operationStatus.success).to.eq(true)
            expect(response.body.operationStatus.messages[0]).to.eq('success')
            expect(response.body.data[0].userName).to.equalIgnoreCase(data.InternalAdmin)
            expect(response.body.data[0].roles[7]).to.eq(data.authAPiData.addressDoctor)
            expect(response.body.data[0].firstName).to.eq(data.authAPiData.firstName)
            expect(response.body.data[0].employeeType).to.eq(data.authAPiData.employeeType)
            expect(response.body.data[0].userType).to.eq(data.authAPiData.userType)

            //data is an array so start with [] and declare diff objs and compare all imp data
            expect(response.body.data).to.containSubset(
                [
                    {
                        "roles":
                            [
                                "EveryOne", "AccountExec", "Colt", "Request_For_Approval", "RemoveUser", "ViewMyDraftOrder", "RTDTool", "AddressDoctor", "RaiseFaultTicket", "ViewStaticContent", "ViewMyLiveServices", "EditUser", "viewDocument", "AddUser", "ViewRegulatoryInformation", "ViewServices", "ViewOrders", "ViewBills", "ManageDocument", "RaiseBillingEnquiry", "RaiseServiceTicket", "DraftICServices", "ViewLiveICServices", "ViewTickets", "RaiseOtherEnquiry"
                            ],
                        "firstName": "test_123",
                        "lastName": "qwe",
                        "email": "Deepesh.Thukral@colt.net",
                        "belongsToOCN": null,
                        "isAdmin": false, "belongsToBCN": null,
                        "isPartner": false,
                        "title": "Mr.",
                        "isActive": true,
                        "lastLoginDate": null,
                        "lastModifiedBy": null,
                        "employeeType": "Colt Employee",
                        "userName": "test2020ia",
                        "userType": "ACCOUNT_EXEC",
                        "ochId": ""

                    }
                ]
            )
        })
       })

    })
})