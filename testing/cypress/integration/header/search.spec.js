// / <reference types="cypress" />
context("Header topbar search", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should check for search bar", () => 
    {
        cy.clickElement("searchbox-select");
    });

    it("should search for item by name", () => 
    {
        let search = 'Loungesessel Herkules';


        cy.clickElement("searchbox-select");
        cy.get('.search-input').should('exist');

        cy.get('.search-input').type(search, {delay: 35});

        cy.server().route('GET', '/rest/io/item/search/autocomplete/**').as('autocomplete');
        cy.wait('@autocomplete');

        cy.get('.search-input').type('{enter}', {delay: 15});
        cy.location("pathname").should("eq", "/search/");

        cy.get('.product-list').should('exist');
        cy.get('.product-list').find('.thumb-title').should('contain',search);
        
    });

    it("should search for item by id", () => 
    {
        let itemName = 'Loungesessel Herkules';
        let search = 116;

        cy.clickElement("searchbox-select");
        cy.get('.search-input').should('exist');

        cy.get('.search-input').type(search, {delay: 35});

        cy.server().route('GET', '/rest/io/item/search/autocomplete/**').as('autocomplete');
        cy.wait('@autocomplete');

        cy.get('.search-input').type('{enter}', {delay: 35});
        cy.location("pathname").should("eq", "/search/");

        cy.get('.product-list').should('exist');
        cy.get('.product-list').find('.thumb-title').should('contain', itemName);
        
    });

    it("should search for item with autosuggestion", () => 
    {
        let itemName = 'Loungesessel Herkules';
        let itemUrl = '/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/'

        cy.clickElement("searchbox-select");
        cy.get('.search-input').should('exist');

        cy.get('.search-input').type(itemName, {delay: 35});

        cy.server().route('GET', '/rest/io/item/search/autocomplete/**').as('autocomplete');

        cy.wait('@autocomplete').then((xhr) => {

            expect(xhr.status).to.eql(200);
            cy.getByTestingAttr('autocomplete-list').should('exist');
            cy.getByTestingAttr('autocomplete-list').children().first().click();
            cy.location("pathname").should("eq", itemUrl);
        });
    });

});