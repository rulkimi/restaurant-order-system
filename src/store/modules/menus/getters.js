export default {
  menus(state) {
    return state.menus;
  },
  hasMenus(state) {
    return state.menus && state.menus.length > 0;
  }
}