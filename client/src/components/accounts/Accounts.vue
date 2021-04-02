<template>
  <section>
    <h2 class="is-size-3 mb-5" auto-id="header-panel">Accounts</h2>
    <div class="columns is-multiline is-center is-vcentered has-text-centered">
      <div v-if="accounts === null" class="column">
        <div class="card card-fixed m-5" @click="addAccount()">
          <div class="card-content">
            <div class="level-item">
              <b-icon
                  class="mr-5"
                  icon="plus"
                  size="is-large"
              >
              </b-icon>
              <h2 class="is-size-3 has-text-centered">Add Account</h2>
            </div>
            <div class="content">
            </div>
          </div>
        </div>
      </div>
      <div v-for="account in accounts" :key="account.accountName" class="column">
        <div class="card card-account m-5" @click="loadAccount(account.id)">
          <div class="card-content" :auto-id="account.id">
            <div class="level-item">
              <b-icon
                  :icon="loadIcon(account.category)"
                  :pack="loadPack(account.category)"
                  class="mr-5"
                  size="is-large"
              >
              </b-icon>
              <h2 class="is-size-3 has-text-centered">{{ account.accountName }}</h2>
            </div>
            <div class="content">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Accounts",
  data: () => {
    return {
      categoryType: {
        School: "graduation-cap",
        Work: "briefcase",
        Social: "users",
        Finance: "credit-card",
        Tech: "codepen",
        Gaming: "gamepad",
        Automotive: "car",
        Family: "home"
      },
      pack: {
        School: "fas",
        Work: "fas",
        Social: "fas",
        Finance: "fas",
        Tech: "fab",
        Gaming: "fas",
        Automotive: "fas",
        Family: "fas"
      }
    }
  },
  computed: {
    accounts() {
      return this.$store.getters.accounts;
    },
  },
  methods: {
    addAccount() {
      this.$store.dispatch('setPanel', 'AddAccount');
    },
    loadAccount(account) {
      this.$store.dispatch('setAccount', account);
      this.$store.dispatch('setPanel', 'Account');
    },
    loadIcon(category) {
      return this.categoryType[`${category}`];
    },
    loadPack(category) {
      return this.pack[`${category}`];
    }
  },
}
</script>

<style scoped>
.card:hover {
  background-color: #3c5688 !important;
  cursor: pointer;
}
</style>
