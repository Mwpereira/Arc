import {
    addAccount, clickOff,
    deleteAccount,
    getByAutoId,
    login,
    logout,
    navigateToAccounts,
    navigateToAddAccount, responseTimeout,
    selectAccount,
    Selectors,
    startup,
} from '../../support/support';
import * as faker from 'faker';

describe('Checks Account Form on AccountForm.vue', () => {
    beforeEach(() => {
        startup();
        cy.visit(`${Cypress.env('DOMAIN_LOCAL')}/login`);
        login();
        navigateToAddAccount();
    });

    afterEach(() => {
        logout();
    });

    it('check account styling', () => {
        addAccount().then((id) => {
            navigateToAccounts();
            getByAutoId(id).click();

            getByAutoId(Selectors.FIELD_ACCOUNT_NAME).eq(0).should('contain', 'Account Name');
            getByAutoId(Selectors.FIELD_EMAIL).eq(0).should('contain', 'Email');
            getByAutoId(Selectors.FIELD_USERNAME).eq(0).should('contain', 'Username');
            getByAutoId(Selectors.FIELD_PASSWORD).eq(0).should('contain', 'Password');
            getByAutoId(Selectors.FIELD_CATEGORY).eq(0).should('contain', 'Category');
            getByAutoId(Selectors.FIELD_NOTES).eq(0).should('contain', 'Notes');

            getByAutoId(Selectors.FIELD_ACCOUNT_NAME).eq(1).should('be.visible');
            getByAutoId(Selectors.FIELD_EMAIL).eq(1).should('be.visible');
            getByAutoId(Selectors.FIELD_USERNAME).eq(1).should('be.visible');
            getByAutoId(Selectors.FIELD_PASSWORD).eq(1).should('be.visible');
            getByAutoId(Selectors.FIELD_CATEGORY).eq(1).should('be.visible');
            getByAutoId(Selectors.FIELD_NOTES).eq(1).should('be.visible');

            deleteAccount();
        });
    });

    it('verify invalid UI - add/edit form', () => {
        getByAutoId(Selectors.FIELD_ACCOUNT_NAME)
            .click()
            .then(() => {
                clickOff();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', 'Required Field');
            });
        // TODO
        // getByAutoId(Selectors.SELECT_CATEGORY)
        //     .click()
        //     .then(() => {
        //         clickOff();
        //         cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', "Please select an item in the list.");
        //     });
    });

    it('add user account', () => {
        getByAutoId(Selectors.HEADER_PANEL).should('contain', 'Add Account');
        getByAutoId(Selectors.CONFIRM_BUTTON).should('contain', 'Add Account');
        getByAutoId(Selectors.INPUT_ACCOUNT_NAME).type(faker.company.companyName());
        getByAutoId(Selectors.INPUT_EMAIL).type(faker.internet.email());
        getByAutoId(Selectors.INPUT_USERNAME).type(faker.random.alphaNumeric(9));
        getByAutoId(Selectors.INPUT_PASSWORD).type(faker.internet.password());
        getByAutoId(Selectors.SELECT_CATEGORY).select('Tech');
        getByAutoId(Selectors.INPUT_NOTES).type(faker.random.alphaNumeric(25));

        cy.server();
        cy.route('POST', `${Cypress.env('API_LOCAL')}/dev/user/accounts/add`).as(
            'addAccount',
        );

        getByAutoId(Selectors.CONFIRM_BUTTON).click().wait('@addAccount', responseTimeout).then((xhr) => {
            cy.wait(2500);
            // @ts-ignore
            selectAccount(xhr.responseBody.id);
            deleteAccount();
        });
    });

    it('edit user account', () => {
        addAccount().then((id) => {
            navigateToAccounts();
            getByAutoId(id).click();
            getByAutoId(Selectors.CONFIRM_BUTTON).click();

            getByAutoId(Selectors.HEADER_PANEL).should('contain', 'Account');
            getByAutoId(Selectors.CONFIRM_BUTTON).should('contain', 'Save');
            getByAutoId(Selectors.CANCEL_BUTTON).should('contain', 'Cancel');
            getByAutoId(Selectors.INPUT_ACCOUNT_NAME).type(faker.company.companyName());
            getByAutoId(Selectors.INPUT_EMAIL).type(faker.internet.email());
            getByAutoId(Selectors.INPUT_USERNAME).type(faker.random.alphaNumeric(9));
            getByAutoId(Selectors.INPUT_PASSWORD).type(faker.internet.password());
            getByAutoId(Selectors.SELECT_CATEGORY).select('Tech');
            getByAutoId(Selectors.INPUT_NOTES).type(faker.random.alphaNumeric(25));

            cy.server();
            cy.route('POST', `${Cypress.env('API_LOCAL')}/dev/user/accounts/update`).as(
                'editAccount',
            );

            getByAutoId(Selectors.CONFIRM_BUTTON).click().wait('@editAccount', responseTimeout).then((xhr) => {
                cy.wait(2500);
                // @ts-ignore
                selectAccount(id);
                deleteAccount();
            });
        });
    });
});
