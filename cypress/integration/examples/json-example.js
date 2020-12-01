// <reference types="Cypress" />


describe('Test API Functionality', function () {
    const spok = require('cy-spok')
    const chaiSubset = require('chai-subset');
    chai.use(chaiSubset);


    it('should test json object example', function () {

        const exampleObject = {"key":"alok","key2":"medhu"}
        const arrayValues = ["alok","medhu","ram"]
        const complex = { "key4": { "key5": "user1", "key6": "user2" }, "key2": [{"user3" :"alok"}, {"user4":"medhu"}]}
        const arrayComplex = [{ "key7": "user7" }, { "key8": "user8" }, { "key9": "user9" }]

        cy.log(exampleObject["key"])
        cy.log(exampleObject["key2"])
        cy.log(exampleObject.key2)
        cy.log(arrayValues[0])
        cy.log(arrayValues[1])
        cy.log(arrayValues[2])

        cy.log(complex.key4.key5)
        cy.log(complex.key2[0])
        cy.log(complex.key2[1])

        cy.log(complex.key2[0].user3)
        cy.log(complex.key2[1].user4)

        cy.log(arrayComplex[0].key7)
        cy.log(arrayComplex[1].key8)
        cy.log(arrayComplex[2].key9)
      
    })
})