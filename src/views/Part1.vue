<template>
  <div class="container">
    <div class="title">Largest sum problem</div>
    <vehicles-data></vehicles-data>
  </div>
</template>

<script>
import VehiclesData from "../components/vehiclesData";
export default {
  name: "Part1",
  components: {VehiclesData},
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $star-wars-gray-2;
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