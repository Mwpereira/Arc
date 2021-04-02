<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        document.title = 'Arc';
    }
};
</script>

<style lang="scss">
body,
button,
input,
optgroup,
select,
label,
textarea {
    font-family: 'Montserrat', sans-serif;
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
</style>
