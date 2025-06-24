// / <reference types="cypress" />
context("Application", () =>
{
    let windowConsoleError;

    Cypress.on('window:before:load', (win) => {
        windowConsoleError = cy.spy(win.console, 'error');
    })

    afterEach(() => {
        expect(windowConsoleError).to.not.be.called;
    })

    const PAGES = {
        homepage: '/',
        category: '/wohnzimmer',
        singleItem: '/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014',
        checkout: '/checkout',
        myAccount: '/myaccount',
        wishlist: '/wish-list',
        contact: '/kontakt',
        confirmation: '/bestellbestaetigung/?orderId=437'
    };

    it('should not have console errors on homepage', () => {
        cy.visit(PAGES.homepage);

    });

    it('should not have console errors on category page', () => {
        cy.visit(PAGES.category);
    });

    it('should not have console errors on item page', () => {
        cy.visit(PAGES.singleItem);
    });

    it('should not have console errors on checkout page', () => {
        cy.loginAsGuest();
        cy.addBasketItem(1018);
        cy.visit(PAGES.checkout);
    });

    it('should not have console errors on contact', () => {
        cy.visit(PAGES.contact);
    });

    it('should not have console errors on my account', () => {
        cy.visit(PAGES.myAccount);
    });

    it('should not have console errors on wishlist', () => {
        cy.visit(PAGES.wishlist);
    });

    it('should not have console errors on order', () => {
        cy.login();
        cy.visit(PAGES.confirmation);
    });

});
