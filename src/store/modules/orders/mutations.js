export default {
  updateOrders(state, payload) {
    state.orders = payload;
  },
  addOrder(state, payload) {
    state.orders.push(payload);
  },
  setOrders(state, payload) {
    state.orders = payload;
  }
}