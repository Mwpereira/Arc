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
                  @click="confirmationDeleteUser()"
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
import BInputWithValidation from "@/components/common/buefy-vee-validate/BInputWithValidation";
import BuefyService from "@/services/buefy-service";
import {Panel} from "@/enums/panel";

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
    confirmationDeleteUser() {
      this.$buefy.dialog.confirm({
        title: 'Deleting User',
        message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
        confirmText: 'Delete User',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => await this.deleteUser()
      })
    },
    async deleteUser() {
      BuefyService.startLoading();
      if (await this.$store.dispatch("deleteUser")) {
        await this.$store.dispatch("logout");
        await this.$router.push(`/home`);
      }
      BuefyService.stopLoading();
    },
    loadCredentials() {
      this.placeHolder.email = this.$store.getters.email;
      this.placeHolder.username = this.$store.getters.username;
    },
    async updateCredentials() {
      BuefyService.startLoading();
      if (await this.$store.dispatch('updateCredentials', this.credentials)) {
        await this.$store.dispatch("setPanel", Panel.INFORMATION);
      }
      BuefyService.stopLoading();
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

.button {
  color: #363636 !important;
}
</style>
