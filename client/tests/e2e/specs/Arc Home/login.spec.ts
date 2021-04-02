import {
    clickOff,
    getByAutoId,
    getSectionHeader,
    login,
    responseTimeout,
    Selectors,
    startup
} from "../../support/support";
import {MessageConstants} from "../../../utilities/message-constants";

describe("Login.vue", () => {
    beforeEach(() => {
        startup();
        cy.visit(`${Cypress.env("DOMAIN_LOCAL")}/login`);
    });

    afterEach(() => {
        cy.clearCookies();
    });

    it("check card contents", () => {
        getByAutoId(Selectors.LOGO_IMAGE).should("be.visible");

        getByAutoId(Selectors.HEADER_CARD).should('contain', "Welcome Back!").should("have.css", "font-weight", "700");

        getByAutoId(Selectors.LOGIN_BUTTON)
            .should('contain', "Login")
            .should("be.visible");

        getByAutoId(Selectors.INPUT_USERNAME).should("be.visible").should('have.attr', 'placeholder', 'Email / Username');
        getByAutoId(Selectors.INPUT_PASSWORD).should("be.visible").should('have.attr', 'placeholder', 'Password');
        getByAutoId(Selectors.CHECKBOX_REMEMBER_ME).find('.control-label').should("be.visible").should('contain', 'Remember Me');

        getByAutoId(Selectors.INPUT_USERNAME).should('have.attr', 'placeholder', 'Email / Username');
        getByAutoId(Selectors.INPUT_PASSWORD).should('have.attr', 'placeholder', 'Password');

        getByAutoId(Selectors.CHECKBOX_REMEMBER_ME).find("input").check({force: true});
        getByAutoId(Selectors.CHECKBOX_REMEMBER_ME).find("input").should("be.checked");
        getByAutoId(Selectors.CHECKBOX_REMEMBER_ME).find("input").uncheck({force: true});
        getByAutoId(Selectors.CHECKBOX_REMEMBER_ME).find("input").should("not.be.checked");
    });

    it("check field styling", () => {
        getByAutoId(Selectors.FIELD_USERNAME).should(
            "have.attr",
            "icon",
            "account"
        );
        getByAutoId(Selectors.FIELD_PASSWORD).should("have.attr", "icon", "lock");

        getByAutoId(Selectors.INPUT_USERNAME)
            .click()
            .then(() => {
                clickOff();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', "Required Field");
            });
        getByAutoId(Selectors.INPUT_PASSWORD)
            .click()
            .then(() => {
                clickOff();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', "Required Field");
            });
    });

    it("login", () => {
        getByAutoId(Selectors.INPUT_USERNAME).type(Cypress.env("TEST_USERNAME"));
        getByAutoId(Selectors.INPUT_PASSWORD).type(Cypress.env("TEST_PASSWORD"));

        cy.server();
        cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/auth/login`).as("login");
        cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/auth/refresh`).as(
            "refresh"
        );

        getByAutoId(Selectors.LOGIN_BUTTON).click().wait('@login', responseTimeout).then((xhr) => {
            expect(xhr.status).to.eq(302);
            cy.get(Selectors.TOAST_SUCCESS).should('contain', MessageConstants.USER_AUTHORIZED);
            cy.url().should("include", "/dashboard");
            getSectionHeader().should('contain', "Dashboard");
        });
    });

    it("invalid login", () => {
        getByAutoId(Selectors.INPUT_USERNAME).type("arc");
        getByAutoId(Selectors.INPUT_PASSWORD).type("invalidPassword");

        cy.server();
        cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/auth/login`).as("login");

        getByAutoId(Selectors.LOGIN_BUTTON).click().wait("@login").then((xhr) => {
            expect(xhr.status).to.eq(404);
        });
        cy.get(Selectors.TOAST_ERROR).should('contain',
            MessageConstants.INVALID_CREDENTIALS
        );
        cy.url().should("not.include", "/dashboard");
    });
});
