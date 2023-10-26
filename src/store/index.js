import { createStore } from 'vuex'

import MenusModule from './modules/menus/index.js';

const store = createStore({
  modules: {
    menus: MenusModule
  }
})

export default store;
