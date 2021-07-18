import Vue from 'vue';
import Vuex from 'vuex';

import {AxiosResponse} from 'axios';
import createPersistedState from 'vuex-persistedstate';
import router from '../router/router';
import AuthService from '../services/auth/auth-service';
import Loading from '../services/ui/loading';
import Toasts from '../services/ui/toasts';
import UserService from '../services/user/user-service';
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
            Loading.start();

            response = await UserService.addAccount(account);

            Loading.stop();

            if (successProcessor(response)) {
                commit('addAccount', {id: response.data.id, account});
                Toasts.success(response.data.message);

                return true;
            }
            return false;
        },
        clearPanel({commit}) {
            commit('setAccount', '');
            commit('setPanel', 'Information');
        },
        async deleteAccount({commit, getters}, account) {
            Loading.start();

            response = await UserService.deleteAccount(account);

            Loading.stop();

            if (successProcessor(response)) {
                commit('deleteAccount', response.data.index);
                Toasts.success(response.data.message);
            }
        },
        async deleteUser({getters}) {
            const user = {
                email: getters.email,
                username: getters.username,
            };
            await UserService.deleteUser(user);
        },
        async getAccounts({commit}) {
            response = await UserService.getAccounts();
            if (successProcessor(response)) {
                if (response.data.accounts !== undefined) {
                    commit('setAccounts', response.data.accounts);
                }
            }
        },
        async login({commit}, {user, rememberMe}): Promise<boolean> {
            Loading.start();

            response = await AuthService.login(user);

            Loading.stop();

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

                Toasts.success(response.data.message);
                return true;
            }
            return false;
        },
        async logout({commit}) {
            commit('auth_logout');
            await router.push('/login');
            await AuthService.logout();
            Toasts.success('Signed Out');
        },
        async register({commit}, user): Promise<boolean> {
            Loading.start();

            response = await AuthService.register(user);

            Loading.stop();

            if (successAuthProcessor(response)) {
                Toasts.success(response.data.message);
                return true;
            }
            return false;
        },
        setAccount({commit}, account) {
            commit('setAccount', account);
        },
        setHomePage({commit, getters}, homePage) {
            commit('setHomePage', {
                homePage,
                username: getters.username,
            });
        },
        setPanel({commit}, panel) {
            commit('setPanel', panel);
        },
        async refreshToken() {
            response = await AuthService.refreshToken();
            return successProcessor(response);
        },
        async updateAccount({commit}, account) {
            Loading.start();

            response = await UserService.updateAccount(account);

            Loading.stop();

            if (successProcessor(response)) {
                commit('updateAccount', {
                    account,
                    index: response.data.index,
                });
                Toasts.success(response.data.message);

                return true;
            }
            return false;
        },
        async updateCredentials({commit}, credentials): Promise<any> {
            Loading.start();

            response = await UserService.updateCredentials(credentials);

            Loading.stop();

            if (successProcessor(response)) {
                commit('updateCredentials', credentials);
                Toasts.success(response.data.message);
                return true;
            }
            return false;
        },
        async updatePassword({commit}, passwords): Promise<any> {
            Loading.start();

            response = await UserService.updatePassword(passwords);

            Loading.stop();

            if (successProcessor(response)) {
                commit('setPasswordStrength', response.data.passwordStrength);
                Toasts.success(response.data.message);
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
