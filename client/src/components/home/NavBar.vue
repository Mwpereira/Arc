<template>
  <b-navbar>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" rel="noopener" v-on:click="switchPage('register')">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" rel="noopener" v-on:click="switchPage('login')"> Log in </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    switchPage(page) {
      this.$router.push(`/${page}`);
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: transparent;
}

.navbar-item {
  font-weight: bold;
}

div.navbar-menu {
  background-color: transparent !important;
}

.burger {
  color: white !important;
}
</style>
