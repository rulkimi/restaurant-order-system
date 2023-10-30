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
      <h4>${{ price.toFixed(2) }}/pc</h4>
      <div>
        <button v-if="this.amount" @click="removeOrder">-</button>
        <input type="number" v-model="amount"/>
        <button @click="addToOrder">+</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'itemName', 'price', 'types'],
  data() {
    //default amount is when theres no item found, we add 1 to the amount
    return {
      defaultAmount: 1,
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
      return this.defaultAmount * this.price;
    },
    amount: {
      get() {
        //get order amount from 'database'
        const orders = this.$store.getters['orders/orders'];
        // const existingItem = orders.find(
        //   (item) => item.itemId === this.id
        // );
        const existingItem = this.checkExistingItem();
        return existingItem ? existingItem.amount : 0;
      },
      set(value) {
        // To be implemented if needed
      },
    },
  },
  // watch: {
  //   amount(value) {
  //     if (value < 0) {
  //       this.amount = 0;
  //     }
  //   },
  // },
  methods: {
    checkExistingItem() {
      const existingItem = this.orders.find(
        (item) => item.itemId === this.id
      );
      return existingItem;
    },
    addToOrder() {
      this.amount++;
      // const existingItem = this.orders.find(
      //   (item) => item.itemId === this.id
      // );
      const existingItem = this.checkExistingItem();

      if (existingItem) {
        existingItem.amount++;
        existingItem.totalPrice = existingItem.amount * existingItem.price;
      } else {
        this.orders.push({
          itemId: this.id,
          orderName: this.itemName,
          types: Array.from(this.types),
          price: this.price,
          amount: this.defaultAmount,
          totalPrice: this.totalPrice,
        });
      }
      console.log(this.orders);
      this.$store.commit('orders/updateOrders', this.orders);
    },
    removeOrder() {
      this.amount--;
      // const existingItem = this.orders.find(
      //   (item) => item.itemId === this.id
      // );

      const existingItem = this.checkExistingItem();

      if (existingItem.amount > 0) {
        existingItem.amount--;
        existingItem.totalPrice = existingItem.amount * existingItem.price;
      } else {
        this.orders.splice()
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
  display: grid;
  grid-template-columns: 1fr 20px; /* Reversed the order of columns */
  align-items: center;
}

.price-and-quantity h4 {
  text-align: left; /* Align the price to the left */
}

.price-and-quantity div {
  display: flex;
  justify-content: flex-end; /* Align the button and input to the right */
}


.price-and-quantity input {
  width: 40px; /* Adjust the width as needed */
  text-align: center; /* Center the text inside the input */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
