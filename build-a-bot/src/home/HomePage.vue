<template>
  <div class="home">
    <div>
      <img class="robot" src="../assets/robot-home.png" aria-hidden="true">
    </div>
    <div class="get-started">
      <a href>Get Started</a> building your first robot!
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HomePage extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- "scoped" attribute is adding because I would like to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  text-align: center;
}
.robot {
  height: 300px;
}
</style>
