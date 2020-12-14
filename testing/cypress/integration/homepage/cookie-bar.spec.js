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
        cy.getByTestingAttr("cookie-bar").should("exist");
    });

    it("Should close the cookie bar on saving", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-save").click();
        cy.getByTestingAttr("cookie-bar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookie-bar").should("have.class", "out");
    });

    it("Should close the cookie bar on accept all", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-accept-all").click();
        cy.getByTestingAttr("cookie-bar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookie-bar").should("have.class", "out");
    });

    it("Should close the cookie bar on accept all and stay closed after reload", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-accept-all").click();
        cy.reload();
        cy.getByTestingAttr("cookie-bar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookie-bar").should("have.class", "out");
    });

    it("Should close the cookie bar on save and stay closed after reload", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-save").click();
        cy.reload();
        cy.getByTestingAttr("cookie-bar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookie-bar").should("have.class", "out");
    });

    it("Should show more information", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-show-more-information").click();
        cy.getByTestingAttr("cookie-bar").find(".privacy-settings").should("exist");
    });

    it("Should hide more information", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-show-more-information").click();
        cy.getByTestingAttr("cookie-bar-hide-more-information").should("exist");
        cy.getByTestingAttr("cookie-bar-hide-more-information").click();
        cy.getByTestingAttr("cookie-bar-show-more-information").should("exist");
    });

    it("Should consent all on accept all", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-accept-all").click();

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
        cy.getByTestingAttr("cookie-bar-show-more-information").click();
        cy.getByTestingAttr("cookie-bar").find(".privacy-settings .custom-control").should("have.length", 2);
    });

    it("Should consent group on toggle", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-show-more-information").click();
        cy.getByTestingAttr("cookie-bar").find(".privacy-settings .custom-control").first().click();

        cy.getStore().then((store) =>
        {
            let isConsented = false;

            for (const key in store.state.consents.consents.paypal)
            {
                isConsented = store.state.consents.consents.paypal[key];
                if (!isConsented)
                {
                    break;
                }
            }

            expect(isConsented).to.be.false;
        });
    });

    it("Should open more information for privacy settings and hide them again", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-show-more-information").click();

        cy.get(".consent-group").first().find("[data-testing=privacy-settings-show-more-information]").should("exist");
        cy.get(".consent-group").first().find("[data-testing=privacy-settings-show-more-information]").click();
        cy.get(".consent-group").first().find("[data-testing=privacy-settings-hide-more-information]").should("exist");
        cy.get(".consent-group").first().find("[data-testing=privacy-settings-hide-more-information]").click();
        cy.get(".consent-group").first().find("[data-testing=privacy-settings-show-more-information]").should("exist");
    });

    it("Should consent a single privacy setting entry", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookie-bar-show-more-information").click();
        cy.get(".consent-group").eq(0).find("[data-testing=privacy-settings-show-more-information]").click();
        cy.get(".consent-group").eq(0).find(".consent .custom-control").click();

        cy.getStore().then((store) =>
        {
            expect(store.state.consents.consents.paypal["paypal-cookies"]).to.be.false;
        });
    });
});
