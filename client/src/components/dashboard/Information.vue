<template>
  <section>
    <h2 auto-id="header-panel" class="is-size-3 mb-5">Dashboard</h2>
    <div class="columns is-multiline is-center is-vcentered has-text-centered">
      <div class="column">
        <div auto-id="card-user" class="card card-info m-5">
          <div class="card-content">
            <div class="content">
              <h2 class="is-size-3 has-text-centered">User</h2>
            </div>
            <div class="content">
              <p class="user-info"><b>Username:&nbsp</b>{{ user.username !== null ? user.username : null }}</p>
              <p class="user-info"><b>Email:&nbsp</b>{{ user.email !== null ? user.email : null }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div auto-id="card-security" class="card card-info m-5">
          <div class="card-content">
            <div class="content">
              <h2 class="is-size-3 has-text-centered">Security</h2>
            </div>
            <div class="content">
              <p><b>Password Strength:&nbsp</b>
                <span v-if="passwordStrength === 'STRONG'" style="color: limegreen;">
                 {{ passwordStrength === "" ? "N/A" : passwordStrength }}
                  </span>
                <span v-if="passwordStrength === 'WEAK'" style="color: red;">
                    {{ passwordStrength === "" ? "N/A" : passwordStrength }}
                  </span>
                <span v-if="passwordStrength === 'MEDIUM'" style="color: gold;">
                    {{ passwordStrength === "" ? "N/A" : passwordStrength }}
                  </span>
              </p>
              <p><b>Hashing Algorithm:&nbsp</b><span style="color: orange">HS256</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div auto-id="card-last-login" class="card card-info m-5">
          <div class="card-content">
            <div class="content">
              <h2 class="is-size-3 has-text-centered">Last Login</h2>
            </div>
            <div class="content">
              <p><b>Date:&nbsp</b>{{ lastLogin }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div auto-id="card-accounts" class="card card-info m-5">
          <div class="card-content">
            <div class="content">
              <h2 class="is-size-3 has-text-centered">Accounts</h2>
            </div>
            <div class="content">
              <p><b>Number of Accounts:&nbsp</b>{{ numberOfAccounts }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div auto-id="card-accounts-summary" class="card card-info m-5">
          <div class="card-content">
            <div class="content">
              <h2 class="is-size-3 has-text-centered">Accounts Summary</h2>
            </div>
            <div class="level-item">
              <button
                  :disabled="noAccounts"
                  class="button is-block is-half is-dark is-medium"
                  @click="loadAccountsSummary()"
              >
                Click to View
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div auto-id="card-home-page" class="card card-info m-5">
          <div class="card-content">
            <div class="content">
              <h2 class="is-size-3 has-text-centered">Home Page</h2>
            </div>
            <div class="content">
              <p><b>Current Home Page:&nbsp</b>{{ homePage }}</p>
              <b-radio v-model="page"
                       auto-id="radio-home-page"
                       name="Dashboard" native-value="Dashboard">
                Dashboard
              </b-radio>
              <b-radio v-model="page"
                       auto-id="radio-home-page"
                       name="Accounts"
                       native-value="Accounts">
                Accounts
              </b-radio>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Information",
  data() {
    return {
      page: ''
    }
  },
  watch: {
    page(homePage) {
      this.$store.dispatch('setHomePage', homePage)
    }
  },
  computed: {
    ip() {
      return this.$store.getters.ip;
    },
    lastLogin() {
      return this.$store.getters.lastLogin;
    },
    homePage() {
      return this.$store.getters.homePage;
    },
    noAccounts() {
      return (this.$store.getters.accounts === null);
    },
    numberOfAccounts() {
      return (this.$store.getters.accounts === null ? "0" : Object.keys(this.$store.getters.accounts).length);
    },
    passwordStrength() {
      return this.$store.getters.passwordStrength;
    },
    user() {
      return {username: this.$store.getters.username, email: this.$store.getters.email};
    }
  },
  mounted() {
    this.page = this.$store.getters.homePage;
  },
  methods: {
    loadAccountsSummary() {
      this.$store.dispatch("setPanel", "AccountsSummary");
    },
  }
}
</script>

<style scoped>
.card {
  height: 175px;
}

.user-info {
  word-break: break-all;
}

.b-radio {
  margin: 5px;
  padding: 0 8px 0 8px;
}

.b-radio.radio:hover {
  color: white;
}
</style>
