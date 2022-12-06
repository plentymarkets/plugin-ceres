// / <reference types="cypress" />
context("already paid payment", () =>
{
    const ALREADY_PAID_PAYMENT = "Bereits bezahlt";
    const VOUCHER_CODE = "2ZSX7H"
    const ZERO_PRICE = "0,00EUR"

    it("should enter voucher and show already paid payment option", () =>
    {
        cy.loginAsGuest();
        cy.addBasketItem(1018);
        cy.visit("/checkout");
        enterAddAddress();
        cy.wait(1000)
        cy.getByTestingAttr("coupon-input").type(VOUCHER_CODE)
        cy.getByTestingAttr("coupon-redeem").first().click();

        cy.wait(5000)
        cy.getByTestingAttr("basket-amount-net").invoke("text").then((text) =>
        {
            const netPrice = text.replace(/(\r\n|\n|\r|\s)/gm, "");
            expect(netPrice).to.eql(ZERO_PRICE);
        });

        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentList[0].name).to.be.equal(ALREADY_PAID_PAYMENT);
        });
    });

    function enterAddAddress(submit = true)
    {
        cy.wait(1000);
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("x").clear().type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type("Kassel");
        if (submit)
        {
            cy.getByTestingAttr("modal-submit").first().click();
        }
    }
})