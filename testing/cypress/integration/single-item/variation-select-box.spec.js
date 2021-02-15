// / <reference types="cypress" />
context("Variation Select - Box", () =>
{
    /*
    Artikel-ID 141: Ein Attribut - Box - Nicht kaufbar ausgeblendet

    1109 - 1110 angezeigt
    1111 (Professional) nicht angezeigt
    */

    it("should not show unavailable variation for item 141", () =>
    {
        cy.visit("variantenauswahl/ein-attribut-box-nicht-kaufbar-ausgeblendet_141_1109/");

        cy.getByTestingAttr("attribute-name").should("contain", "Ausstattung - Box - Nicht gruppiert:");
        cy.getByTestingAttr("attribute-value").should("contain", "Basic");

        cy.getByTestingAttr("variation-select-box").eq(0).should("contain", "Basic").should("have.class", "active");
        cy.getByTestingAttr("variation-select-box").eq(1).should("contain", "Advanced");
        cy.getByTestingAttr("variation-select-box").eq(2).should("not.exist");
        isSaleable();

        cy.getByTestingAttr("variation-select-box").eq(1).click();
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-box-nicht-kaufbar-ausgeblendet_141_1110/")
        cy.getByTestingAttr("variation-select-box").eq(1).should("have.class", "active");
        cy.getByTestingAttr("attribute-value").should("contain", "Advanced");
        isSaleable();
    });

    /*
    Artikel-ID 142: Ein Attribut - Box - Nicht kaufbar angezeigt

    1113 - 1115 angezeigt
    1115  (Professional) nicht kaufbar
    */

    it("should show unbuyable variation for item 142", () =>
    {
        cy.visit("variantenauswahl/ein-attribut-box-nicht-kaufbar-ausgeblendet_142_1113/");

        cy.getByTestingAttr("attribute-name").should("contain", "Ausstattung - Box - Nicht gruppiert:");
        cy.getByTestingAttr("attribute-value").should("contain", "Basic");

        cy.getByTestingAttr("variation-select-box").eq(0).should("contain", "Basic").should("have.class", "active");
        cy.getByTestingAttr("variation-select-box").eq(1).should("contain", "Advanced");
        cy.getByTestingAttr("variation-select-box").eq(2).should("contain", "Professional");
        cy.getByTestingAttr("variation-select-box").eq(3).should("not.exist");
        isSaleable();

        cy.getByTestingAttr("variation-select-box").eq(1).click();
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-box-nicht-kaufbar-angezeigt_142_1114/")
        cy.getByTestingAttr("variation-select-box").eq(1).should("have.class", "active");
        cy.getByTestingAttr("attribute-value").should("contain", "Advanced");
        isSaleable();

        cy.getByTestingAttr("variation-select-box").eq(2).should("have.class", "invalid");
        cy.getByTestingAttr("variation-select-box").eq(2).click();
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-box-nicht-kaufbar-angezeigt_142_1115/")
        cy.getByTestingAttr("variation-select-box").eq(2).should("have.class", "active");
        cy.getByTestingAttr("attribute-value").should("contain", "Professional");
        isNotSaleable();
    });

    /*
    Artikel-ID 143: Zwei Attribute - Dropdown/Box - Nicht kaufbar angezeigt - Nicht verfügbar angezeigt

    1118 - 1128 angezeigt
    1119  (schwarz, basic) nicht kaufbar
    (rot, basic) nicht verfügbare Variante, die Variante mit den Attributen gibt es nicht
    */

    it("should show all possible attributes for 143", () =>
    {
        cy.visit("/variantenauswahl/zwei-attribute-dropdown-box-nicht-gruppiert_143_1123/");

        cy.getByTestingAttr("attribute-name").should("contain", "Ausstattung - Box - Nicht gruppiert:");
        cy.getByTestingAttr("attribute-value").should("contain", "Advanced");

        cy.getByTestingAttr("variation-select-box").eq(0).should("contain", "Advanced").should("have.class", "active");
        cy.getByTestingAttr("variation-select-box").eq(1).should("contain", "Professional");
        cy.getByTestingAttr("variation-select-box").eq(2).should("contain", "Basic");
        cy.getByTestingAttr("variation-select-box").eq(3).should("not.exist");

        cy.getByTestingAttr("variation-select-dropdown-label").should("contain", "Farbe - Dropdown - Nicht Gruppiert");

        cy.getByTestingAttr("variation-select-dropdown").find("option[value='5']").should("contain", "rot");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='6']").should("contain", "schwarz");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='7']").should("contain", "lila");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='8']").should("contain", "blau");
        cy.getByTestingAttr("variation-select-dropdown").find("option").eq(4).should("not.exist");
    });

    it("should show all possible variations for variation 1119", () =>
    {
        cy.visit("/variantenauswahl/zwei-attribute-dropdown-box-nicht-gruppiert_143_1119/");

        cy.getByTestingAttr("attribute-name").should("contain", "Ausstattung - Box - Nicht gruppiert:");
        cy.getByTestingAttr("attribute-value").should("contain", "Basic");

        cy.getByTestingAttr("variation-select-dropdown").find("option[value='5']").should("contain", "rot (nicht verfügbar)");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='6']").should("contain", "schwarz (Ausverkauft)");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='7']").should("contain", "lila");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='8']").should("contain", "blau");
        cy.getByTestingAttr("variation-select-dropdown").find("option").eq(4).should("not.exist");
    });

    it("should not be possible to buy variation 1118", () =>
    {
        cy.visit("/variantenauswahl/zwei-attribute-dropdown-box-nicht-gruppiert_143_1118/");

        cy.getByTestingAttr("variation-select-box").eq(2).should("contain", "Basic").should("have.class", "active");
        isNotSaleable();

        cy.getByTestingAttr("variation-select-box").eq(0).click();
        cy.getByTestingAttr("variation-select-box").eq(2).should("have.class", "invalid")
            .should("have.attr", "data-original-title")
            .and("include", "Ausverkauft");
        isSaleable();
    });

    it("should not be possible to buy variation with color black and basic box", () =>
    {
        cy.visit("/variantenauswahl/zwei-attribute-dropdown-box-nicht-gruppiert_143_1118/");

        cy.getByTestingAttr("variation-select-box").eq(2).should("contain", "Basic").should("have.class", "active");
        isNotSaleable();

        cy.getByTestingAttr("variation-select-dropdown").select("rot (nicht verfügbar)");
        cy.location("pathname").should("eq", "/variantenauswahl/zwei-attribute-dropdown-box-nicht-gruppiert_143/");
        cy.get(".notification-wrapper").children().first()
            .should("have.class", "alert-warning")
            .should("contain", "Ausstattung - Box - Nicht gruppiert nicht verfügbar.");
        cy.getByTestingAttr("variation-select-box").eq(2).should("contain", "Basic")
            .should("have.class", "invalid")
            .should("have.attr", "data-original-title")
            .and("include", "<b>Farbe - Dropdown - Nicht Gruppiert</b> in der Auswahl nicht verfügbar.");
        cy.getByTestingAttr("attribute-name").should("contain", "Ausstattung - Box - Nicht gruppiert:");
        cy.getByTestingAttr("attribute-value").should("contain", "Keine Auswahl");
        isNotSaleable();
    }); 

    function isSaleable()
    {
        cy.get(".add-to-basket-container > button").should("not.have.class", "disabled");
    }
    function isNotSaleable()
    {
        cy.get(".add-to-basket-container > button").should("have.class", "disabled");
    }
});
