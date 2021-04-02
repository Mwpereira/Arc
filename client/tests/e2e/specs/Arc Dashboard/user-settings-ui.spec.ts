import {clickOff, getByAutoId, login, logout, navigateToUserSettings, Selectors, startup} from "../../support/support";
import * as faker from "faker";

describe("Checks User Settings Form on User.vue", () => {
    before(() => {
        startup();
        cy.visit(`${Cypress.env("DOMAIN_LOCAL")}/login`);
        login();
        navigateToUserSettings();
    });

    after(() => {
        logout();
    });

    it("check field styling", () => {
        getByAutoId(Selectors.FIELD_EMAIL).should("have.attr", "icon", "email");
        getByAutoId(Selectors.FIELD_USERNAME).should("have.attr", "icon", "account");
        getByAutoId(Selectors.FIELD_PASSWORD).should("have.attr", "icon", "lock");
        getByAutoId(Selectors.FIELD_CONFIRM_PASSWORD).should("have.attr", "icon", "lock");
        getByAutoId(Selectors.FIELD_NEW_PASSWORD).should("have.attr", "icon", "lock");
    });

    it("verify credentials card", () => {
        getByAutoId(Selectors.CARD_CREDENTIALS).should('be.visible');
        getByAutoId(Selectors.HEADER_CARD).should('contain', 'Credentials');
        getByAutoId(Selectors.INPUT_EMAIL)
            .should('have.attr', 'placeholder');
        getByAutoId(Selectors.INPUT_USERNAME)
            .should('have.attr', 'placeholder');
        getByAutoId(Selectors.CONFIRM_BUTTON).eq(0).should('contain', 'Save Credentials');
        getByAutoId(Selectors.DELETE_BUTTON).should('contain', 'Delete User Permanently');
    });

    it("verify invalid UI - credentials card", () => {
        getByAutoId(Selectors.INPUT_EMAIL)
            .type(faker.name.firstName())
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', "This field must be a valid email");
            });
        getByAutoId(Selectors.INPUT_USERNAME)
            .type("arc-!@#$%^&*()")
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .should('contain', "Username can only contain alphanumeric characters");
            });
        getByAutoId(Selectors.INPUT_USERNAME)
            .type('{selectall}{backspace}')
            .type(faker.random.alphaNumeric(2))
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .should('contain', "Username must be 3 or more characters long");
            });
        getByAutoId(Selectors.INPUT_USERNAME)
            .type('{selectall}{backspace}')
            .type(faker.random.alphaNumeric(19))
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .should('contain', "Username must be 18 or less characters long");
            });
    });

    it("verify password card", () => {
        getByAutoId(Selectors.CARD_PASSWORD).should('be.visible');
        getByAutoId(Selectors.HEADER_CARD).should('contain', 'Password');
        getByAutoId(Selectors.INPUT_PASSWORD)
            .should('have.attr', 'placeholder', 'Current Password');
        getByAutoId(Selectors.INPUT_NEW_PASSWORD)
            .should('have.attr', 'placeholder', 'New Password');
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD)
            .should('have.attr', 'placeholder', 'Confirm New Password');
        getByAutoId(Selectors.CONFIRM_BUTTON).eq(1).should('contain', 'Update Password');
    });

    it("verify invalid UI - password card", () => {
        getByAutoId(Selectors.INPUT_PASSWORD)
            .click()
            .then(() => {
                getByAutoId(Selectors.INPUT_NEW_PASSWORD).click();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', "Required Field");
            });
        getByAutoId(Selectors.INPUT_NEW_PASSWORD)
            .type(faker.internet.password().substring(0, 6))
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .should('contain', "Password must be 7 or more characters long");
            });
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD)
            .type(faker.internet.password())
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', "Passwords do not match");
            });
    });
});
