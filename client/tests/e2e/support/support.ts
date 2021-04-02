import * as faker from "faker";

export const responseTimeout = {responseTimeout: 15000};

export function clickOff(){
    return cy.get('body').click(0, 0);
}

export function startup() {
    cy.server({
        onAnyRequest: function (route, proxy) {
            proxy.xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            proxy.xhr.setRequestHeader(
                "Access-Control-Allow-Origin",
                Cypress.env("DOMAIN") + ":" + Cypress.env("PORT")
            );
        },
    });
}

export function login(user?: any) {
    getByAutoId(Selectors.INPUT_USERNAME).type(user === undefined ? Cypress.env("TEST_USERNAME") : user.username);
    getByAutoId(Selectors.INPUT_PASSWORD).type(user === undefined ? Cypress.env("TEST_PASSWORD") : user.password);

    cy.server();
    cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/auth/login`).as("login");
    cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/auth/refresh`).as(
        "refresh"
    );

    getByAutoId(Selectors.LOGIN_BUTTON).click().wait('@login', responseTimeout).then((xhr) => {
        expect(xhr.status).to.eq(302);
        cy.get(Selectors.TOAST_SUCCESS).should('contain', "Signed In");
        cy.wait(2500)
        getSectionHeader().should('contain', "Dashboard");
    });
}

export function register() {
    cy.visit(`${Cypress.env("DOMAIN_LOCAL")}/register`);

    const email = faker.internet.email();
    const username = "arc" + faker.random.alphaNumeric(9);
    const password = faker.internet.password();

    getByAutoId(Selectors.INPUT_EMAIL).type(email);
    getByAutoId(Selectors.INPUT_USERNAME).type(username);
    getByAutoId(Selectors.INPUT_PASSWORD).type(password);
    getByAutoId(Selectors.INPUT_CONFIRM_PASSWORD).type(password);

    cy.server();
    cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/auth/register`).as(
        "register"
    );

    getByAutoId(Selectors.REGISTER_BUTTON).click().wait("@register", responseTimeout).then((xhr) => {
        expect(xhr.status).to.eq(201);
        cy.get(Selectors.TOAST_SUCCESS).should('contain', "User Created");
        cy.wait(2500)
    });

    return {email: email, username: username, password: password}
}

export function logout() {
    getByAutoId(Selectors.NAVIGATION_LOGOUT).click();
    cy.wait(2500);
    cy.get(Selectors.TOAST_SUCCESS).should('contain', "Signed Out");
}

export function getSectionHeader() {
    return getByAutoId(Selectors.HEADER_PANEL);
}

export function navigateToDashboard() {
    getByAutoId(Selectors.NAVIGATION_DASHBOARD).click();
    getSectionHeader().should('contain', 'Dashboard');
}

export function navigateToAccounts() {
    getByAutoId(Selectors.NAVIGATION_ACCOUNTS).click();
    getSectionHeader().should('contain', 'Accounts');
}

export function navigateToAddAccount() {
    getByAutoId(Selectors.NAVIGATION_ADD_ACCOUNT).click();
    getSectionHeader().should('contain', 'Add Account');
}

export function navigateToUserSettings() {
    getByAutoId(Selectors.NAVIGATION_USER_SETTINGS).click();
    getSectionHeader().should('contain', 'User Settings');
}

export function navigateToAbout() {
    getByAutoId(Selectors.NAVIGATION_ABOUT).click();
    getSectionHeader().should('contain', 'About');
}

export function getByAutoId(id: any) {
    return cy.get(`[auto-id=${id}]`);
}

export function getInputLabels(index: number) {
    return cy.get(".card-content > .field > label").eq(index);
}

export function getAccountDataLabels(index: number) {
    return cy.get(".card-content > .field > div > label").eq(index);
}

export function addAccount() {
    navigateToAddAccount();

    getByAutoId(Selectors.INPUT_ACCOUNT_NAME).type(faker.company.companyName());
    getByAutoId(Selectors.INPUT_EMAIL).type(faker.internet.email());
    getByAutoId(Selectors.INPUT_USERNAME).type(faker.random.alphaNumeric(9));
    getByAutoId(Selectors.INPUT_PASSWORD).type(faker.internet.password());
    getByAutoId(Selectors.SELECT_CATEGORY).select("Tech");
    getByAutoId(Selectors.INPUT_NOTES).type(faker.random.alphaNumeric(25));

    cy.server();
    cy.route("POST", `${Cypress.env("API_LOCAL")}/dev/user/accounts/add`).as(
        "addAccount"
    );

    return cy.get("form div button").eq(0).click().wait("@addAccount", responseTimeout).then((xhr) => {
        cy.wait(2500);
        // @ts-ignore
        cy.wrap(xhr.responseBody['id']);
    });
}

export function selectAccount(id: string) {
    navigateToAccounts();
    getByAutoId(id).click();
}

export function deleteAccount() {
    cy.get('.card-content > .level-item > button').eq(2).click();
}

export function deleteUser() {
    getByAutoId(Selectors.DELETE_BUTTON).click();
}

export enum Selectors {
    // getByAutoId() values
    CANCEL_BUTTON = "button-cancel",
    CARD_USER = "card-user",
    CARD_SECURITY = "card-security",
    CARD_LAST_LOGIN = "card-last-login",
    CARD_ACCOUNTS = "card-accounts",
    CARD_ACCOUNTS_SUMMARY = "card-accounts-summary",
    CARD_HOME_PAGE = "card-home-page",
    CARD_CREDENTIALS = "card-credentials",
    CARD_PASSWORD = "card-password",
    CARD_CREATOR = "card-creator",
    CARD_ARC = "card-arc",
    CHECKBOX_REMEMBER_ME = "checkbox-rememberMe",
    CONFIRM_BUTTON = "button-confirm",
    DELETE_BUTTON = "button-delete",
    HEADER_CARD = "header-card",
    HEADER_CARD_ARC = "header-card-arc",
    HEADER_PANEL = "header-panel",
    HREF_GITHUB = "href-github",
    HREF_LINKEDIN = "href-linkedin",
    INPUT_ACCOUNT_NAME = "input-account-name",
    INPUT_EMAIL = "input-email",
    INPUT_USERNAME = "input-username",
    INPUT_PASSWORD = "input-password",
    INPUT_CONFIRM_PASSWORD = "input-confirm-password",
    INPUT_NEW_PASSWORD = "input-new-password",
    INPUT_ERROR_LABEL="p.help.is-danger",
    INPUT_NOTES = "input-notes",
    FIELD_EMAIL = "field-email",
    FIELD_USERNAME = "field-username",
    FIELD_PASSWORD = "field-password",
    FIELD_NEW_PASSWORD = "field-new-password",
    FIELD_CONFIRM_PASSWORD = "field-confirm-password",
    FIELD_ACCOUNT_NAME = "field-account-name",
    FIELD_CATEGORY = "field-category",
    FIELD_NOTES = "field-notes",
    LOGIN_BUTTON = "button-login",
    LOGO_IMAGE = "img-logo",
    NAVIGATION_DASHBOARD = "navigation-dashboard",
    NAVIGATION_ACCOUNTS = "navigation-accounts",
    NAVIGATION_ADD_ACCOUNT = "navigation-add-account",
    NAVIGATION_USER_SETTINGS = "navigation-user-settings",
    NAVIGATION_ABOUT = "navigation-about",
    NAVIGATION_LOGOUT = "navigation-logout",
    RADIO_HOME_PAGE = "radio-home-page",
    REGISTER_BUTTON = "button-register",
    SELECT_CATEGORY = "select-category",
    TOAST_SUCCESS = "div.toast.is-dark.is-bottom-right",
    TOAST_ERROR = "div.toast.is-danger.is-bottom-right",

    HEADER_TEXT = ".card-content > .content > h2",
    TEXT_CARD = ".card-content > .content > p",
    TEXT_BOLD_CARD = ".card-content > .content > p > b",
    TEXT_HREF_CARD = ".card-content > .content > p > a",
}
