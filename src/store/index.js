import { createStore } from 'vuex'

import MenusModule from './modules/menus/index.js';
import OrdersModule from './modules/orders/index.js';
import AuthModules from './modules/auth/index.js';

const store = createStore({
  modules: {
    menus: MenusModule,
    orders: OrdersModule,
    auth: AuthModules
  }
})

export default store;
