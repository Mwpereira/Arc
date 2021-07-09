<template>
  <div class="column">
    <div auto-id="card-arc" class="card card-settings m-5">
      <div class="card-content">
        <div class="content">
          <h2 auto-id="header-card" class="is-size-3 has-text-centered">Arc</h2>
        </div>
        <div class="content has-text-centered is-size-5">
          <p>Arc Version: v1.0.0</p>
          <p>Front end Frameworks: Vue.js + Bulma</p>
          <p>Back end Server: AWS Serverless + TS</p>
          <p>Found a bug? <a auto-id="href-github-issues" href="https://github.com/mwpereira/arc/issues/"
                             rel="noopener" target="_blank">Post here</a></p>
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
