<template>
  <div class="is-center is-centered is-vcentered has-text-centered">
    <figure class="image m-5 is-inline-block">
      <img alt="Arc" src="../../assets/logo.webp" style="max-width: 150px" webp-fallback=".png"/>
    </figure>
    <b-menu-list>
      <b-menu-item icon="home" label="Dashboard" @click="exit()" auto-id="navigation-dashboard"></b-menu-item>
      <b-menu-item icon="database" label="Accounts" @click="accounts()" auto-id="navigation-accounts"></b-menu-item>
      <b-menu-item icon="plus" label="Add Account" @click="addAccount()" auto-id="navigation-add-account"></b-menu-item>
      <b-menu-item icon="account" label="User Settings" @click="settings()" auto-id="navigation-user-settings"></b-menu-item>
      <b-menu-item icon="information-outline" label="About" @click="about()" auto-id="navigation-about"></b-menu-item>
      <b-menu-item icon="door" label="Logout" @click="logout()" auto-id="navigation-logout"></b-menu-item>
    </b-menu-list>
  </div>
</template>
<script>

export default {
  name: "Menu",
  methods: {
    about(){
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
      await this.$router.push(`/login`);
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
