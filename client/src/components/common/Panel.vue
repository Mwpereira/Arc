<template>
  <div id="panel">
    <panel :is="panel" id="component"></panel>
  </div>
</template>

<script>
import Account from '@/components/accounts/Account';
import AddAccount from '@/components/accounts/AddAccount';
import EditAccount from "@/components/accounts/EditAccount";
import Information from "@/components/dashboard/Information";
import User from "@/components/settings/User";
import Accounts from "@/components/accounts/Accounts";
import AccountsSummary from "@/components/dashboard/AccountsSummary";
import About from "@/views/About";

export default {
  name: "Panel",
  components: {About, Account, Accounts, AccountsSummary, AddAccount, EditAccount, Information, User},
  computed: {
    panel() {
      return this.$store.getters.panel;
    },

  },
}
</script>

<style scoped>
#panel {
  width: 100%;
  height: 100%;
  background: rgba(28, 51, 92, 0.8);
}

#component {
  padding: 50px;
}
</style>
