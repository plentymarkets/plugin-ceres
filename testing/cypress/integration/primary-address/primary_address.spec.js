// / <reference types="cypress" />
context("Primary Address", () =>
{
    afterEach(() =>
    {
        deleteAllAddresses();
    });

    it("should create register user", () =>
    {
        cy.visit("/register/");
        cy.intercept("POST", "/rest/io/customer").as("registerCustomer");
        cy.getByTestingAttr("mail-register").type("test@plenty.com", { delay: 5 });
        cy.getByTestingAttr("password-register").type("TestTest00", { delay: 5 });
        cy.getByTestingAttr("repeat-password-register").type("TestTest00", { delay: 15 });
        cy.getByTestingAttr("billing-address-de-firstname").type("x").clear().type("Test", { delay: 5 });
        cy.getByTestingAttr("billing-address-de-lastname").type("x").clear().type("Test", { delay: 5 });
        cy.getByTestingAttr("billing-address-de-street").type("x").clear().type("Test1", { delay: 5 });
        cy.getByTestingAttr("billing-address-de-house-number").type("x").clear().type("12", { delay: 5 });
        cy.getByTestingAttr("billing-address-de-zip").type("x").clear().type("12345", { delay: 5 });
        cy.getByTestingAttr("billing-address-de-town").type("x").clear().type("Munich", { delay: 5 });
        cy.getByTestingAttr("privacy-policy-accept-register").first().click();
        cy.getByTestingAttr("register-submit").first().click();
        cy.wait(1000);
        cy.visit("/my-account/");
        cy.get(".addressType1").should("have.class", "primaryAddress");
    });


    it("should add first billing address", () =>
    {
        cy.login("test@plenty.com", "TestTest00");
        cy.visit("/my-account/");
        cy.intercept("POST", "/rest/io/customer/address/?typeId=1").as("createAddress");

        addAddress({
            firstName: "First Address",
            lastName: "doe",
            street: "1",
            houseNumber: "1",
            zip: "1",
            town: "berlin"
        });

        cy.wait("@createAddress").then((res) =>
        {
            const theResponse = JSON.parse(res.response.body);

            cy.log("the response", theResponse.data);
            const addrId = theResponse.data.id;
            const isPrimary = theResponse.data.pivot.isPrimary;

            expect(isPrimary).to.be.equals(0);
            expect(res.response.statusCode).to.eql(201);
            // check if address added correctly
            cy.getStore().then((store) =>
            {
                expect(store.state.address.billingAddressId).to.be.equals(addrId);
            });
        });
        cy.wait("@createAddress").then((res) =>
        {
            const theResponse = JSON.parse(res.response.body);

            cy.log("the response", theResponse.data);
            const addrId = theResponse.data.id;
            const isPrimary = theResponse.data.pivot.isPrimary;

            expect(isPrimary).to.be.equals(1);
            expect(res.response.statusCode).to.eql(201);
            // check if address added correctly
            cy.getStore().then((store) =>
            {
                expect(store.state.address.billingAddressId).to.be.equals(addrId);
            });
        });
    });
    function addAddress(data)
    {
        cy.getByTestingAttr("billing-address-select-add").click();
        cy.getByTestingAttr("salutation-select").eq(0).select("male");
        cy.getByTestingAttr("address-country-select").find(`select`).eq(0).select("Germany");

        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`)
            .type("x").clear().type(data.firstName, { delay: 15 });
        cy.getByTestingAttr("billing-address-de-name-inputs")
            .find(`input[name="lastName"]`).type(data.lastName, { delay: 15 });
        cy.getByTestingAttr("billing-address-de-street-inputs")
            .find(`input[name="street"]`).type(data.street, { delay: 15 });
        cy.getByTestingAttr("billing-address-de-street-inputs")
            .find(`input[name="housenumber"]`).type(data.houseNumber, { delay: 15 });
        cy.getByTestingAttr("billing-address-de-zip").type(data.zip, { delay: 15 });
        cy.getByTestingAttr("billing-address-de-town").type(data.town, { delay: 15 });

        cy.getByTestingAttr("modal-submit").first().click();
    }

    function deleteAllAddresses()
    {
        cy.getStore().then((store) =>
        {
            store.state.address.billingAddressList.forEach(address =>
            {
                // Address with wrong vat-id needed for special test case
                if (address.id !== 2429)
                {
                    store.dispatch("deleteAddress", { address, addressType: 1 });
                }
            });

            store.state.address.deliveryAddressList.forEach(address =>
            {
                if (address.id !== -99)
                {
                    store.dispatch("deleteAddress", { address, addressType: 2 });
                }
            });
        });
    }

});