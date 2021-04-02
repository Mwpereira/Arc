<template>
  <div id="register" class="columns is-centered">
    <div class="column is-9">
      <div class="card card-fixed">
        <div class="card-content">
          <div class="content-media">
            <figure class="card-image">
              <img
                  alt="Arc Logo"
                  auto-id="img-logo"
                  src="../assets/logo.webp"
                  webp-fallback=".png"/>
            </figure>
          </div>
          <div class="content">
            <h2 auto-id="header-card" class="is-size-3 has-text-centered">Create Account</h2>
          </div>
          <div class="content">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <form @submit.prevent="register">
                <BInputWithValidation
                    v-model="user.email"
                    icon="email"
                    label="Email"
                    placeholder="Email"
                    required
                    rules="required|email"
                    type="email"
                    fieldAutoId="field-email"
                    inputAutoId="input-email"
                />
                <BInputWithValidation
                    v-model="user.username"
                    icon="account"
                    label="Username"
                    placeholder="Username"
                    required
                    rules="required|username|min_username:3|max_username:18"
                    type="username"
                    fieldAutoId="field-username"
                    inputAutoId="input-username"
                />
                <BInputWithValidation
                    v-model="user.password"
                    icon="lock"
                    label="Password"
                    placeholder="Password"
                    required
                    rules="required|min_password:7"
                    type="password"
                    vid="password"
                    fieldAutoId="field-password"
                    inputAutoId="input-password"
                />
                <BInputWithValidation
                    v-model="confirmation"
                    icon="lock"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    required
                    rules="required|confirmed:password"
                    type="password"
                    fieldAutoId="field-confirm-password"
                    inputAutoId="input-confirm-password"
                />
                <div class="buttons">
                  <button
                      class="button is-block is-fullwidth is-primary is-medium"
                      type="submit"
                      auto-id="button-register"
                  >
                    <span>Register</span>
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item has-text-centered">
            <span> Existing User? <a v-on:click="pageSwitch('login')">Login!</a> </span>
          </p>
          <p class="card-footer-item has-text-centered">
                        <span>
                            View my
                            <a href="https://github.com/Mwpereira" rel="noopener" target="_blank" auto-id="href-github">Github</a>
                        </span>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import {ValidationObserver} from 'vee-validate';
import BInputWithValidation from '@/components/inputs/BInputWithValidation';

export default {
  name: 'Register',
  components: {ValidationObserver, BInputWithValidation},
  data: () => {
    return {
      user: {
        email: null,
        username: null,
        password: null,
      },
      confirmation: null,
    };
  },
  async created() {
    if (this.$store.getters.isLoggedIn) {
      await this.$router.push('/dashboard');
    }
  },
  methods: {
    pageSwitch(page) {
      this.$router.push(`/${page}`);
    },
    async register() {
      this.$store.dispatch('register', this.user)
          .then((result) => {
            if (result) {
              this.$router.push('/login')
            }
          });
    }
  }
};
</script>

<style scoped>
#register {
  height: 100vh;
  align-items: center;
}
</style>
