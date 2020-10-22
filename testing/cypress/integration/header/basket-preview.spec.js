// / <reference types="cypress" />
context("Header topbar currencies", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open and close basket preview on click", () =>
    {
        cy.get(".control-basket > a").should('exist');
        cy.get(".control-basket > a").click();

        cy.get('body').should("have.class", "basket-open");

        cy.get('.basket-preview-header').find('.close').click();
        cy.get('body').should("not.have.class", "basket-open");
    });

    it("should add item to basket preview", () =>
    {
        let itemUrl = "/wohnzimmer/ronny_1339";
        cy.visit(itemUrl);

        // wait for page to load
        cy.wait(2000);

        cy.get('.add-to-basket-container > button').should('exist');
        cy.get('.add-to-basket-container > button').click();

        cy.get(".control-basket > a").should('exist');
        cy.get(".control-basket > a").click();

        cy.get('body').should("have.class", "basket-open");

        cy.get('.basket-item').should('exist');
    });

    it.only("should add item to basket and show correct price in header", () =>
    {
        let itemUrl = "/wohnzimmer/ronny_1339";
        cy.visit(itemUrl);

        // wait for page to load
        cy.wait(2000);

        cy.get('.add-to-basket-container > button').should('exist');
        cy.get('.add-to-basket-container > button').click();

        cy.get(".control-basket > a").should('exist');
        cy.get(".control-basket > a").click();

        cy.get('body').should("have.class", "basket-open");

        cy.wait(2000)

        cy.get('.basket-item').should('exist');

        cy.getByTestingAttr("totals-price").invoke('text').then((text) => {
            let priceTotals = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            cy.get('.toggle-basket-preview').invoke('text').then((text) => {
            let previewButtonPriceTotals = text.replace(/(\r\n|\n|\r|\s)/gm, "");

                expect(priceTotals).to.eql(previewButtonPriceTotals);
            });
        });
    });
});
