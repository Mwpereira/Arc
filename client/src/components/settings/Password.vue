<template>
  <div class="column">
    <div class="card card-settings m-5" auto-id="card-password">
      <div class="card-content">
        <div class="content">
          <h2 class="is-size-3 has-text-centered" auto-id="header-card">Password</h2>
        </div>
        <div class="content">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="updatePassword()">
              <BInputWithValidation
                  v-model="passwords.currentPassword"
                  icon="lock"
                  label="Current Password"
                  placeholder="Current Password"
                  rules="required"
                  type="password"
                  fieldAutoId="field-password"
                  inputAutoId="input-password"
              />
              <BInputWithValidation
                  v-model="passwords.newPassword"
                  icon="lock"
                  label="New Password"
                  placeholder="New Password"
                  required
                  rules="required|min_password:7"
                  type="password"
                  vid="password"
                  fieldAutoId="field-new-password"
                  inputAutoId="input-new-password"
              />
              <BInputWithValidation
                  icon="lock"
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  required
                  rules="required|confirmed:password"
                  type="password"
                  fieldAutoId="field-confirm-password"
                  inputAutoId="input-confirm-password"
              />

              <div class="level mt-5">
                <button
                    class="button is-block is-fullwidth is-primary is-medium"
                    type="submit"
                    auto-id="button-confirm"
                >
                  Update Password
                </button>
              </div>
            </form>
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
  name: "Password",
  components: {BInputWithValidation, ValidationObserver},
  data: () => {
    return {
      passwords: {
        currentPassword: null,
        newPassword: null
      }
    };
  },
  methods: {
    async updatePassword() {
      const result = await this.$store.dispatch('updatePassword', this.passwords);
      if (result) {
        await this.$store.dispatch("clearPanel");
      }
    }
  }
}
</script>
