export default {
  saveMenu(context, data) {
    const newMenu = {
      id: 'm30',
      itemName: data.itemName,
      types: data.types,
      description: data.description,
      price: data.price,
    };

    context.commit('saveMenu', newMenu);
  }
}