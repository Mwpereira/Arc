<template>
  <div class="column">
    <div class="card card-settings m-5" auto-id="card-credentials">
      <div class="card-content">
        <div class="content">
          <h2 class="is-size-3 has-text-centered" auto-id="header-card">Credentials</h2>
        </div>
        <div class="content">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="updateCredentials()">
              <BInputWithValidation
                  v-model="credentials.email"
                  :placeholder=placeHolder.email
                  icon="email"
                  label="Email"
                  rules="email"
                  type="email"
                  fieldAutoId="field-email"
                  inputAutoId="input-email"
              />
              <BInputWithValidation
                  v-model="credentials.username"
                  :placeholder=placeHolder.username
                  icon="account"
                  label="Username"
                  rules="username|min_username:3|max_username:18"
                  type="username"
                  fieldAutoId="field-username"
                  inputAutoId="input-username"
              />

              <div class="level mt-5">
                <button
                    class="button is-block is-fullwidth is-primary is-medium"
                    type="submit"
                    auto-id="button-confirm"
                >
                  Save Credentials
                </button>
              </div>
            </form>
            <div class="level mt-5">
              <button
                  class="button is-block is-fullwidth is-danger is-medium"
                  @click="deleteUser()"
                  auto-id="button-delete"
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
import BInputWithValidation from "@/components/inputs/BInputWithValidation";

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
.card{
  height: 438px !important;
}
</style>
