<template>
  <div id="dashboard">
    <div class="columns is-mobile">
      <div id="dashboardLeftPanel" class="column is-2">
        <LeftPanel/>
      </div>
      <div id="dashboardPanel" class="column is-10">
        <PanelView/>
      </div>
    </div>
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel";
import PanelView from "@/components/common/Panel";
import {Panel} from "@/enums/panel";

export default {
  name: "Dashboard",
  components: {LeftPanel, PanelView},
  computed: {
    panel() {
      return this.$store.getters.panel;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path) {
      switch (to.path) {
        case '/dashboard':
          this.$store.dispatch('setPanel', Panel.INFORMATION)
          break;
        case '/dashboard/accountsSummary':
          this.$store.dispatch('setPanel', Panel.ACCOUNTS_SUMMARY)
          break;
        case '/accounts':
          this.$store.dispatch('setPanel', Panel.ACCOUNTS)
          break;
        case '/accounts/editAccount':
          this.$store.dispatch('setPanel', Panel.EDIT_ACCOUNT)
          break;
        case '/accounts/addAccount':
          this.$store.dispatch('setPanel', Panel.ADD_ACCOUNT)
          break;
        case '/accounts/viewAccount':
          this.$store.dispatch('setPanel', Panel.ACCOUNT)
          break;
        case '/settings':
          this.$store.dispatch('setPanel', Panel.USER)
          break;
        case '/about':
          this.$store.commit('setPanel', Panel.ABOUT);
          break;
      }
      next();
    }
  },
  created() {
    switch (this.$route.path) {
      case '/dashboard':
        this.$store.dispatch('setPanel', Panel.INFORMATION)
        break;
      case '/dashboard/accountsSummary':
        this.$store.dispatch('setPanel', Panel.ACCOUNTS_SUMMARY)
        break;
      case '/accounts':
        this.$store.dispatch('setPanel', Panel.ACCOUNTS)
        break;
      case '/accounts/editAccount':
        this.$store.dispatch('setPanel', Panel.EDIT_ACCOUNT)
        break;
      case '/accounts/addAccount':
        this.$store.dispatch('setPanel', Panel.ADD_ACCOUNT)
        break;
      case '/accounts/viewAccount':
        this.$store.dispatch('setPanel', Panel.ACCOUNT)
        break;
      case '/settings':
        this.$store.dispatch('setPanel', Panel.USER)
        break;
      case '/about':
        this.$store.commit('setPanel', Panel.ABOUT);
        break;
    }
    if (localStorage.getItem("readWelcomeNotification") !== "true") {
      localStorage.setItem("readWelcomeNotification", "true");
      this.welcomeAlert();
    }
    this.$store.dispatch('refreshToken').then((validAccessToken) => {
      if (!validAccessToken) {
        this.$store.dispatch('logout');
      } else {
        if (this.$store.getters.accounts === null)
          this.$store.dispatch('getAccounts');
      }
    });
  },
  methods: {
    welcomeAlert() {
      this.$buefy.dialog.alert({
        title: 'Welcome!',
        message: 'Thank you for trying out <b>Arc</b>! <br/>I hope you enjoy :)',
        confirmText: 'Continue'
      })
    },
  }
}
</script>

<style scoped>
html #dashboard {
  height: 100vh;
  background-image: url('../assets/img/background.webp');
  background-position: top;
  background-repeat: repeat;
  background-size: cover;
}

template {
  background-color: #132241 !important;
}
</style>
