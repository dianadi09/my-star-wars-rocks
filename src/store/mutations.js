import * as types from './mutation-types';

export default {
  [types.ADD_PLANETS] (state, payload) {
    state.planets = payload.planets;
  },
  [types.ADD_VEHICLES] (state, payload) {
    state.vehicles = payload.vehicles;
  },
};
