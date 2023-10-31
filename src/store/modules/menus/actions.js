export default {
  async saveMenu(context, data) {
    const id = data.id;
    const newMenu = {
      itemName: data.itemName,
      types: data.types,
      description: data.description,
      price: data.price,
    };

    const response = await fetch(`https://restaurant-system-760df-default-rtdb.asia-southeast1.firebasedatabase.app/menus/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(newMenu)
    });

    //const responseData = await response.json();

    if (!response.ok) {
      //error
    }

    context.commit('saveMenu', newMenu);
  },
  async loadMenus(context, payload) {
    const response = await fetch('https://restaurant-system-760df-default-rtdb.asia-southeast1.firebasedatabase.app/menus.json');

    const responseData = await response.json();

    if (!response.ok) {
      // ...
    }

    const menus = [];

    for (const key in responseData) {
      const menu = {
        id: key,
        itemName: responseData[key].itemName,
        types: responseData[key].types,
        description: responseData[key].description,
        price: responseData[key].price,
      };
      menus.push(menu);
    }

    context.commit('setMenus', menus);
  }
}