/* eslint-disable consistent-return */
import axios from 'axios';
import * as types from './mutation-types';

axios.defaults.baseURL = 'https://swapi.dev/api/';

async function fetchPilotsDataHelper(vehicle) {
    let pilots = vehicle.pilots;
    let pilotsData = [];

    let reqArr = [];
    pilots.forEach((pilot) => {
        reqArr.push(axios.get(pilot));
    });

    return axios.all(reqArr).then(axios.spread((...responses) => {
        let promises = [];
        responses.forEach((response) => {
            //promises.push(getPlanetsInfo(response, pilotsData));
            promises.push(fetchPlanetDataHelper(response, pilotsData));
        });

        return Promise.all(promises).then(() => {
            vehicle.pilotsData = pilotsData;
            //not relevant anymore
            delete(vehicle.pilots);
        });
    })).catch((error) => error);
}

async function fetchPlanetDataHelper(dataToFetch, pilotsData) {
    const pilot = dataToFetch.data;
    const planetUrl = pilot.homeworld;

    return axios.get(planetUrl).then((res) => {
        const planetInfo = res.data;
        pilotsData.push({
            name: pilot.name,
            planet: planetInfo.name,
            population: planetInfo.population
        });
    });
}


export default {
    async fetchPlanets(context) {
        // If data is already fetched then skip
        if (context.state.planets.length === 0) {
            return axios.get(`planets/`).then((response) => {
                const planets = response.data && response.data.results ? response.data.results : [];

                context.commit({
                    type: types.ADD_PLANETS,
                    planets
                });

            }).catch((error) => error);
        }
    },
    async fetchAllForVehicles(context) {
        // If data is already fetched then skip
        if (context.state.vehicles.length === 0) {
            return axios.get(`vehicles/`).then((response) => {
                let vehicles = response.data && response.data.results ? response.data.results : [];

                let relevantVehicles = [];
                for (let vehicle in vehicles) {
                    let currVehicle = vehicles[vehicle];
                    // eslint-disable-next-line no-prototype-builtins
                    if (currVehicle.hasOwnProperty('pilots') && currVehicle.pilots.length > 0) {
                        relevantVehicles.push({
                            name: currVehicle.name,
                            pilots: currVehicle.pilots
                        });
                    }
                }

                return relevantVehicles;

            }).then((vehicles) => {
                return context.dispatch('fetchPilots', vehicles);
            }).catch((error) => error);
        }
    },
    async fetchPilots(context, vehicles) {
        let promises = [];
         vehicles.forEach((vehicle) => {
            promises.push(fetchPilotsDataHelper(vehicle));
        });

         //when ALL data is ready
        return Promise.all(promises).then(() => {
            context.commit({
                type: types.ADD_VEHICLES,
                vehicles
            });
        });
    },
};
