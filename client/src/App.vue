<template>
  <div id="app">
    <router-view/>
    <div v-if="showNotification">
      <b-notification
          id="notification"
          type="is-info"
          aria-close-label="Close notification"
      >
        Our site uses cookies to provide you the best service and experience. We
        store these cookies with advanced encryption to ensure the strongest
        security and protection.
      </b-notification>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => {
    return {
      showNotification: true
    };
  },
  mounted() {
    document.title = 'Arc';
  },
  created() {
    if (localStorage.getItem("readCookiesNotfication") === "true") {
      this.showNotification = false;
    } else {
      localStorage.setItem("readCookiesNotfication", "true");
    }
  }
};
</script>

<style lang="scss">
html {
  height: 100vh;
  background-image: url('assets/img/background.webp');
  background-position: top;
  background-repeat: repeat;
  background-size: cover;
}


body,
button,
input,
optgroup,
select,
label,
textarea {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  height: 100vh;
}

h2 {
  font-size: 32px;
}

#notification {
  position: fixed;
  width: 400px;
  right: 10px;
  bottom: 10px;
  text-align: left;
  opacity: 0.85;
  z-index: 100;
}

@media screen and (max-width: 1024px) {
  #leftPanel {
    visibility: hidden;
  }
}
</style>
