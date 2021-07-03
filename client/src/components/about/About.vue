<template>
  <div>
    <section>
      <h2 auto-id="header-panel" class="is-size-3 has-text-left mb-5">About</h2>
      <div class="columns is-multiline">
        <Creator/>
        <Arc/>
      </div>
    </section>
  </div>
</template>

<script>
import Arc from "@/components/about/Arc";
import Creator from "@/components/about/Creator";

export default {
  name: "About.vue",
  components: {Arc, Creator}
}
</script>
