<template>
  <li @click="addToOrder">
    <h3>{{ itemName }}</h3>
    <!-- <div>
      <base-badge v-for="typez in types" :key="typez" :type="typez"></base-badge>
    </div> -->
    <!-- <div class="actions">
      <base-button link :to="viewDetailsLink" mode="outline">View details</base-button>
    </div> -->
    <div class="price-and-quantity">
      <h4>${{ price }}</h4>
      <input type="number" v-model="amount" @click.stop>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'itemName', 'price', 'types'],
  data() {
    return {
      amount: 0
    };
  },
  computed: {
    // viewDetailsLink() {
    //   return { name: 'menus-id', params: { id: this.id } };
    // },
  },
  watch: {
    amount(value) {
      if (value < 0) {
        this.amount = 0;
      }
    }
  },
  methods: {
    addToOrder() {
      this.amount++;
    }
  }
}
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
