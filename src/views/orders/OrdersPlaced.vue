<template>
  <base-card>
    <ul>
      <li v-for="order in orders" :key="order.itemId">
        <div class="container">
          <h4>{{ order.orderName }}</h4>
          <div>
            ({{ order.amount }}
            x
            ${{ order.price.toFixed(2) }})
            Price:
            ${{ order.totalPrice.toFixed(2) }}
          </div>
        </div>
      </li>
    </ul>
    <router-link to="/menus">
      <base-button>Edit orders</base-button>
    </router-link>
    <div class="total-price">
      Total: ${{ ordersTotalPrice.toFixed(2) }}
    </div>
  </base-card>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.getters['orders/orders'];
    },
    ordersTotalPrice() {
      let total = 0;
      this.orders.forEach(item => {
        total += item.totalPrice;
      });
      return total;
    }
  },
  created() {
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      this.$store.dispatch('orders/loadOrders');
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
}

li:hover {
  background-color: rgb(226, 226, 226);
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

.container {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Reversed the order of columns */
  align-items: center;
}

.container {
  text-align: left; /* Align the price to the left */
}

.container div {
  display: flex;
  justify-content: flex-end; /* Align the button and input to the right */
}

.base-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.total-price {
  font-weight: bold;
  font-size: 2rem;
  align-self: flex-end;
  text-align: right;
  margin-top: 1rem; /* Adjust the margin as needed */
  margin-right: 0.5rem;
}
</style>