<template>
  <div id="home">
    <NavBar/>
    <div class="has-text-white mt-5">
      <div id="hero">
        <div class="columns has-text-centered is-centered is-multiline">
          <div class="column is-12-mobile is-12-tablet is-12-desktop is-6-widescreen is-6-fullhd">
            <img
                alt="Arc Logo"
                auto-id="img-logo"
                class="mt-6 pt-6"
                src="../assets/logo.webp"
                webp-fallback=".png"
                width="400"
            />
            <p class="has-text-white is-size-4 is-italic mt-5">Ultimate Protection, Reliable Service</p>
            <p class="is-size-3 mt-6 has-text-weight-bold my-6">Get started with Arc for <b class="arc-hl"><i>free</i></b>
              today!</p>
          </div>
          <div class="column">
            <lottie-player alt="Passwords List" autoplay background="transparent"
                           class="lottie" loop speed="1"
                           src="https://assets1.lottiefiles.com/packages/lf20_zhmxgdpy.json"
                           style="width: 650px; height: 650px;"></lottie-player>
          </div>
        </div>
        <div id="password-manager" class="section my-6">
          <div class="columns is-centered is-multiline">
            <div class="column">
              <lottie-player alt="Servers" autoplay background="transparent"
                             class="lottie" loop speed="1"
                             src="https://assets7.lottiefiles.com/packages/lf20_z3pnisgt.json"
                             style="width: 650px; height: 650px;"></lottie-player>
            </div>
            <div class="column is-12-mobile is-12-tablet is-12-desktop is-6-widescreen is-6-fullhd">
              <div class="section mx-6 mb-6 px-6">
                <p class="subtitle is-size-1 has-text-white mb-6">
                  <arc>Password Manager</arc>
                </p>
                <p class="is-size-4">Use Arc to store <b class="arc-hl">unlimited</b> passwords to help you keep
                  yourself
                  organized and safe.
                  <br/><br/> Our modern design brings elegance and ease when using our application. We hope to achieve
                  and
                  excel
                  passed a high standard of quality and provide excellent service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="security" class="section my-6">
        <div class="columns is-centered is-multiline">
          <div class="column is-12-mobile is-12-tablet is-12-desktop is-6-widescreen is-6-fullhd">
            <div class="section mx-6 mb-6">
              <p class="title is-size-1 has-text-white mb-6">
                <arc>Security</arc>
              </p>
              <p class="is-size-4">We use <b class="arc-hl">AWS Serverless</b> including Cloudfront, API Gateway, Lambda
                Edge Functions and DynamoDB to deliver the best industry standards.
                <br/><br/>Hashing includes <b class="arc-hl">HS256</b> along with a complex algorithm and a large salt
                level to provide the best protection possible.</p>
            </div>
          </div>
          <div class="column">
            <lottie-player autoplay background="transparent" class="lottie"
                           loop speed="1" src="https://assets2.lottiefiles.com/packages/lf20_ko8ud57v.json"
                           style="width: 650px; height: 650px;"></lottie-player>
          </div>
        </div>
      </div>
      <footer class="py-6 has-text-centered">
        <a href="https://ko-fi.com/michaelpereira" rel="noopener" target="_blank">
          <b-button class="is-dark has-text-weight-bold m-2">
          <span>
            <i class="fas fa-coffee"></i>
          </span>
          </b-button>
        </a>
        <a href="https://github.com/mwpereira/" rel="noopener" target="_blank">
          <b-button class="is-dark has-text-weight-bold m-2 has-text-white">
          <span>
            <i class="fab fa-github"></i>
          </span>
          </b-button>
        </a>
        <a href="https://www.linkedin.com/in/michael-pereira-07/" rel="noopener" target="_blank">
          <b-button class="is-dark has-text-weight-bold m-2 has-text-white">
          <span>
            <i class="fab fa-linkedin-in"></i>
          </span>
          </b-button>
        </a>
        <p class="is-size-6 is-italic my-5">Created By: Michael W. Pereira</p>
        <div class="container has-text-weight-bold is-size-7 mt-6 mb-3">
          <p>2021 © Arc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/home/NavBar";

export default {
  name: "Home",
  components: {NavBar},
  methods: {
    pageSwitch(p) {
      this.$router.push(`${p}`);
    }
  },
  created() {
    document.title = 'Arc';

    if (this.$route.path !== '/') {
      this.$router.push('/')
    }
  }
};
</script>

<style>
html #home {
  background: rgba(28, 51, 92, 0.98) none;
}

footer {
  background-color: #132546;
}

.arc-hl {
  color: #F28939;
}

.lottie {
  display: block;
  margin: auto;
}

#home {
  align-items: center;
}

arc {
  box-shadow: 0 8px 2px -2px #F28939;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    box-shadow: 0 8px 2px -2px #f2bb39;
  }
  to {
    box-shadow: 0 8px 2px -2px #c41919;
  }
}

@media screen and (max-width: 1408px) {
  .lottie {
    width: auto !important;
    height: auto !important;
  }
}

@media screen and (max-width: 1216px) {
  .lottie {
    width: 500px !important;
    height: 500px !important;
  }
}
</style>
