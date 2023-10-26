<template>
  <li>
    <h3>{{ itemName }}</h3>
    <h4>${{ price }}</h4>
    <div>
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>
    <div class="actions">
      <router-link :to="viewDetailsLink">View details</router-link>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'itemName', 'price', 'areas'],
  computed: {
    viewDetailsLink() {
      return `${this.$route.path}/${this.id}`;
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
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>