<template>
  <div>
    <div class="columns is-mobile">
      <div class="column is-2">
        <LeftPanel/>
      </div>
      <div class="column is-10">
        <Panel/>
      </div>
    </div>
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel";
import Panel from "@/components/common/Panel";

export default {
  name: "Dashboard",
  components: {LeftPanel, Panel},
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    } else {
      this.$store.dispatch('refreshToken').then((validAccessToken) => {
        if (!validAccessToken) {
          this.$store.dispatch('logout');
          this.$router.push('/login');
        } else {
          if (this.$store.getters.accounts === null)
            this.$store.dispatch('getAccounts');
        }
      });
    }
  },
}
</script>

<style scoped>
template {
  background-color: #132241 !important;
}
</style>
