<template>
  <div class="container">
    <div class="title">Planets population - Tatooine, Alderaan, Naboo, Bespin, Endor</div>
    <chart></chart>
  </div>
</template>

<script>

import chart from "../components/chart";

export default {
  name: "Part2",
  components: {
    chart
  },

}
</script>

<style lang="scss" scoped>
.container {
  background-color: $star-wars-gray;
  color: white;
  position: absolute;
  left: 83px;
  right: 0;
  bottom: 0;
  top: 0;

  .title {
    text-align: center;
    margin-top: 25px;
    font-size: 17px;
  }
}

</style>