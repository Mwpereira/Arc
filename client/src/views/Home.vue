<template>
  <div id="home">
    <NavBar/>
    <div class="has-text-white mt-5">
      <div class="columns has-text-centered is-centered">
        <div class="column">
          <img
              alt="Arc Logo"
              auto-id="img-logo"
              class="mt-6 pt-6"
              src="../assets/logo.webp"
              webp-fallback=".png"
              width="400"
          />
          <p class="has-text-white is-size-4 is-italic mt-5">Ultimate Protection, Reliable Service</p>
          <p class="is-size-3 mt-6 has-text-weight-bold">Get started with Arc for <b class="arc-hl"><i>free</i></b>
            today!</p>
        </div>
        <div class="column">
          <lottie-player autoplay background="transparent"
                         loop speed="1" src="https://assets1.lottiefiles.com/packages/lf20_zhmxgdpy.json"
                         style="width: 700px; height: 700px; display: block; margin: auto;" alt="Passwords List"></lottie-player>
        </div>
      </div>
      <div id="password-manager" class="container section my-6">
        <div class="columns is-centered">
          <div class="column">
            <lottie-player autoplay background="transparent"
                           loop speed="1" src="https://assets4.lottiefiles.com/packages/lf20_Hpmbys.json"
                           style="width: 500px; height: 500px;" alt="Servers"></lottie-player>
          </div>
          <div class="column">
            <p class="subtitle is-size-1 has-text-white mb-6"><arc>Password Manager</arc></p>
            <p class="is-size-4">Use Arc to store <b class="arc-hl">unlimited</b> passwords to help you keep yourself organized and safe.
              <br/><br/> Our modern design brings elegance and ease when using our application. We hope to achieve and excel
              passed a high stand of quality and provide excellent service.</p>
          </div>
        </div>
      </div>
      <div id="security" class="container section my-6">
        <div class="columns is-centered">
          <div class="column">
            <p class="title is-size-1 has-text-white my-6"><arc>Security</arc></p>
            <p class="is-size-4">We use  <b class="arc-hl">AWS Serverless</b> including Cloudfront, API Gateway, Lambda Edge Functions and DynamoDB to deliver the best industry standards.
              <br/><br/>Hashing includes  <b class="arc-hl">HSA256</b> along with a complex algorithm and a large salt level to provide the best protection possible.</p>
          </div>
          <div class="column">
            <lottie-player autoplay background="transparent"
                           loop speed="1" src="https://assets2.lottiefiles.com/packages/lf20_ko8ud57v.json"
                           style="width: 700px; height: 700px;"></lottie-player>
          </div>
        </div>
      </div>
    <footer class="py-6 has-text-centered">
      <a href="https://ko-fi.com/michaelpereira" target="_blank" rel="noopener">
        <b-button class="is-primary has-text-weight-bold m-2">
          <span>
            <i class="fas fa-coffee"></i>
          </span>
        </b-button>
      </a>
      <a href="https://github.com/mwpereira/" target="_blank" rel="noopener">
        <b-button class="is-primary has-text-weight-bold m-2 has-text-white">
          <span>
            <i class="fab fa-github"></i>
          </span>
        </b-button>
      </a>
      <a href="https://www.linkedin.com/in/michael-pereira-07/" target="_blank" rel="noopener">
        <b-button class="is-primary has-text-weight-bold m-2 has-text-white">
          <span>
            <i class="fab fa-linkedin-in"></i>
          </span>
        </b-button>
      </a>
      <p class="is-size-5 is-italic my-6">Created By: Michael W. Pereira</p>
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
  background-image: none;
  background-color: #192d52;
}

footer {
   background-color: #132546;
}

.arc-hl {
  color: #F28939;
}

#home {
  align-items: center;
}

arc {
  box-shadow: 0 8px 2px -2px  #F28939;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    box-shadow: 0 8px 2px -2px  #F28939;
  }
  to {
    box-shadow: 0 8px 2px -2px #ff6a41;
  }
}
</style>
