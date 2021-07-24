<template>
  <AccountForm/>
</template>

<script>
import AccountForm from "@/components/accounts/AccountForm";

export default {
  name: "EditAccount",
  components: {AccountForm},
  created() {
    document.title = 'Edit Account - Arc';
  }
}
</script>
