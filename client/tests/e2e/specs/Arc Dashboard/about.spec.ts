import {getByAutoId, login, logout, navigateToAbout, Selectors, startup} from "../../support/support";

describe("Checks About Cards on About.vue", () => {
    before(() => {
        startup();
        cy.visit(`${Cypress.env("DOMAIN_LOCAL")}/login`);
        login();
        navigateToAbout();
    });

    after(() => {
        logout();
    });

    it("verify creator card", () => {
        getByAutoId(Selectors.CARD_CREATOR).should('be.visible');
        getByAutoId(Selectors.CARD_CREATOR).find(Selectors.HEADER_TEXT).should('contain', 'Creator');
        getByAutoId(Selectors.CARD_CREATOR).find(Selectors.TEXT_CARD).eq(0).should('contain', 'Developer: Michael Pereira');
        getByAutoId(Selectors.CARD_CREATOR).find(Selectors.TEXT_CARD).eq(1).should('contain', 'Education: Ryerson University');
        getByAutoId(Selectors.CARD_CREATOR).find(Selectors.TEXT_CARD).eq(2).should('contain', 'Github:');
        getByAutoId(Selectors.CARD_CREATOR).find(Selectors.TEXT_HREF_CARD).eq(0).should('contain', 'Visit')
            .should('have.attr', 'href').then((href) => {
            expect(href).to.be.eq('https://github.com/Mwpereira');
        });
        getByAutoId(Selectors.CARD_CREATOR).find(Selectors.TEXT_CARD).eq(3).should('contain', 'LinkedIn:');
        getByAutoId(Selectors.CARD_CREATOR).find(Selectors.TEXT_HREF_CARD).eq(1).should('contain', 'Visit')
            .should('have.attr', 'href').then((href) => {
            expect(href).to.be.eq('https://www.linkedin.com/in/michael-pereira-07/');
        });
    });

    it("verify Arc card", () => {
        getByAutoId(Selectors.CARD_ARC).contains('Arc');
        getByAutoId(Selectors.CARD_ARC).find(Selectors.TEXT_CARD).eq(0).should('contain', 'Arc Version:');
        getByAutoId(Selectors.CARD_ARC).find(Selectors.TEXT_CARD).eq(1).should('contain', 'Front end Frameworks: Vue.js + Bulma');
        getByAutoId(Selectors.CARD_ARC).find(Selectors.TEXT_CARD).eq(2).should('contain', 'Back end Server: AWS Serverless');
        getByAutoId(Selectors.CARD_ARC).find(Selectors.TEXT_CARD).eq(3).should('contain', 'Found a bug?');
        getByAutoId(Selectors.CARD_ARC).find(Selectors.TEXT_HREF_CARD).eq(0).should('contain', 'Post here')
            .should('have.attr', 'href').then((href) => {
            expect(href).to.be.eq('https://github.com/Mwpereira/Arc-2.0/issues/');
        });
    });

});
