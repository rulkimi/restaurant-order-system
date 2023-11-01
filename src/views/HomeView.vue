<template>
  <!-- <div class="home">
    <router-link to="/menus">Menus</router-link>
  </div> -->
  <user-auth></user-auth>
</template>

<script>
import UserAuth from './auth/UserAuth.vue';
export default {
  components: {
    UserAuth
  }
}
</script>
