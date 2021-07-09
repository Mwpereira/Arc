<template>
  <div id="login" class="columns is-centered">
    <div class="column is-9">
      <div class="card card-fixed">
        <div class="card-content">
          <div class="content-media">
            <figure class="card-image">
              <img
                  alt="Arc Logo"
                  auto-id="img-logo"
                  src="../assets/logo.webp"
                  webp-fallback=".png"
              />
            </figure>
          </div>
          <div class="content">
            <h2 auto-id="header-card" class="is-size-3 has-text-centered">Welcome Back!</h2>
          </div>
          <div class="content">
            <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
              <form @submit.prevent="login">
                <BInputWithValidation
                    v-model="user.username"
                    fieldAutoId="field-username"
                    icon="account"
                    inputAutoId="input-username"
                    label="Email / Username"
                    placeholder="Email / Username"
                    rules="required"
                    type="username"
                />
                <BInputWithValidation
                    v-model="user.password"
                    fieldAutoId="field-password"
                    icon="lock"
                    inputAutoId="input-password"
                    label="Password"
                    placeholder="Password"
                    rules="required"
                    type="password"
                    vid="password"
                />
                <BCheckboxesWithValidation>
                  <b-checkbox v-model="rememberMe" :checked="rememberMe" auto-id="checkbox-rememberMe"
                              type="is-warning">Remember Me
                  </b-checkbox>
                </BCheckboxesWithValidation>
                <button
                    :disabled="invalid"
                    auto-id="button-login"
                    class="button is-block is-fullwidth is-primary is-medium"
                    type="submit"
                >
                  Login
                </button>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item has-text-centered">
            <span>
              New? <a v-on:click="pageSwitch('register')">Sign Up!</a>
            </span>
          </p>
          <p class="card-footer-item has-text-centered">
            <span>
              View my <a auto-id="href-github" href="https://github.com/Mwpereira" rel="noopener"
                         target="_blank">Github</a>
            </span>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import {ValidationObserver} from "vee-validate";
import BInputWithValidation from "../components/common/inputs/BInputWithValidation";
import BCheckboxesWithValidation from "../components/common/inputs/BCheckboxesWithValidation";

export default {
  name: "Login",
  components: {ValidationObserver, BInputWithValidation, BCheckboxesWithValidation},
  data: () => {
    return {
      user: {
        username: null,
        password: null,
      },
      rememberMe: localStorage.getItem('user') != null,
    };
  },
  async created() {
    document.title = 'Login - Arc';
    if (this.$store.getters.isLoggedIn) {
      await this.$store.dispatch("getAccounts", this.$store.getters.username)
      await this.$router.push('/dashboard');
    }
  },
  methods: {
    pageSwitch(page) {
      this.$router.push(`/${page}`);
    },
    login() {
      this.$store.dispatch('login', {user: this.user, rememberMe: this.rememberMe})
          .then(async (success) => {
            if (success) {
              this.pageSwitch(`dashboard`);

              if (this.$store.getters.homePage === 'Accounts') {
                await this.$store.dispatch('setPanel', 'Accounts');
              } else {
                await this.$store.dispatch('setPanel', 'Information');
              }
            }
          });
    }
  },
  mounted() {
    if (localStorage.getItem('user') != null)
      this.user.username = localStorage.getItem('user');
  },
}

</script>

<style scoped>
#login {
  height: 100vh;
  align-items: center;
}

.b-checkbox.checkbox:hover {
  color: white;
}
</style>
