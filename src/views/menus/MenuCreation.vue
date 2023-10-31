<template>
  <base-card>
    <h1>Menu Creation</h1>
    <form @submit.prevent>
      <div class="form-control">
        <label for="menu">Menu</label>
        <input type="text" id="menu" v-model="itemName">
      </div>

      <div class="form-control">
        <label for="description">Description</label>
        <textarea v-model="description" placeholder="Describe the menu more!" id="description"></textarea>
      </div>

      <div class="form-control">
        <label for="price">Price</label>
        <input type="number" v-model="price" id="price">
      </div>

      <div class="form-control">
        <label>Types</label>
        <input type="checkbox" id="asian" v-model="menu.types" value="asian">
        <label for="asian">Asian</label>

        <input type="checkbox" id="western" v-model="menu.types" value="western">
        <label for="western">Western</label>
<!-- 
        <input type="checkbox" id="food" v-model="menu.types" value="Food">
        <label for="food">Food</label> -->

        <input type="checkbox" id="drink" v-model="menu.types" value="drink">
        <label for="drink">Drink</label>
      </div>

      <router-link to="/menus">
        <button @click="saveMenu">Save Menu</button>
      </router-link>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      itemName: '',
      description: '',
      price: 0,
      menu: {
        types: [],
      },
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
        types: this.menu.types,
        description: this.description,
        price: this.price,
      };
      // this.menus.unshift(newMenu);
      this.$store.dispatch('menus/saveMenu', newMenu);
      console.log(newMenu);
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  margin-bottom: 1rem;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
