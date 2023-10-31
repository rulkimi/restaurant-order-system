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
  }
}