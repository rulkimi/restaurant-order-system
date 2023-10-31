export default {
  addOrder(context, payload) {
    const newOrder = {
      itemId: payload.itemId,
      orderName: payload.orderName,
      types: payload.types,
      price: payload.price,
      amount: payload.amount,
      totalPrice: payload.totalPrice,
    }

    context.commit('addOrder', newOrder);
  },
  async placeOrder(context, payload) {
    const response = await fetch('https://restaurant-system-760df-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },
  async loadOrders(context, payload) {
    const response = await fetch('https://restaurant-system-760df-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json');

    const responseData = await response.json();

    const orders = [];

    for (const key in responseData) {
      const order = {
        itemId: responseData[key].itemId,
        amount: responseData[key].amount,
        orderName: responseData[key].orderName,
        types: responseData[key].types,
        totalPrice: responseData[key].totalPrice,
        price: responseData[key].price,
      };
      orders.push(order);
    }

    context.commit('updateOrders', orders);
  }
}