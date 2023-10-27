<template>
  <ul>
    <li v-for="order in orders" :key="order.itemId">{{ order.orderName }}</li>
  </ul>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.getters['orders/orders'];
    }
  }
}
</script>