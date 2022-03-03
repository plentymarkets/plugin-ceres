// / <reference types="cypress" />
context("Lightbox js", () =>
{
    it("should open lightbox image on click", () =>
    {
        cy.visit("/wohnzimmer/sessel-hocker/barhockerl-fury-gepolstert_107_1005/");
        cy.get(".widget-item-image").find("img").click();
        cy.get("#lightbox").should("not.have.attr", "style", "display: none;");
    });
});
