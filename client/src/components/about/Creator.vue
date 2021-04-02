<template>
  <div class="column">
    <div class="card card-settings m-5" auto-id="card-creator">
      <div class="card-content">
        <div class="content">
          <h2 class="is-size-3 has-text-centered" auto-id="header-card">Creator</h2>
        </div>
        <div class="content has-text-centered">
          <p>Developer: Michael Pereira</p>
          <p>Education: Ryerson University</p>
          <p>Github: <a href="https://github.com/Mwpereira" rel="noopener" target="_blank" auto-id="href-github">Visit</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/michael-pereira-07/" rel="noopener"
                          target="_blank" auto-id="href-linkedin">Visit</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Creator.vue"
}
</script>

<style scoped>
.card {
  height: 275px;
  min-width: 325px;
}
</style>
