<template>
  <section>
    <h2 auto-id="header-panel" class="is-size-3 mb-5 has-text-left">
      {{ editAccount === true ? 'Edit Account' : 'Add Account' }}
    </h2>
    <div class="columns">
      <div id="accountForm" class="column">
        <div class="card m-5">
          <div class="card-content">
            <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
              <form @submit.prevent="submit()">
                <BInputWithValidation v-model="account.accountName"
                                      fieldAutoId="field-account-name"
                                      inputAutoId="input-account-name"
                                      label="Account Name"
                                      maxlength="32"
                                      rules="required|max_account_characters:32"
                />

                <b-field label="Email">
                  <b-input v-model="account.email" auto-id="input-email"></b-input>
                </b-field>

                <b-field label="Username">
                  <b-input v-model="account.username" auto-id="input-username"></b-input>
                </b-field>

                <b-field label="Password">
                  <b-input v-model="account.password" auto-id="input-password"></b-input>
                </b-field>

                <b-field label="Category">
                  <b-select
                      v-model="account.category"
                      auto-id="select-category"
                      icon="shape"
                      placeholder="Select"
                      required
                  >
                    <option value="School">School</option>
                    <option value="Work">Work</option>
                    <option value="Social">Social</option>
                    <option value="Finance">Finance</option>
                    <option value="Tech">Tech</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Family">Family</option>
                  </b-select>
                </b-field>

                <b-field label="Notes">
                  <b-input
                      v-model="account.notes"
                      auto-id="input-notes"
                      maxlength="250"
                      type="textarea"
                  ></b-input>
                </b-field>

                <div class="level">
                  <button
                      :disabled="invalid || account.category == null"
                      auto-id="button-confirm"
                      class="button is-block is-fullwidth is-primary is-medium my-2 mr-2"
                      type="submit"
                  >
                    {{ editAccount === true ? "Save" : "Add Account" }}
                  </button>
                  <button
                      auto-id="button-cancel"
                      class="button is-block is-fullwidth is-warning is-medium my-2"
                      @click="exit()"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {ValidationObserver} from "vee-validate";
import {Panel} from "@/enums/panel";
import BInputWithValidation from "@/components/common/buefy-vee-validate/BInputWithValidation";
import BuefyService from "@/services/buefy-service";

export default {
  name: "AccountForm",
  components: {ValidationObserver, BInputWithValidation},
  data: () => {
    return {
      account: {
        accountName: "",
        email: "",
        username: "",
        password: "",
        category: null,
        notes: "",
      },
    };
  },
  computed: {
    editAccount() {
      return this.$store.getters.panel === Panel.EDIT_ACCOUNT;
    }
  },
  methods: {
    async addAccount() {
      BuefyService.startLoading();

      if (await this.$store.dispatch("addAccount", this.account)) {
        await this.$router.push('/accounts');
        await this.$store.dispatch("setPanel", Panel.ACCOUNTS);
      }

      BuefyService.stopLoading();
    },
    generatePassword() {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.password = result;
    },
    exit() {
      if (this.editAccount) {
        this.$router.push('/accounts/viewAccount');
        this.$store.dispatch('setPanel', Panel.ACCOUNT);
      } else {
        this.$router.push('/accounts');
        this.$store.dispatch("clearPanel");
      }
    },
    loadAccount() {
      this.account = {...this.$store.getters.accountData};
    },
    async updateAccount() {
      BuefyService.startLoading();
      if (await this.$store.dispatch("updateAccount", this.account)) {
        await this.$store.dispatch('setAccount', this.account.id);
        await this.$store.dispatch('setPanel', Panel.ACCOUNT);
      }
      BuefyService.stopLoading();
    },
    submit() {
      if (this.$store.getters.panel === Panel.ADD_ACCOUNT) {
        this.addAccount();
      }
      if (this.$store.getters.panel === Panel.EDIT_ACCOUNT) {
        this.updateAccount();
      }
    }
  },
  mounted() {
    if (this.$store.getters.panel === Panel.EDIT_ACCOUNT) {
      this.loadAccount();
    }
    if (this.$store.getters.accountName === null) {
      this.$router.push('/accounts');
      this.$store.dispatch("setPanel", Panel.ACCOUNTS);
    }
  }
};
</script>

<style scoped>
.button {
  color: white;
}

.button.is-warning {
  color: white;
}

.button.is-primary:hover,
.button.is-warning:hover,
.button.is-danger:hover {
  color: #2f2f2f;
}

h2 {
  color: white;
}

#accountForm {
  max-width: 800px;
}
</style>
