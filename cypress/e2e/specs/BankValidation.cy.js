let helperFunction = require('../../support/pageobjects/helper_file');

let helperFunctions;
describe("Log-in into Banking Application", function () {
    beforeEach("Log-in into application", () => {
        cy.fixture('testData.json').then(function (testdata) {
            this.testdata = testdata
            cy.log(this.testdata["Ron Weasly"][this.testdata["Ron Weasly"]["Account"][0]])
            helperFunctions = new helperFunction("Ron Weasly", 0, this.testdata);
            helperFunctions.login();
        })

    })

    it("Select User", () => {
        helperFunctions.userValidation()
    })

    it("Validate Welcome Page", () => {
        helperFunctions.welcomePageValidation()
    })


    it("Transaction Page", () => {
        cy.contains('Transactions').click()
        cy.contains('Back').click()
    })

    it("Validate Deposit", () => {
        helperFunctions.depositeValidation()
    })

    it("Validate Withdrawl", () => {
        helperFunctions.validateWithdrawl()
    })
})