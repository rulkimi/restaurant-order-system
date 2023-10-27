<template>
  <li>
    <h3>{{ itemName }}</h3>
    <!-- <div>
      <base-badge v-for="typez in types" :key="typez" :type="typez"></base-badge>
    </div> -->
    <!-- <div class="actions">
      <base-button link :to="viewDetailsLink" mode="outline">View details</base-button>
    </div> -->
    <div class="price-and-quantity">
      <h4>${{ price }}</h4>
      <button v-if="this.amount" @click="removeOrder">-</button>
      <input type="number" v-model="amount"/>
      <button @click="addToOrder">+</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'itemName', 'price', 'types'],
  data() {
    return {
      amount: 0,
      order: [],
    };
  },
  computed: {
    // viewDetailsLink() {
    //   return { name: 'menus-id', params: { id: this.id } };
    // },
    orders() {
      return this.$store.getters['orders/orders'];
    },
    totalPrice() {
      return this.amount * this.price;
    },
  },
  watch: {
    amount(value) {
      if (value < 0) {
        this.amount = 0;
      }
    },
  },
  methods: {
    addToOrder() {
      this.amount++;
      const existingItem = this.orders.find(
        (item) => item.orderName === this.itemName
      );

      if (existingItem) {
        existingItem.amount++;
        existingItem.totalPrice = existingItem.amount * existingItem.price;
      } else {
        this.orders.push({
          itemId: this.id,
          orderName: this.itemName,
          types: this.types,
          price: this.price,
          amount: this.amount,
          totalPrice: this.totalPrice,
        });
      }

      console.log(this.orders);
    },
    removeOrder() {
      this.amount--;
      const existingItem = this.orders.find(
        (item) => item.orderName === this.itemName
      );

      if (existingItem.amount > 0) {
        existingItem.amount--;
        existingItem.totalPrice = existingItem.amount * existingItem.price;
      }
      console.log(this.orders);
    }
  },
};
</script>

<style scoped>
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

.price-and-quantity {
  display: flex;
  justify-content: space-between; /* This aligns price and input to the sides */
  align-items: center; /* This centers them vertically */
}

.price-and-quantity input {
  width: 40px; /* Adjust the width as needed */
  text-align: center; /* Center the text inside the input */
}

div {
  margin: 0.5rem 0;
}
</style>
