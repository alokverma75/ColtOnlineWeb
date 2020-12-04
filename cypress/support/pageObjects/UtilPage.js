

class UtilPage{

   // This method will take a snapshot based on the screen name passed
    takePercySnapShot(snapshotName){
        return cy.percySnapshot(snapshotName);
    }

    // This will return a list of devices for which responsiveness test to be done
    getListOfDevicesForResponsiveness(){
        // const sizes = ['ipad-2', 'ipad-mini', 'iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+', 'iphone-7','iphone-8', 'iphone-x', 'iphone-xr', 'iphone-se2', 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16', 'samsung-note9', 'samsung-s10']

        // only for devlopement and during checkin code 
        const sizes = ['ipad-2', 'ipad-mini']

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


}

export default UtilPage;