<template>
  <div>
    <section>
      <h2 auto-id="header-panel" class="is-size-3 has-text-left mb-5">User Settings</h2>
      <div class="columns is-multiline">
        <Credentials/>
        <Password/>
      </div>
    </section>
  </div>
</template>

<script>
import Credentials from "@/components/settings/Credentials";
import Password from "@/components/settings/Password";

export default {
  name: "User",
  components: {Credentials, Password},
}
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

.card-header-title {
  color: white;
}
</style>
