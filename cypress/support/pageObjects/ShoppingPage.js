class ShoppingPage
{

    getCheckoutButton() {
        return cy.get('.nav-link.btn.btn-primary');
    }

    getCheckoutCartButton() {
        return cy.get('button.btn.btn-success');
    }

    getPreferredCountryTextField() {
        return cy.get('#country');
    }

    getCountrySuggestionBox() {
        return cy.get('.suggestions > ul > li > a');
    }

    getTermsAndConditionsChkBox() {
        return cy.get('#checkbox2');
    }

    getPurchaseButton() {
        return cy.get('input[type="submit"]');
    }

    getProductPrices(){
        return cy.get('tr td:nth-child(4) strong')
    }

    getTotalCartPrice(){
        //return cy.get('tr td:nth-child(5) strong')
        return cy.get('h3 strong')
    }


}

export default ShoppingPage;