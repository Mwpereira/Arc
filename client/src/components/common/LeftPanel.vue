<template>
  <div>
    <Menu/>
  </div>
</template>

<script>
import Menu from "@/components/common/Menu";

export default {
  name: "LeftPanel",
  components: {Menu},
}
</script>

<style scoped>
div {
  background-color: #192d52;
  min-height: 100vh;
  height: 100%;
  min-width: 160px;
}
</style>
