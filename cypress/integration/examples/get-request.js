// <reference types="Cypress" />


describe('Test posts API Functionality', function () {
    
    var result;
    it.only('validate status codes on posts api', function () {
       result = cy.request('http://localhost:3000/posts')
       result.its('status').should('equal',200)        
    })

    it.only('validate response of posts api', function () {
        result = cy.request({
            method: 'GET',           
            url: 'http://localhost:3000/posts',
            headers: {
                accept: 'application/json'
            }        
        }).then(response => {
            cy.log(response)
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            expect(body[0].title).equal('Example JSon server')
            expect(body[0]).has.property("title","Example JSon server")
            expect(body[1]).has.property("author", "Medhansh")

            body.forEach(function(item)  {
                expect(item).to.have.all.keys("id","title","author")
                cy.log('Author '+ item["author"]+ ' &  title is '+ item["title"] )
                
            });

        })


       
    })
})