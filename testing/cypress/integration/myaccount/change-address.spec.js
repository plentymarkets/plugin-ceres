// / <reference types="cypress" />
context("Change Address", () =>
{

    before(() =>
    {
        cy.login("test_3@email.com", "parola123");
        cy.visit("/my-new-account/");
    });

    after(() =>
    {
        deleteAllAddresses();
    });

    it("should add two billing address", () =>
    {
        cy.intercept("POST", "/rest/io/customer/address/?typeId=1").as("createAddress");

        addAddress({
            firstName: "First Address",
            lastName: "doe",
            street: "1",
            houseNumber: "1",
            zip: "1",
            town: "berlin"
        });

        addAddress({
            firstName: "Second Address",
            lastName: "mark",
            street: "2",
            houseNumber: "2",
            zip: "2",
            town: "berlin"
        });

        cy.wait("@createAddress").then((res) =>
        {
            const addrId = JSON.parse(res.response.body).data.id;

            expect(res.response.statusCode).to.eql(201);
            // check if address added correctly
            cy.getStore().then((store) =>
            {
                expect(store.state.address.billingAddressId).to.be.equals(addrId);
            });
        });
    });

    it("should logout", () =>
    {
        cy.intercept("POST", "/rest/io/customer/logout").as("logoutUser");
        cy.get(".widget-logout-button").click();
        cy.wait("@logoutUser").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
            // wait for vue store to init after page reload
            cy.wait(500);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.false;
            });
        });
    });

    it("should login", () => {
        cy.login("test_3@email.com", "parola123");
        cy.visit("/my-new-account/");



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
