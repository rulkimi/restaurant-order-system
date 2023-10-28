<template>
  <h1>Menu creation</h1>
  <form @submit.prevent>
    <!-- <input type="text"> -->
    <input type="text" v-model="itemName">
    <textarea v-model="description" placeholder="Describe the menu more!"></textarea>
    <input type="number" v-model="price">
    <button @click="saveMenu">
      <router-link to="/menus">Save menu</router-link>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      itemName: '',
      description: '',
      price: 0
    };
  },
  computed: {
    menus() {
      return this.$store.getters['menus/menus'];
    },
  },
  methods: {
    saveMenu() {
      const newMenu = {
        id: 'm30',
        itemName: this.itemName,
        types: 'null',
        description: this.description,
        price: this.price
      }
      this.menus.push(newMenu);
    }
  }
}
</script>