/ <reference types="cypress" />
context("Cookiebar", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("Should show the cookie bar", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBar").should("exist");
    });

    it("Should close the cookie bar on saving", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarSave").click();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should close the cookie bar on accept all", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarAcceptAll").click();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should close the cookie bar on accept all and stay closed after reload", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarAcceptAll").click();
        cy.reload();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should close the cookie bar on save and stay closed after reload", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarSave").click();
        cy.reload();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should show more information", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarShowMoreInformation").click();
        cy.getByTestingAttr("cookieBar").get(".privacy-settings").should("exist");
    });

    it("Should hide more information", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarShowMoreInformation").click();
        cy.getByTestingAttr("cookieBarHideMoreInformation").should("exist");
        cy.getByTestingAttr("cookieBarHideMoreInformation").click();
        cy.getByTestingAttr("cookieBarShowMoreInformation").should("exist");
    });

    it.only("Should consent all on accept all", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarAcceptAll").click();

        let allConsent = false;

        // iterate over the constent store module to check if everything is consented
        cy.getStore().then(store =>
        {
            for (const constent in store.state.consents.consents)
            {
                for (const key in store.state.consents.consents[constent])
                {
                    if (!store.state.consents.consents[constent][key])
                    {
                        allConsent = false;
                        return;
                    }
                    allConsent = true;
                }
                if (!allConsent)
                {
                    return;
                }
            }
            expect(allConsent).to.be.true;
        });
    });

    it("Should display toggles for the optional cookies", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarAcceptAll").click();

    });
});
