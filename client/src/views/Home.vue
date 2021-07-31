<template>
  <div id="home" class="columns is-centered">
    <div class="column is-9">
      <div class="card card-fixed">
        <div class="card-content">
          <div class="content-media">
            <figure class="card-image">
              <img
                  alt="Arc Logo"
                  auto-id="img-logo"
                  src="../assets/logo.webp"
                  webp-fallback=".png"
              />
            </figure>
          </div>
          <div class="content">
            <h3 auto-id="header-card-arc" class="is-size-4 has-text-centered">Secure, Advanced, & Customizable</h3>
          </div>
          <div class="content buttons">
            <b-button auto-id="button-login" class="button is-block is-fullwidth is-primary is-medium mb-1"
                      v-on:click="pageSwitch('login')">Login
            </b-button>
            <b-button auto-id="button-register" class="button is-block is-fullwidth is-primary is-medium"
                      v-on:click="pageSwitch('register')">Sign
              Up
            </b-button>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item has-text-centered">
                        <span>
                            View my <a auto-id="href-github" href="https://github.com/Mwpereira" rel="noopener"
                                       target="_blank">Github</a>
                        </span>
          </p>
          <p class="card-footer-item has-text-centered">
                        <span>
                            View my <a auto-id="href-linkedin"
                                       href="https://www.linkedin.com/in/michael-pereira-07/" rel="noopener"
                                       target="_blank">LinkedIn</a>
                        </span>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    pageSwitch(p) {
      this.$router.push(`${p}`);
    }
  },
  created(){
    document.title = 'Arc';

    if (this.$route.path !== '/') {
      this.$router.push('/')
    }
  }
};
</script>

<style>
#home {
  height: 100vh;
  align-items: center;
}
</style>
