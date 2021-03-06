import Vue from 'vue';
import Vuex from 'vuex';

import {AxiosResponse} from 'axios';
import createPersistedState from 'vuex-persistedstate';
import router from '../router/router';
import AuthService from '../services/auth-service';
import BuefyService from '../services/buefy-service';
import UserService from '../services/user-service';
import {loadAccount} from '../utilities/common-utilities';
import {successAuthProcessor, successProcessor} from '../utilities/response-utilities';

Vue.use(Vuex);

let response: AxiosResponse;

export default new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    state: {
        accountData: null,
        accountName: null,
        accounts: null,
        email: null,
        hasAccessToken: false,
        homePage: null,
        lastLogin: null,
        panel: null,
        passwordStrength: null,
        username: null,
    },
    mutations: {
        auth_success(state) {
            state.hasAccessToken = true;
        },
        auth_logout(state) {
            state.accountData = null;
            state.accountName = null;
            state.accounts = null;
            state.email = null;
            state.hasAccessToken = false;
            state.homePage = null;
            state.lastLogin = null;
            state.panel = null;
            state.passwordStrength = null;
            state.username = null;
        },
        addAccount(state, data) {
            data.account.id = data.id;
            if (state.accounts) {
                state.accounts[data.id] = data.account;
            } else {
                state.accounts = {[data.id]: data.account};
            }
        },
        deleteAccount(state, id) {
            delete state.accounts[id];
            if (Object.keys(state.accounts).length === 0) {
                state.accounts = null;
            }
        },
        getHomePage(state, username) {
            if (localStorage.getItem(`${username}::homePage`) === null) {
                localStorage.setItem(`${username}::homePage`, 'Dashboard');
                state.homePage = 'Dashboard';
            } else {
                state.homePage = localStorage.getItem(`${username}::homePage`);
            }
        },
        setAccount(state, accountName) {
            state.accountName = accountName;
            state.accountData = accountName === '' ? '' : loadAccount(accountName);
        },
        setAccounts(state, accounts) {
            state.accounts = accounts;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setHomePage(state, data) {
            state.homePage = data.homePage;
            localStorage.setItem(`${data.username}::homePage`, data.homePage);
        },
        setLastLogin(state, lastLogin) {
            state.lastLogin = lastLogin;
        },
        setPanel(state, panel) {
            state.panel = panel;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setPasswordStrength(state, passwordStrength) {
            state.passwordStrength = passwordStrength;
        },
        updateAccount(state, data) {
            state.accounts[data.index] = data.account;
        },
        updateCredentials(state, credentials) {
            if (credentials.email) {
                state.email = credentials.email;
            }
            if (credentials.username) {
                state.username = credentials.username.toLowerCase();
            }
        },
    },
    actions: {
        async addAccount({commit, getters}, account) {
            response = await UserService.addAccount(account);

            if (successProcessor(response)) {
                commit('addAccount', {id: response.data.id, account});
                BuefyService.successToast(response.data.message);

                return true;
            }

            return false;
        },
        clearPanel({commit}) {
            commit('setAccount', '');
            commit('setPanel', 'Information');
        },
        async deleteAccount({commit, getters}, account): Promise<boolean> {
            response = await UserService.deleteAccount(account);

            if (successProcessor(response)) {
                commit('deleteAccount', response.data.index);
                BuefyService.successToast(response.data.message);
                return true;
            }

            return false;
        },
        async deleteUser({getters}): Promise<boolean> {
            const user = {
                email: getters.email,
                username: getters.username,
            };

            return successProcessor(await UserService.deleteUser(user));
        },
        async getAccounts({commit}): Promise<void> {
            response = await UserService.getAccounts();

            if (successProcessor(response)) {
                if (response.data.accounts !== undefined) {
                    commit('setAccounts', response.data.accounts);
                }
            }
        },
        async login({commit}, {user, rememberMe}): Promise<boolean> {
            response = await AuthService.login(user);

            if (successAuthProcessor(response)) {
                if (rememberMe) {
                    localStorage.setItem('user', user.username);
                } else {
                    localStorage.removeItem('user');
                }

                commit('auth_success');
                commit('setUsername', response.data.username);
                commit('getHomePage', response.data.username);
                commit('setEmail', response.data.email);
                commit('setLastLogin', response.data.lastLogin);
                commit('setPasswordStrength', response.data.passwordStrength);

                BuefyService.successToast(response.data.message);

                return true;
            }
            return false;
        },
        async logout({commit}): Promise<void> {
            commit('auth_logout');
            await router.push('/login');
            await AuthService.logout();
            BuefyService.successToast('Signed Out');
        },
        async register({commit}, user): Promise<boolean> {
            response = await AuthService.register(user);

            if (successAuthProcessor(response)) {
                BuefyService.successToast(response.data.message);
                return true;
            }
            return false;
        },
        setAccount({commit}, account): void {
            commit('setAccount', account);
        },
        setHomePage({commit, getters}, homePage): void {
            commit('setHomePage', {
                homePage,
                username: getters.username,
            });
        },
        setPanel({commit}, panel): void {
            commit('setPanel', panel);
        },
        async refreshToken(): Promise<boolean> {
            return successProcessor(await AuthService.refreshToken());
        },
        async updateAccount({commit}, account) {
            response = await UserService.updateAccount(account);

            if (successProcessor(response)) {
                commit('updateAccount', {
                    account,
                    index: response.data.index,
                });
                BuefyService.successToast(response.data.message);

                return true;
            }
            return false;
        },
        async updateCredentials({commit}, credentials): Promise<boolean> {
            response = await UserService.updateCredentials(credentials);

            if (successProcessor(response)) {
                commit('updateCredentials', credentials);
                BuefyService.successToast(response.data.message);
                return true;
            }
            return false;
        },
        async updatePassword({commit}, passwords): Promise<boolean> {
            response = await UserService.updatePassword(passwords);

            if (successProcessor(response)) {
                commit('setPasswordStrength', response.data.passwordStrength);
                BuefyService.successToast(response.data.message);
                return true;
            }
            return false;
        },
    },
    modules: {},
    getters: {
        accountData: (state) => state.accountData,
        accountName: (state) => state.accountName,
        accounts: (state) => state.accounts,
        email: (state) => state.email,
        homePage: (state) => state.homePage,
        isLoggedIn: (state) => state.hasAccessToken,
        lastLogin: (state) => state.lastLogin,
        panel: (state) => state.panel,
        passwordStrength: (state) => state.passwordStrength,
        username: (state) => state.username,
    },
});
