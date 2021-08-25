<template>
  <div class="tableContainer">
    <div v-if="isLoading" class="loader">Sorry, the data is being processed!Please wait...</div>
    <div v-else class="contentTable">
      <div class="row">
        <div class="tableItem">Vehicle name with the largest sum</div>
        <div>{{vehicleNameWithLargestSum}}</div>
      </div>
      <div class="row">
        <div class="tableItem">Related home planets and their<br/> respective population</div>
        <div v-html="relatedPilotPlanetMessage"></div>
      </div>
      <div class="row">
        <div class="tableItem">Related pilot names</div>
        <div v-html="relatedPilotNamesMessage"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "vehiclesData",
  computed: {
    ...mapGetters(['getVehicles']),
    vehiclesData() {
      return this.getVehicles();
    },
  },
  created() {
    this.isLoading = true;
    this.fetchData();
  },
  methods: {
    ...mapActions(['fetchAllForVehicles']),
    fetchData() {
      this.fetchAllForVehicles().then(() => {
        this.calculateTableData();
        this.isLoading = false;
      });
    },
    preparePilotsDataMessages(pilotsData) {
      pilotsData.forEach((pilot) => {
        this.relatedPilotPlanetMessage += 'planet: ' + pilot.planet + '<br/> ' + 'population: ' + pilot.population + '<br/> ';
        this.relatedPilotNamesMessage += 'name: ' + pilot.name + '<br/> ';
      });
    },
    calculateTableData() {
      if(!this.vehiclesData) {
        return 0;
      }
      let largestSum = 0;
      let vehicleNameWithLargestSum;
      let relatedPilots = [];
      this.vehiclesData.forEach((vehicle) => {

        let pilotsData = vehicle.pilotsData;
        let popSum = 0;
        //search pilots biggest population
        pilotsData.forEach((pilot) => {
          popSum+= Number(pilot.population);
        });

        if(popSum > largestSum) {
          largestSum = popSum;
          vehicleNameWithLargestSum = vehicle.name;
          relatedPilots = pilotsData;
        }

      });

      this.vehicleNameWithLargestSum = vehicleNameWithLargestSum;
      this.preparePilotsDataMessages(relatedPilots);
    }
  },
  data() {
    return {
      isLoading: false,
      vehicleNameWithLargestSum: null,
      relatedPilotPlanetMessage: '',
      relatedPilotNamesMessage: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  margin-top: 30px;
  font-size: 25px;
}
.contentTable {
  width: 800px;
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: -400px;
  .row {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    border: 1px solid white;

    .tableItem {
      font-weight: bold;
    }

    div {
      padding: 10px;
      width: 400px;
      border: 1px solid white;
      border-bottom: initial;
      border-top: initial;
    }
  }
}

</style>