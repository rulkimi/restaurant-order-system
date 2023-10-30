<template>
  <base-card>
    <h2>Filter Menu</h2>
    <span class="filter-option">
      <input type="checkbox" id="asian" checked @change="setFilter"/>
      <label for="asian">Asian</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="western" checked @change="setFilter"/>
      <label for="western">Western</label>
    </span>
    <!-- <span class="filter-option">
      <input type="checkbox" id="food" checked @change="setFilter"/>
      <label for="food">Food</label>
    </span> -->
    <span class="filter-option">
      <input type="checkbox" id="drink" checked @change="setFilter"/>
      <label for="drink">Drink</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        asian: true,
        western: true,
        food: true,
        drink: true
      }
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>