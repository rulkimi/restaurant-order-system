import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

import orders from '../../../../orders.json'

export default {
  namespaced: true,
  state() {
    return {
      orders: orders
    };
  },
  mutations,
  actions,
  getters
}