context("Checkout misc", () =>
{
    it("should show the info that the mail changed for user and hide it again after switching to original address", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.intercept("PUT", "/rest/io/customer/address/**/?typeId=1").as("selectAddress");
        cy.getByTestingAttr("billing-address-select").click();
        cy.getByTestingAttr("billing-address-select-dropdown").find("li").eq(1).click();

        cy.wait("@selectAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
            cy.get(".mail-changed-info").should("contain", "Alle Informationen zum Auftrag werden an CHANGED@test.de gesendet. Ihr Login erfolgt weiterhin mit mailchange@test.de");
        });

        cy.intercept("PUT", "/rest/io/customer/address/**/?typeId=1").as("selectAddress");
        cy.getByTestingAttr("billing-address-select").click();
        cy.getByTestingAttr("billing-address-select-dropdown").find("li").eq(0).click();

        cy.wait("@selectAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
            cy.get(".mail-changed-info").should("not.exist");
        });
    });

    it("should not show the info that the mail changed for user if the mail didn't change", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.get(".mail-changed-info").should("not.exist");
    });

    it("should not show the info that the mail changed for guest", () =>
    {
        cy.loginAsGuest();
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        addAddress();

        cy.get(".mail-changed-info").should("not.exist");
    });

    function addAddress()
    {
        // Force Modal
        cy.getByTestingAttr("billing-address-select-add").click({ force: true });

        cy.getByTestingAttr("billing-address-de-email-input").type("CHANGED@test.de", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type("Kassel");
        cy.getByTestingAttr("modal-submit").first().click();
    }
});
