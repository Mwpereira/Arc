<template>
  <div class="is-center is-centered is-vcentered has-text-centered">
    <figure class="image m-5 is-inline-block">
      <img alt="Arc" src="../../assets/logo.webp" style="max-width: 150px" webp-fallback=".png"/>
    </figure>
    <b-menu-list>
      <b-menu-item auto-id="navigation-dashboard" icon="home" icon-pack="fas" label="Dashboard"
                   @click="exit()"></b-menu-item>
      <b-menu-item auto-id="navigation-accounts" icon="database" icon-pack="fas" label="Accounts"
                   @click="accounts()"></b-menu-item>
      <b-menu-item auto-id="navigation-add-account" icon="plus" icon-pack="fas" label="Add Account"
                   @click="addAccount()"></b-menu-item>
      <b-menu-item auto-id="navigation-user-settings" icon="user" icon-pack="fas" label="User Settings"
                   @click="settings()"></b-menu-item>
      <b-menu-item auto-id="navigation-about" icon="info-circle" icon-pack="fas" label="About"></b-menu-item>
      <b-menu-item auto-id="navigation-logout" icon="sign-out-alt" icon-pack="fas" label="Logout"
                   @click="logout()"></b-menu-item>
    </b-menu-list>
  </div>
</template>
<script>
import {Panel} from "@/enums/panel";

export default {
  name: "Menu",
  methods: {
    about() {
      this.$router.push('/about');
      this.$store.commit('setPanel', Panel.ABOUT);
    },
    accounts() {
      this.$router.push('/accounts');
      this.$store.commit('setPanel', Panel.ACCOUNTS);
    },
    addAccount() {
      this.$router.push('/accounts/addAccount');
      this.$store.commit('setPanel', Panel.ADD_ACCOUNT);
    },
    same() {

    },
    exit() {
      this.$router.push('/dashboard');
      this.$store.dispatch("setPanel", Panel.INFORMATION);
    },
    async logout() {
      await this.$store.dispatch('logout');
    },
    settings() {
      this.$router.push('/settings');
      this.$store.commit('setPanel', 'User');
    }
  }
}
</script>

<style>
li a .icon {
  margin-right: 5px;
}
</style>
