import {
    addAccount,
    deleteAccount,
    getAccountDataLabels,
    getByAutoId,
    getInputLabels,
    login,
    logout,
    navigateToAccounts,
    selectAccount,
    Selectors,
    startup
} from "../../support/support";

describe("Checks Account Form on AccountForm.vue", () => {
    beforeEach(() => {
        startup();
        cy.visit(`${Cypress.env("DOMAIN_LOCAL")}/login`);
        login();
    });

    afterEach(() => {
        logout();
    });

    it("select account", () => {
        addAccount().then((id) => {
            navigateToAccounts();

            getByAutoId(id).find('.level-item > span').should('be.visible');
            getByAutoId(id).find('.level-item > span').should('have.class', 'icon');
            getByAutoId(id).find('.level-item > h2').should('be.visible');
            expect(getByAutoId(id).find('.level-item > h2')).to.not.be.empty;
            getByAutoId(id).click();

            deleteAccount();
        });
    });

    it("delete account", () => {
        addAccount().then((id) => {
            // @ts-ignore
            selectAccount(id);

            cy.server();
            cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/user/accounts/delete`).as("delete");

            cy.get('.card-content > .level-item > button').eq(2).click().wait('@delete', {responseTimeout: 15000}).then((xhr) => {
                expect(xhr.status).to.eq(200);
                cy.get(Selectors.TOAST_SUCCESS).should('contain', "Account Deleted");
            });
        });
    });

    it("verify account", () => {
        addAccount().then((id) => {
            navigateToAccounts();

            getByAutoId(id).find('.level-item > span').should('be.visible');
            getByAutoId(id).find('.level-item > span').should('have.class', 'icon');
            getByAutoId(id).find('.level-item > h2').should('be.visible');
            expect(getByAutoId(id).find('.level-item > h2')).to.not.be.empty;
            getByAutoId(id).click();

            getInputLabels(0).should('contain', "Account Name");
            getInputLabels(1).should('contain', "Email");
            getInputLabels(2).should('contain', "Username");
            getInputLabels(3).should('contain', "Password");
            getInputLabels(4).should('contain', "Category");
            getInputLabels(5).should('contain', "Notes");

            expect(getAccountDataLabels(0)).not.to.be.empty;
            expect(getAccountDataLabels(0)).not.to.be.empty;
            expect(getAccountDataLabels(0)).not.to.be.empty;
            expect(getAccountDataLabels(0)).not.to.be.empty;
            expect(getAccountDataLabels(0)).not.to.be.empty;
            expect(getAccountDataLabels(0)).not.to.be.empty;

            deleteAccount();
        });
    });
});
