<template>
  <section>
    Filter
  </section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/create">Create New Menu</router-link>
    </div>
    <ul v-if="hasMenus">
      <li v-for="menu in filteredMenus" :key="menu.id">
        {{ menu.itemName }} - Price: ${{ menu.price }}
      </li>
    </ul>
    <h3 v-else>No menus found</h3>
  </section>
</template>

<script>
export default {
  computed: {
    filteredMenus() {
      return this.$store.getters['menus/menus'];
    },
    hasMenus() {
      return this.$store.getters['menus/hasMenus'];
    }
  }
}
</script>