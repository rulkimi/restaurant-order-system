export default {
  saveMenu(state, payload) {
    state.menus.unshift(payload);
  }
}