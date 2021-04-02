import {getByAutoId, login, logout, navigateToDashboard, Selectors, startup} from '../../support/support';

describe('Checks information shown on Information.vue', () => {
    before(() => {
        startup();
        cy.visit(`${Cypress.env('DOMAIN_LOCAL')}/login`);
        login();
    });

    after(() => {
        logout();
    });

    it('verify user', () => {
        getByAutoId(Selectors.CARD_USER).should('be.visible');
        getByAutoId(Selectors.CARD_USER).find(Selectors.HEADER_TEXT).should('contain', 'User');
        getByAutoId(Selectors.CARD_USER).find(Selectors.TEXT_BOLD_CARD).should('contain', 'Username:');
        getByAutoId(Selectors.CARD_USER).find(Selectors.TEXT_BOLD_CARD).should('contain', 'Email:');
    });

    it('verify security', () => {
        getByAutoId(Selectors.CARD_SECURITY).should('be.visible');
        getByAutoId(Selectors.CARD_SECURITY).find(Selectors.HEADER_TEXT).should('contain', 'Security');
        getByAutoId(Selectors.CARD_SECURITY).find(Selectors.TEXT_BOLD_CARD).should('contain', 'Password Strength:');
        getByAutoId(Selectors.CARD_SECURITY).find(Selectors.TEXT_BOLD_CARD).should('contain', 'Hashing Algorithm:');
    });

    it('verify last login', () => {
        getByAutoId(Selectors.CARD_LAST_LOGIN).should('be.visible');
        getByAutoId(Selectors.CARD_LAST_LOGIN).find(Selectors.HEADER_TEXT).should('contain', 'Last Login');
        getByAutoId(Selectors.CARD_LAST_LOGIN).find(Selectors.TEXT_BOLD_CARD).should('contain', 'Date:');
    });

    it('verify accounts', () => {
        getByAutoId(Selectors.CARD_ACCOUNTS).should('be.visible');
        getByAutoId(Selectors.CARD_ACCOUNTS).find(Selectors.HEADER_TEXT).should('contain', 'Accounts');
        getByAutoId(Selectors.CARD_ACCOUNTS).find(Selectors.TEXT_BOLD_CARD).should('contain', 'Number of Accounts:');
    });

    it('verify accounts summary', () => {
        getByAutoId(Selectors.CARD_ACCOUNTS_SUMMARY).should('be.visible');
        getByAutoId(Selectors.CARD_ACCOUNTS_SUMMARY).find(Selectors.HEADER_TEXT).should('contain', 'Accounts Summary');
        navigateToDashboard();
    });

    it('verify home page', () => {
        logout();
        login();
        getByAutoId(Selectors.CARD_HOME_PAGE).should('be.visible');
        getByAutoId(Selectors.CARD_HOME_PAGE).find(Selectors.HEADER_TEXT).should('contain', 'Home Page');
        getByAutoId(Selectors.CARD_HOME_PAGE).find('.card-content > .content > p > b').should('contain', 'Current Home Page:');
        getByAutoId(Selectors.RADIO_HOME_PAGE).eq(0).click().find('input').should('be.checked').then(() => {
            expect(localStorage.getItem(`${Cypress.env('TEST_USERNAME')}::homePage`)).to.eq('Dashboard');
        });
        getByAutoId(Selectors.RADIO_HOME_PAGE).eq(1).click().find('input').should('be.checked').then(() => {
            expect(localStorage.getItem(`${Cypress.env('TEST_USERNAME')}::homePage`)).to.eq('Accounts');
        });
    });
});
