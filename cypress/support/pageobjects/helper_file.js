'use strict'
let helperElement = require('./helperElements')
class HelperFunctions {
    constructor(userName, account, testData) {
        this.userName = userName;
        this.accountNumber = testData[userName]["Account"][account];
        this.balance = 0;
        this.currency = testData["Ron Weasly"][this.accountNumber];
    }

    login() {
        cy.visit('/');
        cy.get(helperElement.CUSTOMER_LOGIN_BUTTON).should("have.text", "Customer Login").click();
        cy.get(helperElement.SELECT_CUSTOMER).select(3).should("contain", this.userName);
        cy.get(helperElement.CLICK_LOGIN).click();
    }

    userValidation(){
        var self = this;
        cy.get(helperElement.WELCOME_USER).then(value => {
            expect(value.text().trim()).to.equal(`Welcome ${self.userName} !!`)
         })
    }

    welcomePageValidation() {
        var self = this;
        cy.get(helperElement.SELECT_USER).then(elements => {
            cy.wrap(elements).should('be.visible').select(0).contains(1007)
            cy.wrap(elements).parent('div').parent('div').find("div:nth-child(3)>strong").then(value => {
                cy.wrap(value).invoke('text').then(text => {
                    expect(text).to.contain(self.accountNumber)
                    expect(text).to.contain(self.balance)
                    expect(text).to.contain(self.currency)
                });
            })
        })
    }

    depositeValidation(){
        var self = this;
        cy.contains(helperElement.DEPOSITE).click()
        cy.get(helperElement.FORM_CONTROL).then(element => {
            cy.wrap(element).should('be.visible').invoke('attr','placeholder').should('contain', 'amount')
            cy.wrap(element).type('100{enter}')
            cy.contains(helperElement.DEPOSITE_SUCCESSFUL)
        })
    }

    validateWithdrawl(){
        var self = this;
        cy.contains(helperElement.WITHDRAWL).click()
        cy.get(helperElement.FORM_CONTROL).then(element => {
            cy.wrap(element).should('be.visible').invoke('attr','placeholder').should('contain', 'amount')
            cy.wrap(element).type('100{enter}')
            if(self.balance == 0){
                cy.contains(helperElement.WITHDRAWL_UNSUCCESSFUL)
            }else{
                cy.contains(helperElement.WITHDRAWL_SUCCESSFUL)
            }
            
        })
    }

}
module.exports = HelperFunctions;