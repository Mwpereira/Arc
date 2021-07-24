<template>
  <div>
    <div class="columns is-mobile">
      <div id="dashboardLeftPanel" class="column is-2">
        <LeftPanel/>
      </div>
      <div id="dashboardPanel" class="column is-10">
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
    this.$store.dispatch('refreshToken').then((validAccessToken) => {
      if (!validAccessToken) {
        this.$store.dispatch('logout');
      } else {
        if (this.$store.getters.accounts === null)
          this.$store.dispatch('getAccounts');
      }
    });
  },
}
</script>

<style scoped>
template {
  background-color: #132241 !important;
}
</style>
