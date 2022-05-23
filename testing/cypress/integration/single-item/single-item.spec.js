// / <reference types="cypress" />
context("Single Item", () =>
{
    beforeEach(() =>
    {
        cy.visit("/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");

    });

    it("should check for article name", () =>
    {
        cy.get(".item-name").should("contain", "Loungesessel Herkules");
    });

    it("should check for article producer", () =>
    {
        cy.get(".producertag").should("contain", "A & C Design");
    });

    it("should check for the RRP", () =>
    {
        cy.get(".crossprice").should("contain", "0,80");
    });

    it("should check for the price", () =>
    {
        cy.get(".price").should("contain", "0,70");
    });

    it("should check for base price", () =>
    {
        cy.get(".base-price-value").should("contain", "2,80");
    });

    it("should check if graduated prices are displayed", () =>
    {
        cy.get(".graduated-price").should("contain", "0,50");
    });

    it("should check if graduated base prices are displayed", () =>
    {
        cy.get(".graduated-base-price").should("contain", "2,00");
    });

    it("should check if the item has a lowest price and the values matches the given price", () =>
    {
        cy.visit("/wohnzimmer/sofas/testartikel-mit-einem-niedrigsten-preis-der-letzten-30-tage_202_1138/");

        cy.get(".lowest-price").should("exist");
    });

    it("should check if the item has a lowest price but it's hidden, because the item has no rrp", () =>
    {
        cy.visit("/wohnzimmer/sofas/testartikel-mit-einem-niedrigsten-preis-der-letzten-30-tage_202_1144/");

        cy.get(".lowest-price").should("not.exist");
    });

    it("should check for lowest breadcrumb level", () =>
    {
        cy.get(".breadcrumb-item.active").should("contain", "Loungesessel Herkules");
    });

    it("should display correct item availability", () =>
    {
        cy.get(".availability").should("contain", "Sofort versandfertig, Lieferzeit 48h");
    });

    it("should display correct description", () =>
    {
        cy.get(".tab-pane.active").should("contain", "In seinem Cremeweiss wirkt dieses Sitzmöbel äußerst edel und luxuriös. Die Standfüße aus echtem Holz gliedern sich unauffällig und dezent in das Gesamtbild des Sessels ein. Für die Herstellung werden ausnahmslos nur die besten Ressourcen verwendet. Bestes Buchenholz aus heimischen Wäldern und feinstes Kalbsleder machen dieses Möbelstück zu einem einzigartigen Schmuckstück.");
    });

    it("should display correct details", () =>
    {
        const content = [
            "Art.-ID", "116", "Zustand", "Neu", "Altersfreigabe", "Ohne Altersbeschränkung", "Hersteller", "A & C Design", "Herstellungsland", "Deutschland", "Inhalt", "250 Gramm"
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
        cy.wait(250);
        cy.getByTestingAttr("quantity-btn-increase").click().click().click().click().click();
        cy.get(".graduated-prices-table").should("exist");

        cy.get(".graduated-prices-table").children().first().children().eq(0).children().eq(1).children().first().should("have.class", "fa-check-circle-o");
        cy.getByTestingAttr("quantity-btn-increase").click().click().click().click().click();

        cy.get(".graduated-prices-table").children().first().children().eq(2).children().eq(1).children().first().should("have.class", "fa-check-circle-o");
    });

    it("should display scaled price after quantity change", () =>
    {
        cy.wait(250);
        cy.getByTestingAttr("quantity-btn-increase").click().click().click().click();
        cy.get(".price").should("contain", "0,50");
    });

    it("should display tags and open in search on click", () =>
    {
        cy.get(".widget-tag").should("exist");
        // click on first tag
        cy.get(".widget-tag").children().first().children().first().click();

        cy.wait(1000);
        cy.location("pathname").should("eq", "/neu_t1/");
    });

    it("Shouldn't display the item as guest", () =>
    {
        cy.request({
            method: "GET",
            url: "/wohnzimmer/sessel-hocker/sessel-afterwork_122_1020/",
            failOnStatusCode: false
        }).then((resp) =>
        {
            expect(resp.status).to.eq(404);
        });
    });

    it("Should display item as logged in user with b2b customer class", () =>
    {
        cy.login("plentyb2b@plenty.de");

        cy.request({
            method: "GET",
            url: "/wohnzimmer/sessel-hocker/sessel-afterwork_122_1020/"
        }).then((resp) =>
        {
            expect(resp.status).to.eq(200);
        });
    });

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
        cy.get(".notification-wrapper").children().first().should("contain", "Die gewählte Menge übersteigt den verfügbaren Warenbestand.");
    });
});
