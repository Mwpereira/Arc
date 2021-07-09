<template>
  <div class="column">
    <div auto-id="card-password" class="card card-settings m-5">
      <div class="card-content">
        <div class="content">
          <h2 auto-id="header-card" class="is-size-3 has-text-centered">Password</h2>
        </div>
        <div class="content">
          <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
            <form @submit.prevent="updatePassword()">
              <BInputWithValidation
                  v-model="passwords.currentPassword"
                  fieldAutoId="field-password"
                  icon="lock"
                  inputAutoId="input-password"
                  label="Current Password"
                  placeholder="Current Password"
                  rules="required"
                  type="password"
              />
              <BInputWithValidation
                  v-model="passwords.newPassword"
                  fieldAutoId="field-new-password"
                  icon="lock"
                  inputAutoId="input-new-password"
                  label="New Password"
                  placeholder="New Password"
                  rules="required|min_password:7"
                  type="password"
                  vid="password"
              />
              <BInputWithValidation
                  fieldAutoId="field-confirm-password"
                  icon="lock"
                  inputAutoId="input-confirm-password"
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  rules="required|confirmed:password"
                  type="password"
              />

              <div class="level mt-5">
                <button
                    :disabled="invalid"
                    auto-id="button-confirm"
                    class="button is-block is-fullwidth is-primary is-medium"
                    type="submit"
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
import BInputWithValidation from "../common/inputs/BInputWithValidation";

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
