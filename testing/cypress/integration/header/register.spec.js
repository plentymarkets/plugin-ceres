// / <reference types="cypress" />
context("Header topbar registration", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open quick registration modal", () => 
    {
        cy.clickElement("registerSelect");
    });

    it("should register a new user successfuly", () => 
    {

        cy.clickElement("registerSelect");

        let mail = `user${new Date().valueOf()}@plentye2etest.de`;
        let password = 'Testuser1234';
        cy.getByTestingAttr('mailRegister').type(mail, {delay: 40});
        cy.getByTestingAttr('passwordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('repeatPasswordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('privacy-policy-accept-register').click();

        // add alias to register function
        cy.server().route('POST', '/rest/io/customer').as('registerUser');

        cy.getByTestingAttr('register-submit').click();

        cy.wait('@registerUser').then((xhr) => {

            expect(xhr.status).to.eql(200);

            // wait for vue store to init after page reload
            cy.wait(5000);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.true;
            });
        })
        
    });

    it("should fail to register a new user | mail already in use", () => 
    {

        cy.clickElement("registerSelect");

        let password = 'Testuser1234';
        cy.getByTestingAttr('mailRegister').type('plentytest@plenty.de', {delay: 40});
        cy.getByTestingAttr('passwordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('repeatPasswordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('privacy-policy-accept-register').click();

        // add alias to register function
        cy.server().route('POST', '/rest/io/customer').as('registerUser');

        cy.getByTestingAttr('register-submit').click();

        cy.wait('@registerUser').then((xhr) => {


            // email already in use
            expect(xhr.status).to.eql(226);

            // wait for vue store to init after page reload
            cy.wait(5000);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.false;
            });
        })
        
    });

    it("should fail to register a new user | passwords dont match", () => 
    {

        cy.clickElement("registerSelect");

        let mail = 'plentytest@plenty.de';
        let password = 'Testuser1234';
        cy.getByTestingAttr('mailRegister').type(mail, {delay: 40});
        cy.getByTestingAttr('passwordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('repeatPasswordRegister').type('wrongPassword1337', {delay: 30});
        cy.getByTestingAttr('privacy-policy-accept-register').click();
        cy.getByTestingAttr('register-submit').click();

        cy.getByTestingAttr('repeatPasswordRegister').parent().should("have.class", "error");
        
    });

    it("should fail to register a new user | privacy policy not accepted", () => 
    {

        cy.clickElement("registerSelect");

        let mail = 'plentytest@plenty.de';
        let password = 'Testuser1234';
        cy.getByTestingAttr('mailRegister').type(mail, {delay: 30});
        cy.getByTestingAttr('passwordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('repeatPasswordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('register-submit').click();

        cy.getByTestingAttr('privacy-policy-accept-register').parent().should("have.class", "error");
        
    });

    it("should fail to register a new user | no vaild mail pattern", () => 
    {

        cy.clickElement("registerSelect");

        let mail = 'plentytest@plenty';
        let password = 'Testuser1234';
        cy.getByTestingAttr('mailRegister').type(mail, {delay: 40});
        cy.getByTestingAttr('passwordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('repeatPasswordRegister').type(password, {delay: 30});
        cy.getByTestingAttr('privacy-policy-accept-register').click();

        cy.getByTestingAttr('register-submit').click();

        cy.getByTestingAttr('mailRegister').parent().should("have.class", "error");
        
    });
});
