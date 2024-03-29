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
                    class="button is-block is-fullwidth is-primary is-medium mt-4"
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
              New? <a rel="noopener" v-on:click="pageSwitch('register')">Sign Up!</a>
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
    <span id="homeBtn" class="is-size-4 px-4" v-on:click="pageSwitch('')">
      <i class="fas fa-home"></i>
    </span>
  </div>
</template>

<script>
import {ValidationObserver} from "vee-validate";
import BInputWithValidation from "@/components/common/buefy-vee-validate/BInputWithValidation";
import BCheckboxesWithValidation from "@/components/common/buefy-vee-validate/BCheckboxesWithValidation";
import BuefyService from "@/services/buefy-service";
import {Panel} from "@/enums/panel";

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
    async login() {
      BuefyService.startLoading();
      if (await this.$store.dispatch('login', {user: this.user, rememberMe: this.rememberMe})) {
        this.pageSwitch(`dashboard`);

        if (this.$store.getters.homePage === Panel.ACCOUNTS) {
          await this.$store.dispatch('setPanel', Panel.ACCOUNTS);
        } else {
          await this.$store.dispatch('setPanel', Panel.INFORMATION);
        }
      }
      BuefyService.stopLoading();
    }
  },
  mounted() {
    if (localStorage.getItem('user') != null)
      this.user.username = localStorage.getItem('user');
  },
}

</script>

<style scoped>
html #login {
  background: rgba(28, 51, 92, 0.65) none;
}

html > div {
  background-color: rgba(28, 51, 92, 0.8) !important;
  height: 100vh;
  width: 100vh;
  position: absolute;
}

#login {
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
  background-color: #284070;
}

.b-checkbox.checkbox:hover {
  color: white;
}

@media screen and (max-width: 768px) {
  #homeBtn {
    position: relative;
    left: 2.5vw;
  }
}
</style>
