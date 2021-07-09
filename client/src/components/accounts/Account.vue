<template>
  <section>
    <h2 auto-id="header-panel" class="is-size-3 has-text-left mb-5">Account</h2>
    <div class="columns">
      <div id="account" class="column">
        <div class="card m-5">
          <div class="card-content">
            <b-field auto-id="field-account-name" class="mb-5" label="Account Name">
              <b-field :label="account.accountName" auto-id="field-account-name"/>
            </b-field>

            <b-field auto-id="field-email" class="mb-5" label="Email">
              <b-field :label="account.email === '' ? 'Empty' : account.email" auto-id="field-email"/>
            </b-field>

            <b-field auto-id="field-username" class="mb-5" label="Username">
              <b-field :label="account.username === '' ? 'Empty' : account.username" auto-id="field-username"/>
            </b-field>

            <b-field auto-id="field-password" class="mb-5" label="Password">
              <b-field :label="account.password === '' ? 'Empty' : account.password" auto-id="field-password"/>
            </b-field>

            <b-field auto-id="field-category" class="mb-5" label="Category">
              <b-field :label="account.category === '' ? 'Empty' : account.category" auto-id="field-category"/>
            </b-field>

            <b-field auto-id="field-notes" class="mb-6" label="Notes">
              <b-field id="notes" :label="account.notes === '' ? 'Empty' : account.notes" auto-id="field-notes"/>
            </b-field>

            <div class="level">
              <button
                  auto-id="button-confirm"
                  class="button is-block is-fullwidth is-primary is-medium mr-2 my-2"
                  @click="editAccount()"
              >
                Edit
              </button>
              <button
                  auto-id="button-cancel"
                  class="button is-block is-fullwidth is-warning is-medium mr-2 my-2"
                  @click="exit()"
              >
                Cancel
              </button>
              <button
                  auto-id="button-delete"
                  class="button is-block is-fullwidth is-danger is-medium my-2"
                  @click="deleteAccount()"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Account",
  computed: {
    account() {
      return this.$store.getters.accountData;
    },
  },
  methods: {
    async deleteAccount() {
      await this.$store.dispatch("deleteAccount", this.account);
      this.exit();
    },
    editAccount() {
      this.$store.dispatch("setPanel", "EditAccount");
    },
    exit() {
      this.$store.dispatch("setPanel", "Accounts");
    },
  },
  created(){
    document.title = 'Account - Arc';
  }
};
</script>

<style>
div.card-content > div.field > div.field > label {
  color: white !important;
  font-weight: 300;
}

#notes {
  word-break: break-all;
}

#account {
  max-width: 800px;
}
</style>
