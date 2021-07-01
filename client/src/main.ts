import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import router from './router/router';
import './providers/vee-validate';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import './assets/css/styles.scss';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
