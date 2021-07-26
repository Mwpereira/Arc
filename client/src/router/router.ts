import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        alias: '/home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/dashboard',
        alias: ['/dashboard/accountsSummary', '/about', '/settings', '/accounts', '/accounts/addAccount',
            '/accounts/account', '/accounts/editAccount'],
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '*',
        component: Home,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
