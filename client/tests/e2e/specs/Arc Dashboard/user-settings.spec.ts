import {
    deleteUser,
    getByAutoId,
    login,
    logout,
    navigateToUserSettings,
    register,
    Selectors,
    startup,
} from '../../support/support';
import * as faker from 'faker';
import {MessageConstants} from '../../../utilities/message-constants';

let user: { email: string; username: string; password: string; };

describe('Checks User Settings Form on User.vue', () => {
    beforeEach(() => {
        startup();
        cy.visit(`${Cypress.env('DOMAIN_LOCAL')}/login`);
        user = register();
        login(user);
        navigateToUserSettings();
    });

    function updateCredentials() {
        cy.server();
        cy.route('POST', `${Cypress.env('API_LOCAL')}/dev/auth/credentials/update`).as('updateCredentials');

        getByAutoId(Selectors.CONFIRM_BUTTON).eq(0).click().wait('@updateCredentials', {responseTimeout: 15000}).then((xhr) => {
            expect(xhr.status).to.eq(200);
            cy.get(Selectors.TOAST_SUCCESS).should('contain', MessageConstants.CREDENTIALS_UPDATE_SUCCESS);
            cy.wait(2500);
        });
    }

    it('update email', () => {
        user.email = faker.internet.email();

        getByAutoId(Selectors.INPUT_EMAIL).type(user.email);

        updateCredentials();

        logout();

        login(user);

        navigateToUserSettings();
        deleteUser();
    });

    it('update username', () => {
        user.username = 'arc' + faker.random.alphaNumeric(9);

        getByAutoId(Selectors.INPUT_USERNAME).type(user.username);

        updateCredentials();

        logout();

        login(user);

        navigateToUserSettings();
        deleteUser();
    });

    it('update password', () => {
        getByAutoId(Selectors.INPUT_PASSWORD).type(user.password);

        user.password = faker.internet.password();

        getByAutoId(Selectors.INPUT_NEW_PASSWORD).type(user.password);
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD).type(user.password);

        cy.server();
        cy.route('POST', `${Cypress.env('API_LOCAL')}/dev/auth/password/update`).as('updatePassword');

        getByAutoId(Selectors.CONFIRM_BUTTON).eq(1).click().wait('@updatePassword', {responseTimeout: 15000}).then((xhr) => {
            expect(xhr.status).to.eq(200);
            cy.get(Selectors.TOAST_SUCCESS).should('contain', MessageConstants.PASSWORD_UPDATE_SUCCESS);
            cy.wait(2500);
        });

        logout();

        login(user);

        navigateToUserSettings();
        deleteUser();
    });
});

