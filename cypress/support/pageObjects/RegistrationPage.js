class RegistrationPage {

    getRegisterButton(){
        return cy.get('.btnn-secondary');
    }

    getFirstNameField(){
        return cy.get(':nth-child(1) > .form-control');
    }
    
    getLastNameField(){
        return cy.get(':nth-child(2) > .form-control');
    }

    getNextButton(){
        return cy.get('.text-right > .btn');
    }

    getCustomerNumberField(){
        return cy.get('.form-control');
    }

    getNextButtonToUserDetailsPage(){
        return cy.get('.col-xs-5 > .btn');
    }

    getEmailAddressTextField(){
        return cy.get('.col-md-12 > .form-control');
    }

    getPhoneNumberTextField(){
        return cy.get('.intl-tel-input > .form-control');
    }

    getTermsAndConditionsCheckBox(){
        return cy.get('.custom-control-label');
    }

    getSubmitButton(){
        return cy.get('#submitButtonUC01');
    }

   
}

export default RegistrationPage;