export default {
  orders(state) {
    return state.orders;
  },
  hasOrders(state) {
    return state.orders && state.orders.length > 0;
  }
}