export default {
  async saveMenu(context, data) {
    const newMenu = {
      id: 'm30',
      itemName: data.itemName,
      types: data.types,
      description: data.description,
      price: data.price,
    };

    const response = await fetch('https://restaurant-system-760df-default-rtdb.asia-southeast1.firebasedatabase.app/menus.json', {
      method: 'PUT',
      body: JSON.stringify(newMenu)
    });

    //const responseData = await response.json();

    if (!response.ok) {
      //error
    }

    context.commit('saveMenu', newMenu);
  }
}