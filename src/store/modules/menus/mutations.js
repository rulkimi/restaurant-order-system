export default {
  saveMenu(state, payload) {
    state.menus.unshift(payload);
  },
  setMenus(state, payload) {
    state.menus = payload;
  }
}