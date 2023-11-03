export default {
  async saveMenu(context, data) {
    const newMenu = {
      itemId: data.id,
      itemName: data.itemName,
      types: data.types,
      description: data.description,
      price: data.price,
    };

    const response = await fetch('http://localhost:3000/menus', {
      method: 'POST',
      body: JSON.stringify(newMenu),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    console.log(response)
    console.log(responseData);

    //const responseData = await response.json();

    if (!response.ok) {
      //error
    }

    context.commit('saveMenu', newMenu);
  },
  async loadMenus(context, payload) {
    const response = await fetch('http://localhost:3000/menus');

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