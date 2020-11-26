/// <reference types="Cypress" />

import HomePage from '../../support/pageObjects/HomePage';
import ShoppingPage from '../../support/pageObjects/ShoppingPage';
import UtilPage from '../../support/pageObjects/UtilPage';

describe('My Fremework TestSuite', function() {
    //called after describe and before it block
    before(function() {
        // root-level hook
        // runs before every test
        cy.fixture('example').then(function(data) 
        {
            this.data = data
        })
    })

    it('Data testcase', function() {

        const homePage = new HomePage()
        const shoppingPage = new ShoppingPage()
        const utilPage = new UtilPage()
        var sumTotal = 0.0;
        var totalCartPriceNumber = 0.0;
        
        cy.visit("https://www.rahulshettyacademy.com/" + '/angularpractice')
        //cy.visit(Cypress.env('url') +'/angularpractice')
        homePage.getNameTextField().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayNameTextField().should('have.value', this.data.name)
        homePage.getNameTextField().should('have.attr', 'minlength', '2')
        homePage.getEntreprenuerEmploymentStatusRB().should('be.disabled')
        homePage.getNameLabel().should('contain.text', 'Name')
        homePage.getNameTextField().clear()
        homePage.getNameTextField().type('a')
        utilPage.getErrorAlert().should('contain.text', 'Name should be at least 2 characters')
        homePage.getNameTextField().clear()
        homePage.getNameTextField()
        utilPage.getErrorAlert().should('contain.text', 'Name is required')
        homePage.getShopTab().click()
        this.data.productNames.forEach(function(element){
            cy.selectProduct(element)
        })
        
        shoppingPage.getCheckoutButton().click()

       //We need to read elements one by one and then resolve promise
        shoppingPage.getProductPrices().each((element, index, $list) => {

            const amount = element.text()
            var result = amount.split(" ")
            var amountString = result[1].trim()
            const amountNumber = Number.parseInt(amountString)
            sumTotal = Number.parseInt(sumTotal) + amountNumber
           
        }).then(function(){
                cy.log(sumTotal)
                
            })
        //Since we have just elemnt to read so we just need to resolve Promise  
        shoppingPage.getTotalCartPrice().then(function(element){
            var totalText = element.text()
            var result = totalText.split(" ")
            var totalCartNumber = result[1].trim()
            expect(sumTotal).to.equal(Number.parseInt(totalCartNumber))
        })
        
        shoppingPage.getCheckoutCartButton().click()
        shoppingPage.getPreferredCountryTextField().type(this.data.country)
        utilPage.getWait(3000)
        shoppingPage.getCountrySuggestionBox().should('contain.text', 'India').click()
        shoppingPage.getTermsAndConditionsChkBox().check({ force: true })
        shoppingPage.getPurchaseButton().click()
        utilPage.getErrorAlert().should('contain.text', 'Success')     
    })      

})