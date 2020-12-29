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

        cy.get(".variation-select .text-muted").should("contain", "Ausstattung - Box - Nicht gruppiert:");
        cy.get(".variation-select .text-muted + b").should("contain", "Basic");

        cy.get(".v-s-boxes > div").eq(0).should("contain", "Basic").should("have.class", "active");
        cy.get(".v-s-boxes > div").eq(1).should("contain", "Advanced");
        cy.get(".v-s-boxes > div").eq(2).should("not.exist");
        isSaleable();

        cy.get(".v-s-boxes > div").eq(1).click();
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-box-nicht-kaufbar-ausgeblendet_141_1110/")
        cy.get(".v-s-boxes > div").eq(1).should("have.class", "active");
        cy.get(".variation-select .text-muted + b").should("contain", "Advanced");
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

        cy.get(".variation-select .text-muted").should("contain", "Ausstattung - Box - Nicht gruppiert:");
        cy.get(".variation-select .text-muted + b").should("contain", "Basic");

        cy.get(".v-s-boxes > div").eq(0).should("contain", "Basic").should("have.class", "active");
        cy.get(".v-s-boxes > div").eq(1).should("contain", "Advanced");
        cy.get(".v-s-boxes > div").eq(2).should("contain", "Professional");
        isSaleable();

        cy.get(".v-s-boxes > div").eq(1).click();
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-box-nicht-kaufbar-angezeigt_142_1114/")
        cy.get(".v-s-boxes > div").eq(1).should("have.class", "active");
        cy.get(".variation-select .text-muted + b").should("contain", "Advanced");
        isSaleable();

        cy.get(".v-s-boxes > div").eq(2).should("have.class", "invalid");
        cy.get(".v-s-boxes > div").eq(2).click();
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-box-nicht-kaufbar-angezeigt_142_1115/")
        cy.get(".v-s-boxes > div").eq(2).should("have.class", "active");
        cy.get(".variation-select .text-muted + b").should("contain", "Professional");
        isNotSaleable();
    });

    /*
    Artikel-ID 143: Zwei Attribute - Dropdown/Box - Nicht kaufbar angezeigt - Nicht verfügbar angezeigt

    1118 - 1128 angezeigt1
    1119  (schwarz, basic) nicht kaufbar
    (rot, basic) nicht verfügbare Variante, die Variante mit den Attributen gibt es nicht
    */

    it.only("should show unbuyable variation for item 142", () =>
    {
        cy.visit("/variantenauswahl/zwei-attribute-dropdown-box-nicht-gruppiert_143_1122/");
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
