// / <reference types="cypress" />
context("Variation Select - Box", () =>
{
    /*
    Artikel-ID 141: Ein Attribut - Box - Nicht kaufbar ausgeblendet

    1109 - 1110 angezeigt
    1111 (Professional) nicht angezeigt
    */

    it.only("should not show unavailable variation for item 141", () =>
    {
        cy.visit("variantenauswahl/ein-attribut-box-nicht-kaufbar-ausgeblendet_141_1109/");

        cy.get(".variation-select .text-muted").should("contain", "Ausstattung - Box - Nicht gruppiert:");

        cy.get(".v-s-boxes < div").eq(0).should("contain", "Basic");
        cy.get(".v-s-boxes < div").eq(1).should("contain", "Advanced");
        cy.get(".v-s-boxes < div").eq(2).should('not.exist');
    });

    it("should be able to add all selectable variations for item 138 to basket", () =>
    {
        cy.visit("/variantenauswahl/ein-attribut-dropdown_138_1078/");
        cy.get(".add-to-basket-container > button").should("not.have.class", "disabled");

        cy.get(".custom-select").select("schwarz");
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-dropdown_138_1079/");
        cy.get(".add-to-basket-container > button").should("not.have.class", "disabled");

        cy.get(".custom-select").select("lila");
        cy.location("pathname").should("eq", "/variantenauswahl/ein-attribut-dropdown_138_1080/");
        cy.get(".add-to-basket-container > button").should("not.have.class", "disabled");
    });
});
