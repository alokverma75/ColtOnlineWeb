/// <reference types="Cypress" />

describe('My Second Test Suite',()=>{

it('My second testcase', ()=>{

    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    cy.get('.product:visible').should('have.length',4)
    cy.get('.products').find('.product').should('have.length', 4)
   
    cy.get('.products').find('.product').each(($el,index,$list) => {
        const vegText = $el.find('h4.product-name').text()
        if(vegText.includes('Cashews')){
           cy.wrap($el.find('button')).click()
        }
    })
    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()
    //cy.contains('PROCEED TO CHECKOUT').click()
    //cy.wait(2000)
    //cy.get('button').click()


   
})
})