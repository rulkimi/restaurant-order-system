<template>
  <span class="badge" :class="type">{{ type }}</span>
</template>

<script>
export default {
  props: ['type']
}
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.western {
  background-color: #3d008d;
  color: white;
}

.asian {
  background-color: #71008d;
  color: white;
}

.drink {
  background-color: #00818d;
  color: white;
}

.food {
  background-color: #8d006e;
  color: white;
}
</style>