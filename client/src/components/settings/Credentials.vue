<template>
  <div class="column">
    <div auto-id="card-credentials" class="card card-settings m-5">
      <div class="card-content">
        <div class="content">
          <h2 auto-id="header-card" class="is-size-3 has-text-centered">Credentials</h2>
        </div>
        <div class="content">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="updateCredentials()">
              <BInputWithValidation
                  v-model="credentials.email"
                  :placeholder=placeHolder.email
                  fieldAutoId="field-email"
                  icon="email"
                  inputAutoId="input-email"
                  label="Email"
                  rules="email"
                  type="email"
              />
              <BInputWithValidation
                  v-model="credentials.username"
                  :placeholder=placeHolder.username
                  fieldAutoId="field-username"
                  icon="account"
                  inputAutoId="input-username"
                  label="Username"
                  rules="username|min_username:3|max_username:18"
                  type="username"
              />

              <div class="level mt-5">
                <button
                    auto-id="button-confirm"
                    class="button is-block is-fullwidth is-primary is-medium"
                    type="submit"
                >
                  Save Credentials
                </button>
              </div>
            </form>
            <div class="level mt-5">
              <button
                  auto-id="button-delete"
                  class="button is-block is-fullwidth is-danger is-medium"
                  @click="deleteUser()"
              >
                Delete User Permanently
              </button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ValidationObserver} from "vee-validate";
import BInputWithValidation from "../common/inputs/BInputWithValidation";

export default {
  name: "Credentials",
  components: {BInputWithValidation, ValidationObserver},
  data: () => {
    return {
      credentials: {
        email: null,
        username: null
      },
      placeHolder: {
        email: null,
        username: null
      }
    }
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("deleteUser");
      this.$store.dispatch("logout");
      this.$router.push(`/home`);
    },
    loadCredentials() {
      this.placeHolder.email = this.$store.getters.email;
      this.placeHolder.username = this.$store.getters.username;
    },
    async updateCredentials() {
      const result = await this.$store.dispatch('updateCredentials', this.credentials);
      if (result) {
        await this.$store.dispatch("setPanel", "Information");
      }
    }
  },
  mounted() {
    this.loadCredentials();
  }
}
</script>

<style scoped>
.card {
  min-height: 438px !important;
}
</style>
