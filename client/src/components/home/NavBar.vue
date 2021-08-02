<template>
  <b-navbar>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" href="/register  " rel="noopener">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" href="/login" rel="noopener"> Log in </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>

</script>

<style scoped>
.navbar {
  background-color: transparent;
}

.navbar-item {
  font-weight: bold;
}

div.navbar-menu {
  background-color: transparent !important;
}

.burger {
  color: white !important;
}
</style>
