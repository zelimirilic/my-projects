<template>
  <div class="content">
    <div class="preview">
      <div class="preview-content">
        <div class="top-row">
          <img :src="selectedRobot.head.src">
        </div>
        <div class="middle-row">
          <img :src="selectedRobot.leftArm.src" class="rotate-left">
          <img :src="selectedRobot.torsos.src">
          <img :src="selectedRobot.rightArm.src" class="rotate-right">
        </div>
        <div class="bottom-row">
          <img :src="selectedRobot.bases.src">
        </div>
          <button class="add-to-cart" v-on:click="addToCart()">Add to Cart</button>
      </div>
    </div>
    <div class="top-row">
      <!--<div class="robot-name">
              {{selectedRobot.head.title}}
              <span v-show="selectedRobot.head.onSale" class="sale">Sale!</span>
      </div>-->
      <PartSelector
        v-bind:partovi="robotParts.heads"
        position="top"
        v-on:partSelected="part => selectedRobot.head=part"
      />
    </div>
    <div class="middle-row">
      <PartSelector
        v-bind:partovi="robotParts.arms"
        position="left"
        v-on:partSelected="part => selectedRobot.leftArm=part"
      />
      <PartSelector
        v-bind:partovi="robotParts.torsos"
        position="center"
        v-on:partSelected="part => selectedRobot.torsos=part"
      />
      <PartSelector
        v-bind:partovi="robotParts.arms"
        position="right"
        v-on:partSelected="part => selectedRobot.rightArm=part"
      />
    </div>
    <div class="bottom-row">
      <PartSelector
        v-bind:partovi="robotParts.bases"
        position="bottom"
        v-on:partSelected="part => selectedRobot.bases=part"
      />
    </div>
    <div>
      <h1 class="cart">Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="price">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" v-bind:key="index">
            <td>{{robot.head.title}}</td>
            <td class="price">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import robotParts from "../data/parts.js";
import parts from "../data/parts.js";
import PartSelector from "./PartSelector.vue";

export default {
  name: "RobotBuilder",
  components: { PartSelector },
  data() {
    return {
      robotParts,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        torsos: {},
        rightArm: {},
        bases: {}
      }
    };
  },
  computed: {},
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost =
        robot.head.cost +
        robot.leftArm.cost +
        robot.torsos.cost +
        robot.rightArm.cost +
        robot.bases.cost;
      this.cart.push(Object.assign({}, robot, { cost }));
    }
  }
};
</script>

<style>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.part img {
  width: 165px;
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  right: 5px;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}
td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.price {
  text-align: right;
}
.cart {
  text-align: left;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>


