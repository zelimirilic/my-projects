<template>
  <div class="home">
    <div>
      <img class="robot" src="../assets/robot-home.png" aria-hidden="true">
    </div>
    <div class="get-started">
      <router-link to="/home">Get Started</router-link> building your first robot!
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
  props: {
    msg:String,
  },
};
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
