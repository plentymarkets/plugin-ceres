// / <reference types="cypress" />
context("Newsletter", () =>
{
    it("should register newsletter with first and last name", () =>
    {
        cy.visit("/newsletter-with-name");
        cy.get(".widget-newsletter").should("exist");
        cy.intercept("POST", "/rest/io/customer/newsletter").as("nlRegister");

        cy.getByTestingAttr("nl-first-name").type("Max", { delay: 40 });
        cy.getByTestingAttr("nl-last-name").type("Mustermann", { delay: 40 });
        cy.getByTestingAttr("nl-mail").type("max.mustermann@plentymarkets.com", { delay: 40 });
        cy.getByTestingAttr("nl-policy").click();
        cy.getByTestingAttr("nl-send").click();

        cy.get(".notification-wrapper").should("contain", "Die Newsletter-Anmeldung war erfolgreich.");

        cy.wait("@nlRegister").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
        });
    });

    it("should register newsletter", () =>
    {
        cy.visit("/newsletter");
        cy.get(".widget-newsletter").should("exist");
        cy.intercept("POST", "/rest/io/customer/newsletter").as("nlRegister");

        cy.getByTestingAttr("nl-mail").type("max.mustermann@plentymarkets.com", { delay: 40 });
        cy.getByTestingAttr("nl-policy").click();
        cy.getByTestingAttr("nl-send").click();

        cy.get(".notification-wrapper").should("contain", "Die Newsletter-Anmeldung war erfolgreich.");


        cy.wait("@nlRegister").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
        });

    });

    it("should validate first and last name input", () =>
    {
        cy.visit("/newsletter-with-name");
        cy.get(".widget-newsletter").should("exist");
        cy.getByTestingAttr("nl-first-name").type("Visit", { delay: 40 });
        cy.getByTestingAttr("nl-last-name").type("https://spamsite.de", { delay: 40 });
        cy.getByTestingAttr("nl-mail").type("max.mustermann@plentymarkets.com", { delay: 40 });
        cy.getByTestingAttr("nl-policy").click();
        cy.getByTestingAttr("nl-send").click();

        cy.get(".notification-wrapper").children().should("contain", `Das Feld "NACHNAME" darf keine Sonderzeichen enthalten.`);
    });

    it("should validate mail input", () =>
    {
        cy.visit("/newsletter-with-name");
        cy.get(".widget-newsletter").should("exist");
        cy.getByTestingAttr("nl-first-name").type("Max", { delay: 40 });
        cy.getByTestingAttr("nl-last-name").type("Mustermann", { delay: 40 });
        cy.getByTestingAttr("nl-mail").type("max.mustermannplentymarkets.com", { delay: 40 });
        cy.getByTestingAttr("nl-policy").click();
        cy.getByTestingAttr("nl-send").click();
        cy.getByTestingAttr("nl-mail").parent().should("have.class", "error");
    });

    it("should validate policy", () =>
    {
        cy.visit("/newsletter");
        cy.get(".widget-newsletter").should("exist");
        cy.getByTestingAttr("nl-mail").type("max.mustermann@plentymarkets.com", { delay: 40 });
        cy.getByTestingAttr("nl-send").click();
        cy.getByTestingAttr("nl-policy").parent().should("have.class", "error");
    });

    it("should test spam newsletter rest call", () =>
    {
        cy.request({
            method: "POST",
            url: "/rest/io/customer/newsletter",
            failOnStatusCode: false,
            body: { email: "max.mustermann@plentymarkets.com", firstName: "Visit", lastName: "test.de", emailFolder: 1 }
        }).then((res) =>
        {
            expect(res.status).to.eql(400);
        });
    });

    it("should unsubscribe", () =>
    {
        cy.visit("/newsletter-unsubscribe");
        cy.intercept("DELETE", " /rest/io/customer/newsletter/**").as("unsubscribe");
       
        cy.get(".widget-newsletter-unsubscribe").should("exist");
        cy.getByTestingAttr("unsub-nl-mail").type("max.mustermann@plentymarkets.com", { delay: 40 });
        cy.getByTestingAttr("unsub-nl-send").click();

        cy.wait("@unsubscribe").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
        });
    });
});
