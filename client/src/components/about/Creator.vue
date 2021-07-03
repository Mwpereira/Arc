<template>
  <div class="column">
    <div auto-id="card-creator" class="card card-settings m-5">
      <div class="card-content">
        <div class="content">
          <h2 auto-id="header-card" class="is-size-3 has-text-centered">Creator</h2>
        </div>
        <div class="content has-text-centered is-size-5">
          <p>Developer: Michael Pereira</p>
          <p>Education: Ryerson University</p>
          <p>Github: <a auto-id="href-github" href="https://github.com/Mwpereira" rel="noopener"
                        target="_blank">Visit</a></p>
          <p>LinkedIn: <a auto-id="href-linkedin" href="https://www.linkedin.com/in/michael-pereira-07/"
                          rel="noopener" target="_blank">Visit</a></p>
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
  min-width: 400px;
  height: 300px;
}
</style>
