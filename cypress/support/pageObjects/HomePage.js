class HomePage
{
    getNameLabel(){
        return cy.get(':nth-child(1) > label');
    }
    
    getNameTextField(){
        return cy.get('input[name="name"]:nth-child(2)');
    }

    getTwoWayNameTextField(){
        return cy.get('input[name="name"]:nth-child(1)');
    }

    getGender(){
        return cy.get('select');
    }

    getEntreprenuerEmploymentStatusRB(){
        return cy.get('#inlineRadio3');
    }

   

    getShopTab(){
        return cy.get('.nav-link').eq(1);
    }

 

    

}


export default HomePage;