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
        // check request and notification

        cy.get(".notification-wrapper").children().eq( 1 ).should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().eq( 1 ).should("contain", "Die Newsletter-Anmeldung war erfolgreich.");

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

        // check request and notification
        cy.get(".notification-wrapper").children().eq( 1 ).should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().eq( 1 ).should("contain", "Die Newsletter-Anmeldung war nicht erfolgreich.");

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

        cy.get(".notification-wrapper").children().eq( 1 ).should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().eq( 1 ).should("contain", "Die Newsletter-Anmeldung war nicht erfolgreich.");
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

        cy.get(".notification-wrapper").children().eq( 1 ).should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().eq( 1 ).should("contain", "Die Newsletter-Anmeldung war nicht erfolgreich.");
    });

    it("should test spam newsletter rest call", () =>
    {
        cy.request("POST", "/rest/io/customer/newsletter", { email: "max.mustermann@plentymarkets.com", firstName: "Visit", lastName: "https://spamsite.de", emailFolder: 0 }).then(
            (res) =>
            {
                expect(res.response.statusCode).to.eql(400);
            }
        );
    });
});
