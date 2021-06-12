<template>
  <div class="column">
    <div class="card card-settings m-5" auto-id="card-arc">
      <div class="card-content">
        <div class="content">
          <h2 class="is-size-3 has-text-centered" auto-id="header-card">Arc</h2>
        </div>
        <div class="content has-text-centered is-size-5">
          <p>Arc Version: v1.0.0</p>
          <p>Front end Frameworks: Vue.js + Bulma</p>
          <p>Back end Server: AWS Serverless</p>
          <p>Found a bug? <a href="https://github.com/mwpereira/arc/issues/" rel="noopener"
                             target="_blank" auto-id="href-github-issues">Post here</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Arc.vue"
}
</script>

<style scoped>
.card {
  height: 300px;
  min-width: 400px;
}
</style>
