import {getByAutoId, Selectors} from '../../support/support';

describe('Home.vue', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('check card contents', () => {
        getByAutoId(Selectors.LOGO_IMAGE).should('be.visible');
        getByAutoId(Selectors.HEADER_CARD_ARC).should('contain', 'Secure, Advanced, & Customizable').should(
            'have.css',
            'font-weight',
            '500',
        );
        getByAutoId(Selectors.LOGIN_BUTTON)
            .should('be.visible');
        getByAutoId(Selectors.REGISTER_BUTTON)
            .should('be.visible');
    });

    it('navigate to login page', () => {
        getByAutoId(Selectors.LOGIN_BUTTON).click();
        cy.url().should('eq', `${Cypress.env('DOMAIN_LOCAL')}/login`);
        getByAutoId(Selectors.HEADER_CARD).should('contain', 'Welcome Back!');
    });

    it('navigate to register page', () => {
        getByAutoId(Selectors.REGISTER_BUTTON).click();
        cy.url().should('eq', `${Cypress.env('DOMAIN_LOCAL')}/register`);
        getByAutoId(Selectors.HEADER_CARD).should('contain', 'Create Account');
    });

    it('navigate to GitHub', () => {
        getByAutoId(Selectors.HREF_GITHUB)
            .should('have.attr', 'href')
            .and('include', 'https://github.com/Mwpereira');
    });

    it('navigate to LinkedIn', () => {
        getByAutoId(Selectors.HREF_LINKEDIN)
            .should('have.attr', 'href')
            .and('include', 'https://www.linkedin.com/in/michael-pereira-07/');
    });
});
