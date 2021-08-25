export default {
    getPlanets: (state) => () => state.planets,
    getVehicles: (state) => () => state.vehicles,
};
