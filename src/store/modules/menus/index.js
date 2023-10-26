import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      menus: [
        {
          id: 'm1',
          itemName: 'Burger',
          types: ['western', 'food'],
          description:
            "An exceptionally delicious burger with a slice of yummy cheese that would give you an excellent experience",
          price: 30
        },
        {
          id: 'm2',
          itemName: 'Noodle',
          types: ['asian', 'food'],
          description:
            "A braised beef noodle that's specially hand-made by our chefs that would make you feel home -- It is cheap too!",
          price: 15
        },
        {
          id: 'm3',
          itemName: 'Fizzy',
          types: ['drink'],
          description:
            "A drink that would make you brain brzzzz k-booom zoo wee mama!",
          price: 8
        }
      ]
    };
  },
  mutations,
  actions,
  getters
}