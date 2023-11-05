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
    try {
      for (const order of payload) {
        const response = await fetch(`http://localhost:3000/orders/${order.itemId}`, {
          method: 'PUT',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Request failed with status', response.status);
        }
      }
      // so the order will auto update??
      await context.dispatch('loadOrders');
    } catch (err) {
      console.log('error: ', err);
    }
  },
  async loadOrders(context, payload) {
    const response = await fetch('http://localhost:3000/orders');

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