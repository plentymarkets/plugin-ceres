// / <reference types="cypress" />
context("Variation Select - Dropdown", () =>
{
    /*
    Artikel-ID 138: Ein Attribut - Dropdown - Nicht kaufbar ausgeblendet

    1078 - 1080 angezeigt
    1081 (blau) nicht angezeigt
    */

    it("should not show unavailable variation for item 138", () =>
    {
        cy.visit("/variantenauswahl/ein-attribut-dropdown_138_1078/");

        cy.getByTestingAttr("variation-select-dropdown-label").should("contain", "Farbe - Dropdown - Nicht Gruppiert");

        cy.getByTestingAttr("variation-select-dropdown").find("option[value='5']").should("contain", "rot");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='6']").should("contain", "schwarz");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='7']").should("contain", "lila");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='8']").should("not.exist");
    });

    it("should be able to add all selectable variations for item 138 to basket", () =>
    {
        cy.visit("/variantenauswahl/ein-attribut-dropdown_138_1078/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").select("schwarz");
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-dropdown_138_1079/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").select("lila");
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-dropdown_138_1080/");
        isSaleable();
    });

    /*
    Artikel-ID 139: Ein Attribut - Dropdown - Nicht kaufbar angezeigt

    1083 - 1086 angezeigt
    1086  (blau) nicht kaufbar
    */

    it("should show sold out variation for item 139", () =>
    {
        cy.visit("/ein-attribut-dropdown-nicht-verfuegbar-angezeigt_139_1083/");

        cy.getByTestingAttr("variation-select-dropdown-label").should("contain", "Farbe - Dropdown - Nicht Gruppiert");

        cy.getByTestingAttr("variation-select-dropdown").find("option[value='5']").should("contain", "rot");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='6']").should("contain", "schwarz");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='7']").should("contain", "lila");
        cy.getByTestingAttr("variation-select-dropdown").find("option[value='8']").should("contain", "blau (Ausverkauft)");
    });

    it("should be able to add all selectable variations for item 139 to basket", () =>
    {
        cy.visit("/ein-attribut-dropdown-nicht-verfuegbar-angezeigt_139_1083/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").select("schwarz");
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-dropdown-nicht-verfuegbar-angezeigt_139_1084/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").select("lila");
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-dropdown-nicht-verfuegbar-angezeigt_139_1085/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").select("blau (Ausverkauft)");
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-dropdown-nicht-verfuegbar-angezeigt_139_1086/");
        isNotSaleable();
    });

    /*
    Artikel-ID 140: Zwei Attribute - Dropdown - Nicht kaufbar angezeigt - Nicht verfügbar angezeigt

    1089 - 1107 angezeigt
    1086  (schwarz, xs) nicht kaufbar
    (rot, xs) nicht verfügbare Variante, die Variante mit den Attributen gibt es nicht
    */

    it("should show correct variationt selects for item 140", () =>
    {
        cy.visit("variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1090/");

        cy.getByTestingAttr("variation-select-dropdown-label").eq(0).should("contain", "Farbe - Dropdown - Nicht Gruppiert");

        cy.getByTestingAttr("variation-select-dropdown").eq(0).find("option[value='5']").should("contain", "rot (nicht verfügbar)");
        cy.getByTestingAttr("variation-select-dropdown").eq(0).find("option[value='6']").should("contain", "schwarz (Ausverkauft)");
        cy.getByTestingAttr("variation-select-dropdown").eq(0).find("option[value='7']").should("contain", "lila");
        cy.getByTestingAttr("variation-select-dropdown").eq(0).find("option[value='8']").should("contain", "blau");

        cy.getByTestingAttr("variation-select-dropdown-label").eq(1).should("contain", "Größe - Dropdown - Nicht Gruppiert");

        cy.getByTestingAttr("variation-select-dropdown").eq(1).find("option[value='9']").should("contain", "xs");
        cy.getByTestingAttr("variation-select-dropdown").eq(1).find("option[value='10']").should("contain", "s");
        cy.getByTestingAttr("variation-select-dropdown").eq(1).find("option[value='11']").should("contain", "m");
        cy.getByTestingAttr("variation-select-dropdown").eq(1).find("option[value='12']").should("contain", "l");
        cy.getByTestingAttr("variation-select-dropdown").eq(1).find("option[value='13']").should("contain", "xl");
    });

    it("should be able to add all selectable variations for item 140 to basket", () =>
    {
        cy.visit("variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1093/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").eq(0).select("lila");
        cy.location("pathname").should("eq", "/variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1094/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").eq(0).select("blau");
        cy.location("pathname").should("eq", "/variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1095/");
        isSaleable();

        cy.getByTestingAttr("variation-select-dropdown").eq(0).select("rot");
        cy.location("pathname").should("eq", "/variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1092/");
        isSaleable();
    });

    it("should not be possible to buy soldout variant", () =>
    {
        cy.visit("/variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1093/");

        cy.getByTestingAttr("variation-select-dropdown").eq(1).select("xs (Ausverkauft)");
        cy.location("pathname").should("eq", "/variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1089/");
        isNotSaleable();
    });

    it("should deselect attribute combination that is not selectable (not available)", () =>
    {
        cy.visit("variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140_1090/");

        cy.getByTestingAttr("variation-select-dropdown").eq(0).select("rot (nicht verfügbar)");
        cy.location("pathname").should("eq", "/variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140/");
        isNotSaleable();
        cy.getByTestingAttr("variation-select-dropdown").eq(1).find("option[value]").should("contain", "Keine Auswahl");

        cy.get(".notification-wrapper").children().first().should("have.class", "alert-warning").should("contain", "Größe - Dropdown - Nicht Gruppiert nicht verfügbar.");
        cy.get(".notification-wrapper button").click();

        cy.getByTestingAttr("variation-select-dropdown").eq(1).select("xs (nicht verfügbar)");
        cy.location("pathname").should("eq", "/variantenauswahl/zwei-attribute-dropdown-nicht-kaufbar-angezeigt-nicht-verfuegbar-angezeigt_140/");
        isNotSaleable();
        cy.get(".notification-wrapper").children().first().should("have.class", "alert-warning").should("contain", "Farbe - Dropdown - Nicht Gruppiert nicht verfügbar.");
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
