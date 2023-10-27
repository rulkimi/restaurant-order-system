<template>
  <li>
    <h3>{{ itemName }}</h3>
    <h4>${{ price }}</h4>
    <div>
      <base-badge v-for="typez in types" :key="typez" :type="typez"></base-badge>
    </div>
    <!-- <div class="actions">
      <base-button link :to="viewDetailsLink" mode="outline">View details</base-button>
    </div> -->
  </li>
</template>

<script>
export default {
  props: ['id', 'itemName', 'price', 'types'],
  computed: {
    // viewDetailsLink() {
    //   return { name: 'menus-id', params: { id: this.id } };
    // },
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

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>