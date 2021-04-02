import * as faker from 'faker';
import {clickOff, getByAutoId, responseTimeout, Selectors, startup} from '../../support/support';
import {MessageConstants} from '../../../utilities/message-constants';

describe('Register.vue', () => {
    beforeEach(() => {
        startup();
        cy.visit(`${Cypress.env('DOMAIN_LOCAL')}/register`);
    });

    it('check card contents', () => {
        getByAutoId(Selectors.LOGO_IMAGE).should('be.visible');
        getByAutoId(Selectors.HEADER_CARD).should('contain', 'Create Account').should(
            'have.css',
            'font-weight',
            '700',
        );

        getByAutoId(Selectors.REGISTER_BUTTON)
            .should('contain', 'Register')
            .should('be.visible')
            .should('have.length', 1);

        getByAutoId(Selectors.INPUT_EMAIL).should('be.visible').should('have.attr', 'placeholder', 'Email');
        getByAutoId(Selectors.INPUT_USERNAME).should('be.visible').should('have.attr', 'placeholder', 'Username');
        getByAutoId(Selectors.INPUT_PASSWORD).should('be.visible').should('have.attr', 'placeholder', 'Password');
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD).should('be.visible').should('have.attr', 'placeholder', 'Confirm Password');
    });

    it('check field styling', () => {
        getByAutoId(Selectors.FIELD_EMAIL).should('have.attr', 'icon', 'email');
        getByAutoId(Selectors.FIELD_USERNAME).should('have.attr', 'icon', 'account');
        getByAutoId(Selectors.FIELD_PASSWORD).should('have.attr', 'icon', 'lock');
        getByAutoId(Selectors.FIELD_CONFIRM_PASSWORD).should('have.attr', 'icon', 'lock');

        getByAutoId(Selectors.INPUT_EMAIL).should('have.attr', 'placeholder', 'Email');
        getByAutoId(Selectors.INPUT_USERNAME).should('have.attr', 'placeholder', 'Username');
        getByAutoId(Selectors.INPUT_PASSWORD).should('have.attr', 'placeholder', 'Password');
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD).should('have.attr', 'placeholder', 'Confirm Password');

        getByAutoId(Selectors.INPUT_EMAIL)
            .click()
            .then(() => {
                clickOff();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', 'Required Field');
            });
        getByAutoId(Selectors.INPUT_USERNAME)
            .click()
            .then(() => {
                clickOff();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', 'Required Field');
            });
        getByAutoId(Selectors.INPUT_PASSWORD)
            .click()
            .then(() => {
                clickOff();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', 'Required Field');
            });
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD)
            .click()
            .then(() => {
                clickOff();
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', 'Required Field');
            });
    });

    it('create account', () => {
        const password = faker.internet.password();

        getByAutoId(Selectors.INPUT_EMAIL).type(faker.internet.email());
        getByAutoId(Selectors.INPUT_USERNAME).type('arc' + faker.random.alphaNumeric(9));
        getByAutoId(Selectors.INPUT_PASSWORD).type(password);
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD).type(password);

        cy.server();
        cy.route('POST', `${Cypress.env('API_LOCAL')}/dev/auth/register`).as(
            'register',
        );

        getByAutoId(Selectors.REGISTER_BUTTON).click().wait('@register', responseTimeout).then((xhr) => {
            expect(xhr.status).to.eq(201);
        });
        cy.get(Selectors.TOAST_SUCCESS).should('contain', MessageConstants.USER_CREATED);
        cy.url().should('include', '/login');
    });

    it('create invalid account', () => {
        getByAutoId(Selectors.INPUT_EMAIL)
            .type(faker.name.firstName())
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL).should('contain', 'This field must be a valid email');
            });
        getByAutoId(Selectors.INPUT_USERNAME)
            .type('arc-!@#$%^&*()')
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .eq(1)
                    .should('contain', 'Username can only contain alphanumeric characters');
            });
        getByAutoId(Selectors.INPUT_USERNAME)
            .type('{selectall}{backspace}')
            .type(faker.random.alphaNumeric(2))
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .eq(1)
                    .should('contain', 'Username must be 3 or more characters long');
            });
        getByAutoId(Selectors.INPUT_USERNAME)
            .type('{selectall}{backspace}')
            .type(faker.random.alphaNumeric(19))
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .eq(1)
                    .should('contain', 'Username must be 18 or less characters long');
            });
        getByAutoId(Selectors.INPUT_PASSWORD)
            .type(faker.internet.password().substring(0, 6))
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL)
                    .eq(2)
                    .should('contain', 'Password must be 7 or more characters long');
            });
        getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD)
            .type(faker.internet.password())
            .then(() => {
                cy.get(Selectors.INPUT_ERROR_LABEL).eq(3).should('contain', 'Passwords do not match');
            });
    });
});
