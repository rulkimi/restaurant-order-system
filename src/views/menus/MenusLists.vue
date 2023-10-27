<template>
  <section>Filter</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/create">Create New Menu</base-button>
      </div>
      <ul v-if="hasMenus" class="two-columns">
        <menu-item
          v-for="menu in filteredMenus"
          :key="menu.id"
          :id="menu.id"
          :itemName="menu.itemName"
          :price="menu.price"
          :types="menu.types"
        ></menu-item>
      </ul>
      <h3 v-else>No menus found</h3>
    </base-card>
  </section>
</template>

<script>
import MenuItem from '../../components/menus/MenuItem.vue';

export default {
  components: {
    MenuItem,
  },
  computed: {
    filteredMenus() {
      return this.$store.getters['menus/menus'];
    },
    hasMenus() {
      return this.$store.getters['menus/hasMenus'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
