<template>
  <div class="barContainer">
    <div class="value" :style="{'bottom': getValueLocation}">{{ value }}</div>
    <div class="bar" :style="{'height':  height ? height + '%' : '100%', 'background-color': color}"></div>
  </div>
</template>

<script>
export default {
  name: "chartBar",
  props: {
    color: {
      type: String,
      required: false,
      default: ''
    },
    height: {
      type: Number,
      required: true,
      default: 0
    },
    value: {
      type: String,
      required: false
    }
  },
  computed: {
    getValueLocation() {
      //bar and bar's value are both in absolute position,give value a 5% more height
      return this.height === 100 ? 'initial' : (this.height + 5) + '%';
    }
  }
}
</script>

<style lang="scss" scoped>
.barContainer {
  height: 350px;
  position: relative;

  .bar {
    max-height: 300px;
    width: 120px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .value {
    position: absolute;
  }
}
</style>