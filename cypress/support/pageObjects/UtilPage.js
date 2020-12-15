

class UtilPage{
    

   // This method will take a snapshot based on the screen name passed
    takePercySnapShot(snapshotName){
        return cy.percySnapshot(snapshotName);
    }

    // This will return a list of devices for which responsiveness test to be done
    getListOfDevicesForResponsiveness(){
        // const sizes = ['ipad-2', 'ipad-mini', 'iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+', 'iphone-7','iphone-8', 'iphone-x', 'iphone-xr', 'iphone-se2', 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16', 'samsung-note9', 'samsung-s10']

        // only for devlopement and during checkin code 
        const sizes = ['macbook-16']

        return sizes;
    }
    //This method will return API authorize end point
    getAuthorizeAPIEndPoint(){
        return cy.request('api/authorize');
    }

    visitTicketsPage() {
        return cy.visit(Cypress.env('ticketsURL'))
    }

    visitServicesPage(){
        return cy.visit(Cypress.env('servicesURL'))
    }

    visitBillingPage() {
        return cy.visit(Cypress.env('billingURL'))
    }

    visitPlannedWorksPage() {
        return cy.visit(Cypress.env('plannedWorksURL'))
    }

    getNextButton(){
        return cy.get('.text-right > .btn');
    }

    reloadPage(){
        return cy.reload(true);
    }

    clearCookies(){
        return cy.clearCookies();
    }

    clearLocalStorage(){
        return cy.clearLocalStorage();
    }

     checkIfNeedToClickonDuplicateTicketButton() {
         
        cy.get('.col > .ct-btn-primary').then(button =>{
            const buttontext = button.text()
            const continueButtonText = 'Continue with Raise Ticket';
            var booleanValue = (buttontext.normalize() === continueButtonText.normalize());
            cy.log("boolean value of comparison=== " + booleanValue)
            if (booleanValue) {                
                cy.get('.col > .ct-btn-primary').click()
                expect(buttontext).to.eq('Continue with Raise Ticket')
            }         
            // if (buttontext.includes('Continue with Raise Ticket')){
            //     cy.get('.col > .ct-btn-primary').click()
            //     expect(buttontext).to.eq('Continue with Raise Ticket')
            // } 
        })
         
    }

}

export default UtilPage;