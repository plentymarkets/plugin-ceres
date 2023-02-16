// / <reference types="cypress" />
context("geoblocking-regulation", () =>
{

    const ERROR_MSG = "Wir versenden nicht in das ausgewählte Lieferland. Bitte wählen Sie eines der verfügbaren Länder in der Lieferadresse aus.";
    const CREATE_ADDRESS_URL = "/rest/io/customer/address?typeId=1";


    it("should show error message and the buy button disabled if you add a billing address that is not in the list of activated delivery countries as Guest", () =>
    {
        loginAsGuest();
        addAddress("Reykjavik", "Island");

        cy.getByTestingAttr("message-invalid-shipping-country").then(($element) => {
            expect($element.text().trim()).to.eql(ERROR_MSG);
        });

        cy.getByTestingAttr("place-order").should('have.class', 'disabled');

    });

    it("should not show error message and the buy button enabled if you add a billing address that is in the list of activated delivery countries as Guest", () =>
    {
        loginAsGuest();
        addAddress();

        cy.getByTestingAttr("message-invalid-shipping-country").should("not.exist")
        cy.getByTestingAttr("place-order").should("not.have.class", "disabled")
    });


    it("should delete all billing addresses", () => {
        loginAsUser();
        deleteAllAddresses();
    });


    it("should hide error message and buy button should be enabled upon adding a billing address with a valid delivery country for a Logged user", () =>
    {
        loginAsUser();
        cy.wait(1000);
        cy.get('.modal').contains('×').click();
        cy.wait(1000);

        cy.getByTestingAttr("billing-address-select-add").click();
        addAddress();

        cy.getByTestingAttr("message-invalid-shipping-country").should("not.exist");
        cy.getByTestingAttr("place-order").should("not.have.class", "disabled")
    });


    it("should show error message and disable buy button upon adding a billing address with an invalid delivery country for a Logged user", () =>
    {
        loginAsUser();
        cy.getByTestingAttr("billing-address-select-add").click();

        cy.intercept("POST", "/rest/io/customer/address?typeId=1").as("createAddress");

        addAddress("Reykjavik", "Island");

        cy.wait("@createAddress").then((res) => {
            cy.getByTestingAttr("message-invalid-shipping-country").then(($element) => {
                expect($element.text().trim()).to.eql(ERROR_MSG);
            });

            cy.getByTestingAttr("place-order").should('have.class', 'disabled');
        });


    });


    it("should hide error message and enable buy button upon changing a billing address with a valid delivery country for a Logged user", () =>
    {
        loginAsUser();
        cy.getByTestingAttr("billing-address-select-add").click();
        addAddress();

        cy.getByTestingAttr("billing-address-select-add").click();
        cy.wait(1000);
        cy.intercept("POST", "/rest/io/customer/address?typeId=1").as("createAddress");
        addAddress("Reykjavik", "Island");

        cy.wait("@createAddress").then((res) => {
            cy.getByTestingAttr("billing-address-select-open").click();
            cy.get('li.item').first().click();

            cy.getByTestingAttr("message-invalid-shipping-country").should("not.exist");
            cy.getByTestingAttr("place-order").should("not.have.class", "disabled")
        });
    });

    it("should show error message and disable buy button upon changing a billing address with an invalid delivery country for a Logged user", () =>
    {
        loginAsUser();
        cy.getByTestingAttr("billing-address-select-add").click();
        addAddress();

        cy.getByTestingAttr("billing-address-select-add").click();
        cy.intercept("POST", CREATE_ADDRESS_URL).as("createAddress");
        addAddress("Reykjavik", "Island");

        cy.wait("@createAddress").then((res) => {
            cy.getByTestingAttr("billing-address-select-open").click();

            cy.get('li.item').first().children().first().invoke("val").then((addressId) => {
                cy.intercept("PUT", "/rest/io/customer/address/"+addressId+"?typeId=1").as("updateAddress");
                cy.get('li.item').first().click();
            })

            cy.wait("@updateAddress").then((res) => {
                cy.getByTestingAttr("billing-address-select-open").click();
                cy.get('li.item').eq(1).click();

                cy.getByTestingAttr("message-invalid-shipping-country").should("exist");
                cy.getByTestingAttr("place-order").should("have.class", "disabled")
            });
        });
    });


    function loginAsUser()
    {
        cy.login()
        cy.wait(2000);
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
    }

    function loginAsGuest()
    {
        cy.loginAsGuest();
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
    }

    function addAddress(city = "Berlin", country = "Deutschland")
    {
        cy.wait(1000);
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("x").clear().type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type(city);
        cy.getByTestingAttr("address-country-select").find(`select`).eq(0).select(country);
        cy.getByTestingAttr("modal-submit").first().click();
        cy.wait(5000);
    }

    function deleteAllAddresses()
    {
        cy.getStore().then((store) =>
        {
            store.state.address.billingAddressList.forEach(address =>
            {
                store.dispatch("deleteAddress", { address, addressType: 1 });
            });
        });
    }
})