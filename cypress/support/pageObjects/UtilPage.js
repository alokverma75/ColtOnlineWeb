class UtilPage
{
    getErrorAlert() {
        return cy.get('.alert');
    }

    getWait(milliseconds){
        const ms = milliseconds;
        return cy.wait(ms);
    }

}

export default UtilPage;