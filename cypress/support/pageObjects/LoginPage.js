class LoginPage {

    getUserIDField(){
        return cy.get("#userId");
    }

    getPasswordField(){
        return cy.get("#password");
    }
    
    getLoginButton(){
        return cy.get('.btnn-danger');
    }
   
}

export default LoginPage;