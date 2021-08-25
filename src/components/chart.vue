<template>
  <div class="chartContainer">
    <div v-if="loading" class="loadingMessage">Sorry,the data isn't ready yet</div>
    <div class="content" v-else>
      <div v-for="item in updatedPlanetsData" :key="item.name">
        <div class="chartItem">
          <chart-bar :color="item.color" :value="item.population" :height="getChartHeightInPercentage(maxPlanetPopulation, item.population)"></chart-bar>
          <div class="chartTitle">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chartBar from "../components/chartBar";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "chart",
  components:{
    chartBar
  },
  created () {
    this.fetchData();
  },
  computed: {
    ...mapGetters(['getPlanets']),
    getRelevantPlanets() {
      let planetsData = this.getPlanets().slice();
      let planetsArr = [];
      for(let planet in planetsData) {
        // eslint-disable-next-line no-prototype-builtins
        if(this.chartPlanets.hasOwnProperty(planetsData[planet].name)) {
          planetsArr.push(planetsData[planet]);
        }
      }
      return planetsArr;
    },
    updatedPlanetsData() {
      let planetsData = this.getRelevantPlanets;
      let chartData = [];
      for(let planet in planetsData) {
        chartData.push({
          color: this.chartPlanets[planetsData[planet].name].chartColor,
          population: planetsData[planet].population,
          name: planetsData[planet].name
        });
      }
      return chartData;
    }
  },
  watch: {
    getRelevantPlanets: function (list) {
      this.maxPlanetPopulation = Math.max.apply(
          Math,
          list.map(function (data) {
            return Number(data.population);
          }),
      );
    },
  },
  methods: {
    ...mapActions(['fetchPlanets']),
    getChartHeightInPercentage(type = 'maxPlanetPopulation', population) {
      let res = Number((population / type) * 100);
      //normalize data
      return res > 0 && res < 5 ? 5 : res;
    },
    fetchData () {
      this.loading = true;
      this.fetchPlanets().then(() => {
        this.loading = false;
      });
    },
  },
  data() {
    return {
      loading: false,
      maxPlanetPopulation: 0,
      chartPlanets: {
        'Tatooine': {
          chartColor: '#9482EB'
        },
        'Alderaan': {
          chartColor: '#8FF662'
        },
        'Naboo': {
          chartColor: '#F66299'
        },
        'Bespin': {
          chartColor: '#DDF662'
        },
        'Endor': {
          chartColor: '#4634EF'
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.chartContainer {
 position: absolute;
  left: 50%;
  margin-left: -400px;
  top: 200px;
 .content {
   width: 800px;
   display: flex;
   align-items: center;
   flex-direction: row;
   justify-content: space-between;
   text-align: center;

   .chartTitle {
     margin-top: 20px;
   }
 }
}

</style>