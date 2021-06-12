<template>
  <section>
    <h2 class="is-size-3 mb-5 has-text-left" auto-id="header-panel">
      {{ editAccount === true ? 'Edit Account' : 'Add Account' }}
    </h2>
    <div class="columns">
      <div class="column" id="accountForm">
        <div class="card m-5">
          <div class="card-content">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <form @submit.prevent="submit()">
                <BInputWithValidation v-model="account.accountName"
                                      label="Account Name"
                                      required
                                      maxlength="32"
                                      rules="required|max_account_characters:32"
                                      fieldAutoId="field-account-name"
                                      inputAutoId="input-account-name"
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
                      icon="shape"
                      placeholder="Select"
                      auto-id="select-category"
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
                      maxlength="250"
                      type="textarea"
                      auto-id="input-notes"
                  ></b-input>
                </b-field>

                <div class="level">
                  <button
                      class="button is-block is-fullwidth is-primary is-medium"
                      type="submit"
                      auto-id="button-confirm"
                  >
                    {{ editAccount === true ? "Save" : "Add Account" }}
                  </button>
                  <button
                      class="button is-block is-fullwidth is-warning is-medium"
                      @click="exit()"
                      auto-id="button-cancel"
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
import BInputWithValidation from "@/components/inputs/BInputWithValidation";

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
      return this.$store.getters.panel === "EditAccount";
    }
  },
  methods: {
    async addAccount() {
      if (await this.$store.dispatch("addAccount", this.account)) {
        await this.$store.dispatch("setPanel", "Accounts");
      }
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
        this.$store.dispatch('setPanel', 'Account');
      } else {
        this.$store.dispatch("clearPanel");
      }
    },
    loadAccount() {
      this.account = {...this.$store.getters.accountData};
    },
    async updateAccount() {
      if (await this.$store.dispatch("updateAccount", this.account)) {
        await this.$store.dispatch('setAccount', this.account.id);
        await this.$store.dispatch('setPanel', 'Account');
      }
    },
    submit() {
      if (this.$store.getters.panel === "AddAccount") {
        this.addAccount();
      }
      if (this.$store.getters.panel === "EditAccount") {
        this.updateAccount();
      }
    }
  },
  mounted() {
    if (this.$store.getters.panel === "EditAccount") {
      this.loadAccount();
    }
  }
};
</script>

<style scoped>
.button {
  margin: 3px;
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

#accountForm{
  max-width: 800px;
}
</style>
