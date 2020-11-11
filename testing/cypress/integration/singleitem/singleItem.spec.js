// / <reference types="cypress" />
context("Single Item", () =>
{
    beforeEach(() =>
    {
        cy.visit("/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");

    });

    it("should check for article name", () =>
    {
        cy.get(".item-name").then(($itemName) =>
        {
            expect($itemName).to.contain("Loungesessel Herkules");
        });
    });

    it("should check for article producer", () =>
    {
        cy.get(".producertag").then(($producerName) =>
        {
            expect($producerName).to.contain("A & C Design");
        });
    });

    it("should check for the RRP", () =>
    {
        cy.get(".crossprice").then(($crossPrice) =>
        {
            expect($crossPrice).to.contain("0,80");
        });
    });

    it("should check for the price", () =>
    {
        cy.get(".price").then(($price) =>
        {
            expect($price).to.contain("0,70");
        });
    });

    it("should check for base price", () =>
    {
        cy.get(".base-price-value").then(($basePrice) =>
        {
            expect($basePrice).to.contain("0,70");
        });
    });

    it("should check for lowest breadcrumb level", () =>
    {
        cy.get(".breadcrumb-item.active").then(($breadcrumbItem) =>
        {
            expect($breadcrumbItem).to.contain("Loungesessel Herkules");
        });
    });

    it("should display correct item availability", () =>
    {
        cy.get(".availability").then( (availability) =>
        {
            expect(availability).to.contain("Sofort versandfertig, Lieferzeit 48h");
        });
    });

    it("should display correct description", () =>
    {
        cy.get(".tab-pane.active").then((descText) =>
        {
            expect(descText).to.contain("In seinem Cremeweiss wirkt dieses Sitzmöbel äußerst edel und luxuriös. Die Standfüße aus echtem Holz gliedern sich unauffällig und dezent in das Gesamtbild des Sessels ein. Für die Herstellung werden ausnahmslos nur die besten Ressourcen verwendet. Bestes Buchenholz aus heimischen Wäldern und feinstes Kalbsleder machen dieses Möbelstück zu einem einzigartigen Schmuckstück.");
        });
    });

    it("should display correct details", () =>
    {
        const content = [
            "Art.-ID", "116", "Zustand", "Neu", "Altersfreigabe", "Ohne Altersbeschränkung", "Hersteller", "A & C Design", "Herstellungsland", "Deutschland", "Inhalt", "1 Stück"
        ];

        cy.get(".nav-tabs").children().last().click();
        cy.get(".tab-pane.active").then((descText) =>
        {
            content.forEach((text) =>
            {
                expect(descText).to.contain(text);
            });
        });
    });

    it("should display scale prices and apply marker on quantity change", () =>
    {
        cy.getByTestingAttr("quantity-btn-add").click().click().click().click();
        cy.get(".graduated-prices-table").should("exist");

        cy.get(".graduated-prices-table").children().first().children().last().children().first().should("have.class", "fa-check-circle-o");
        cy.getByTestingAttr("quantity-btn-add").click().click().click().click().click();

        cy.get(".graduated-prices-table").children().last().children().last().children().first().should("have.class", "fa-check-circle-o");

    });

    it("should display tags and open in search on click", () =>
    {
        cy.get(".tag-widget").should("exist");
        // click on first tag
        cy.get(".tag-widget").children().first().children().first().click();

        cy.wait(1000);
        cy.location("pathname").should("eq", "/neu_t1/");
    });
});
