<template>
  <div class="is-center is-centered is-vcentered has-text-centered">
    <figure class="image m-5 is-inline-block">
      <img alt="Arc" src="../../assets/logo.webp" style="max-width: 150px" webp-fallback=".png"/>
    </figure>
    <b-menu-list>
      <b-menu-item auto-id="navigation-dashboard" icon="home" label="Dashboard" @click="exit()"></b-menu-item>
      <b-menu-item auto-id="navigation-accounts" icon="database" label="Accounts" @click="accounts()"></b-menu-item>
      <b-menu-item auto-id="navigation-add-account" icon="plus" label="Add Account" @click="addAccount()"></b-menu-item>
      <b-menu-item auto-id="navigation-user-settings" icon="account" label="User Settings"
                   @click="settings()"></b-menu-item>
      <b-menu-item auto-id="navigation-about" icon="information-outline" label="About" @click="about()"></b-menu-item>
      <b-menu-item auto-id="navigation-logout" icon="door" label="Logout" @click="logout()"></b-menu-item>
    </b-menu-list>
  </div>
</template>
<script>

export default {
  name: "Menu",
  methods: {
    about() {
      this.$store.commit('setPanel', 'About');
    },
    accounts() {
      this.$store.commit('setPanel', 'Accounts');
    },
    addAccount() {
      this.$store.commit('setPanel', 'AddAccount');
    },
    exit() {
      this.$store.dispatch("setPanel", "Information");
    },
    async logout() {
      await this.$store.dispatch('logout');
    },
    settings() {
      this.$store.commit('setPanel', 'User');
    }
  }
}
</script>

<style scoped>
div {
  background-color: #192d52;
}
</style>
