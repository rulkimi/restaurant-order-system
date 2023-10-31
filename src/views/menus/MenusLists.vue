<template>
  <section>
    <menu-filter @change-filter="setFilters"></menu-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadMenus">Refresh</base-button>
        <base-button link to="/create">Create New Menu</base-button>
      </div>
      <form @submit.prevent>
        <router-link to="/orders">
          <base-button @click="placeOrders">
            Place Orders
          </base-button>
        </router-link>
        <ul v-if="hasMenus" class="two-columns">
          <menu-item
            v-for="menu in filteredMenus"
            :key="menu.id"
            :id="menu.id"
            :itemName="menu.itemName"
            :price="menu.price"
            :types="menu.types"
            @remove-order="removeOrder(menu.id)"
          ></menu-item>
        </ul>
        <h3 v-else>No menus found</h3>
      </form>
    </base-card>
  </section>
</template>

<script>
import MenuItem from '../../components/menus/MenuItem.vue';
import MenuFilter from '@/components/menus/MenuFilter.vue';

export default {
  components: {
    MenuItem,
    MenuFilter
  },
  data() {
    return {
      activeFilters: {
        asian: true,
        western: true,
        food: true,
        drink: true
      }
    }
  },
  computed: {
    filteredMenus() {
      //fix this - how to get it updated? - mutations?
      const menus = this.$store.getters['menus/menus'];
      return menus.filter(menu => {
        if (this.activeFilters.asian && menu.types.includes('asian')) {
          return true;
        }
        if (this.activeFilters.western && menu.types.includes('western')) {
          return true;
        }
        // if (this.activeFilters.food && menu.types.includes('food')) {
        //   return true;
        // }
        if (this.activeFilters.drink && menu.types.includes('drink')) {
          return true;
        }
        return false;
      });
    },
    hasMenus() {
      return this.$store.getters['menus/hasMenus'];
    },
    orders() {
      return this.$store.getters['orders/orders'];
    }
  },
  created() {
    this.loadMenus();
    this.loadOrders();
  },
  methods: {
    placeOrders() {
      console.log(this.orders);
      this.$store.dispatch('orders/placeOrder', this.orders);
      this.loadOrders();
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    removeOrder(menuId) {
      // Use findIndex to get the index of the order with the matching ID
      const index = this.orders.findIndex(order => order.itemId === menuId);

      if (index !== -1) {
        // If a matching order is found, remove it
        this.orders.splice(index, 1);
        console.log('Order removed:', menuId);
      }
    },
    loadMenus() {
      this.$store.dispatch('menus/loadMenus');
    },
    loadOrders() {
      this.$store.dispatch('orders/loadOrders');
    }
  }
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
