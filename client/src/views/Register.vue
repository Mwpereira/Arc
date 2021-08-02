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
            <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
              <form @submit.prevent="register">
                <BInputWithValidation
                    v-model="user.email"
                    fieldAutoId="field-email"
                    icon="email"
                    inputAutoId="input-email"
                    label="Email"
                    placeholder="Email"
                    rules="required|email"
                    type="email"
                />
                <BInputWithValidation
                    v-model="user.username"
                    fieldAutoId="field-username"
                    icon="account"
                    inputAutoId="input-username"
                    label="Username"
                    placeholder="Username"
                    rules="required|username|min_username:3|max_username:18"
                    type="username"
                />
                <BInputWithValidation
                    v-model="user.password"
                    fieldAutoId="field-password"
                    icon="lock"
                    inputAutoId="input-password"
                    label="Password"
                    placeholder="Password"
                    rules="required|min_password:7"
                    type="password"
                    vid="password"
                />
                <BInputWithValidation
                    v-model="confirmation"
                    fieldAutoId="field-confirm-password"
                    icon="lock"
                    inputAutoId="input-confirm-password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    rules="required|confirmed:password"
                    type="password"
                />
                <div class="buttons mt-4">
                  <button
                      :disabled="invalid"
                      auto-id="button-register"
                      class="button is-block is-fullwidth is-primary is-medium"
                      type="submit"
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
            <span> Existing User? <a rel="noopener" v-on:click="pageSwitch('login')">Login!</a></span>
          </p>
          <p class="card-footer-item has-text-centered">
                        <span>
                            View my
                            <a auto-id="href-github" href="https://github.com/Mwpereira" rel="noopener" target="_blank">Github</a>
                        </span>
          </p>
        </footer>
      </div>
    </div>
    <span id="homeBtn" class="is-size-4 px-4" v-on:click="pageSwitch('')">
      <i class="fas fa-home"></i>
    </span>
  </div>
</template>

<script>
import {ValidationObserver} from 'vee-validate';
import BInputWithValidation from "@/components/common/buefy-vee-validate/BInputWithValidation";
import BuefyService from "@/services/buefy-service";

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
    document.title = 'Register - Arc';
    if (this.$store.getters.isLoggedIn) {
      await this.$router.push('/dashboard');
    }
  },
  methods: {
    pageSwitch(page) {
      this.$router.push(`/${page}`);
    },
    async register() {
      BuefyService.startLoading();
      if (await this.$store.dispatch('register', this.user)) {
        await this.$router.push('/login')
      }
      BuefyService.stopLoading();
    }
  }
};
</script>

<style scoped>
html #register {
  background: rgba(28, 51, 92, 0.65) none;
}


#register {
  height: 100vh;
  align-items: center;
}

#homeBtn {
  padding: 10px;
  background-color: #192d52;
  color: white;
  position: absolute;
  top: 20px;
  left: 20px;
}

#homeBtn:hover {
  cursor: pointer;
}

</style>
