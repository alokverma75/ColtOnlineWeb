// <reference types="Cypress" />

describe('Post request()', function () {  
   var titlePost = new Array()
    let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    it('validate post request status api', function () {

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/posts',
            body: {
                "title": randomTitle,
                "author": "Cahloo prasad"
            }
             
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            expect(response.status).eq(201)
            expect(body).has.property("title", randomTitle)
        }) 
         
    })
    it('validate title of all added', function () {

        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            headers: {
                accept: 'application/json'
            }  
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body));            
            body.forEach(function(item){
                titlePost.push(item["title"]);
                })            
            }).then(() => {
                var titleLastPost = titlePost[titlePost.length-1]
                expect(titleLastPost).to.eq(randomTitle);
            })

          });
            
        })


