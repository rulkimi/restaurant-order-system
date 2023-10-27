import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

import menus from '../../../../menus.json'

export default {
  namespaced: true,
  state() {
    return {
      menus: menus
    };
  },
  mutations,
  actions,
  getters
}