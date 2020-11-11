// / <reference types="cypress" />
context("Single Item special tests", () =>
{
    it("should display notification for overselling", () =>
    {
        cy.visit("/wohnzimmer/sofas/zweisitzer-paradise-now_132_1066/");
        const addButton = cy.getByTestingAttr("quantity-btn-add");

        for (let i = 0; i < 19; i++)
        {
            addButton.click();
        }

        cy.get(".add-to-basket-container > button").click();
    });

});
