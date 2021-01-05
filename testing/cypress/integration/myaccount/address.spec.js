// / <reference types="cypress" />
context("Address", () =>
{
    const ADDRESS_TEST_USER_EMAIL = "plenty-address-test@plenty.com";

    beforeEach(() =>
    {
        cy.login(ADDRESS_TEST_USER_EMAIL);
        cy.visit("/myaccount/");
    });

    afterEach(() =>
    {
        deleteAllAddresses();
    });

    it("should add new billing address", () =>
    {
        cy.getByTestingAttr("billing-address-select-add").click();

        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("Plenty", { delay: 15 });
        // Random delay because last name was often not filled
        cy.wait(50);
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test", { delay: 15 });
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road", { delay: 15 });
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337", { delay: 15 });
        cy.getByTestingAttr("billing-address-de-zip").type("12345", { delay: 15 });
        cy.getByTestingAttr("billing-address-de-town").type("Kassel", { delay: 15 });

        cy.intercept("POST", "/rest/io/customer/address/?typeId=1").as("createAddress");
        cy.getByTestingAttr("modal-submit").first().click();

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

    it("should add new delivery address", () =>
    {
        cy.getByTestingAttr("delivery-address-select-add").click();

        cy.getByTestingAttr("delivery-address-de-firstname").type("Plenty", { delay: 15 });
        // Random delay because last name was often not filled
        cy.wait(50);
        cy.getByTestingAttr("delivery-address-de-lastname").type("Test", { delay: 15 });
        cy.getByTestingAttr("delivery-address-de-street").type("Abby Road", { delay: 15 });
        cy.getByTestingAttr("delivery-address-de-housenumber").type("1337", { delay: 15 });
        cy.getByTestingAttr("delivery-address-de-zip").type("12345", { delay: 15 });
        cy.getByTestingAttr("delivery-address-de-town").type("Kassel", { delay: 15 });

        cy.intercept("POST", "/rest/io/customer/address/?typeId=2").as("createAddress");
        cy.getByTestingAttr("modal-submit").eq(1).click();

        cy.wait("@createAddress").then((res) =>
        {
            const addrId = JSON.parse(res.response.body).data.id;

            expect(res.response.statusCode).to.eql(201);
            // check if address added correctly
            cy.getStore().then((store) =>
            {
                expect(store.state.address.deliveryAddressId).to.be.equals(addrId);
            });
        });
    });

    // update addresses
    it("should update a billing address", () =>
    {
        createNewAddress(1);
        cy.reload();
        cy.intercept("POST", "/rest/io/customer/address/?typeId=1").as("updateAddress");

        cy.getByTestingAttr("billing-address-select").click();
        cy.getByTestingAttr("billing-address-select-edit").first().click();
        cy.getByTestingAttr("billing-address-de-firstname").clear().type("UPDATE");
        cy.get("[data-testing='billing-address-select'] [data-testing='modal-submit']").click();

        cy.wait("@updateAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(201);
        });
    });

    it("should update a delivery address", () =>
    {
        createNewAddress(2);
        cy.reload();
        cy.intercept("POST", "/rest/io/customer/address/?typeId=2").as("updateAddress");

        cy.getByTestingAttr("delivery-address-select").click();
        cy.getByTestingAttr("delivery-address-select-edit").first().click();
        cy.getByTestingAttr("delivery-address-de-firstname").clear().type("UPDATE");
        cy.get("[data-testing='delivery-address-select'] [data-testing='modal-submit']").click();

        cy.wait("@updateAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(201);
        });
    });

    it("should select another billing address", () =>
    {
        createNewAddress(1);
        createNewAddress(1);
        cy.reload();

        let selectedAddressId = -1;

        cy.getStore().then((store) =>
        {
            selectedAddressId = store.state.address.billingAddressId;
        });

        cy.intercept("PUT", "/rest/io/customer/address/**/?typeId=1").as("selectAddress");
        cy.getByTestingAttr("billing-address-select").click();
        cy.getByTestingAttr("billing-address-select-dropdown").find("li").eq(1).click();

        cy.wait("@selectAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);

            cy.getStore().then((store) =>
            {
                expect(store.state.address.billingAddressId).to.not.eql(selectedAddressId);
            });
        });
    });

    it("should select another delivery address", () =>
    {
        createNewAddress(2);
        createNewAddress(2);
        cy.reload();

        let selectedAddressId = -1;

        cy.getStore().then((store) =>
        {
            selectedAddressId = store.state.address.deliveryAddressId;
        });

        cy.intercept("PUT", "/rest/io/customer/address/**/?typeId=2").as("selectAddress");
        cy.getByTestingAttr("delivery-address-select").click();
        cy.getByTestingAttr("delivery-address-select-dropdown").find("li").eq(1).click();

        cy.wait("@selectAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);

            cy.getStore().then((store) =>
            {
                expect(store.state.address.deliveryAddressId).to.not.eql(selectedAddressId);
            });
        });
    });

    it("should remove billing address", () =>
    {
        createNewAddress(1);
        cy.reload();

        cy.intercept("DELETE", "/rest/io/customer/address/**/?typeId=1").as("removeAddress");

        cy.getByTestingAttr("billing-address-select").click();
        cy.getByTestingAttr("billing-address-select-remove").first().click();
        cy.getByTestingAttr("billing-address-select-remove-modal-remove").click();

        cy.wait("@removeAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
        });
    });

    it("should remove delivery address", () =>
    {
        createNewAddress(2);
        cy.reload();

        cy.intercept("DELETE", "/rest/io/customer/address/**/?typeId=2").as("removeAddress");

        cy.getByTestingAttr("delivery-address-select").click();
        cy.getByTestingAttr("delivery-address-select-remove").first().click();
        cy.getByTestingAttr("delivery-address-select-remove-modal-remove").click();

        cy.wait("@removeAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
        });
    });

    function deleteAllAddresses()
    {
        cy.getStore().then((store) =>
        {
            store.state.address.billingAddressList.forEach(address =>
            {
                store.dispatch("deleteAddress", { address, addressType: 1 });
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

    function createNewAddress(addressType)
    {
        cy.getStore().then((store) =>
        {
            store.dispatch("createAddress", { address: getAddress(), addressType });
        });
    }

    function getAddress()
    {
        return {
            "gender":"male",
            "name1":"",
            "name2": Date.now(),
            "name3": Date.now(),
            "address1": Date.now(),
            "address2": Date.now(),
            "postalCode": Date.now(),
            "town": Date.now(),
            "countryId": 1
        };
    }
});
