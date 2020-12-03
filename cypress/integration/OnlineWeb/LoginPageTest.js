<reference types="Cypress" />
const sizes = ['ipad-2', 'ipad-mini', 'iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+', 'iphone-7',
    'iphone-8', 'iphone-x', 'iphone-xr', 'iphone-se2', 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16',
    'samsung-note9', 'samsung-s10']


var screenshotTaken = false;
describe('Test Login Functionality', function () {

    chai.use(require('chai-subset'));
    chai.use(require('chai-string'));

    //called after describe and before it block
    beforeEach(function () {
        // root-level hook
        // runs before every test
        cy.fixture('testdata').then(function (data) {
            this.data = data 
        })
    })

    sizes.forEach((size) => {
        it(`should test login functionality in ${size} screen`, function () {
        if (Cypress._.isArray(size)) {
            cy.viewport(size[0], size[1])
        } else {
            cy.viewport(size)
        }
        cy.visit(Cypress.env('url'))
        if (!screenshotTaken) {
        cy.percySnapshot('Login Page');
            screenshotTaken =  true;           
        }
        cy.get("#userId").type(this.data.InternalAdmin)
        cy.get("#password").type(this.data.password)
        cy.get('.btnn-danger').click()
        cy.wait(10000)
        // Cypress.on('uncaught:exception', (err, runnable) => {
        //     // returning false here prevents Cypress from
        //     // failing the test
        //     //cy.log(err)
        //     return false
        // })
        cy.request('api/authorize').as('authorize')
        cy.get('@authorize').should((response) => {
            expect(response.status).to.eq(200)
            // expect(response).to.have.length(500)
            expect(response).to.have.property('headers').to.include({
                'server': 'Colt'
                // ,
                // 'content-type': 'application/json;charset=UTF-8'
            })
            //check for response bdoy to have all elements as below
            expect(response.body).property('operationStatus')
            expect(response.body).property('data')
            expect(response.body).to.containSubset
                (
                    {
                        "operationStatus": { "success": true, "messages": ["success"] }
                    }
                )

            //To test only selected data
            expect(response.body.operationStatus.success).to.eq(true)
            expect(response.body.operationStatus.messages[0]).to.eq('success')
            expect(response.body.data[0].userName).to.equalIgnoreCase(this.data.InternalAdmin)
            expect(response.body.data[0].roles[7]).to.eq('AddressDoctor')
            expect(response.body.data[0].firstName).to.eq('test_123')
            expect(response.body.data[0].employeeType).to.eq('Colt Employee')
            expect(response.body.data[0].userType).to.eq('ACCOUNT_EXEC')

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