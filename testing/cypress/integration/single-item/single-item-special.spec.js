// / <reference types="cypress" />
context("Single Item special tests", () =>
{

    // enable when system supports the oversellWarning flag from old php ui
    it.skip("should display notification for overselling", () =>
    {
        cy.visit("/wohnzimmer/sofas/zweisitzer-paradise-now_132_1066/");
        const addButton = cy.getByTestingAttr("quantity-btn-add");

        for (let i = 0; i < 19; i++)
        {
            addButton.click();
        }

        cy.get(".add-to-basket-container > button").click();
        cy.get(".notification-wrapper").children().should("exist");
        cy.get(".notification-wrapper").children().first().then((text) =>
        {
            expect(text).to.contain("Die gewählte Menge übersteigt den verfügbaren Warenbestand.");
        });
    });

});
