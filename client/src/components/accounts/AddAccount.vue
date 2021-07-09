<template>
  <AccountForm/>
</template>

<script>
import AccountForm from "@/components/accounts/AccountForm";

export default {
  name: "AddAccount.vue",
  components: {AccountForm},
  created(){
    document.title = 'Add Account - Arc';
  }
};
</script>
