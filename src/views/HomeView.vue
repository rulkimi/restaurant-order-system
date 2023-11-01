<template>
  <!-- <div class="home">
    <router-link to="/menus">Menus</router-link>
  </div> -->
  <base-card>
    Welcome to the restaurant
    click <router-link to="/menus"><button>here</button></router-link> to order
  </base-card>
  <base-card>An admin? Click to <button @click="logAdmin">here</button> to login</base-card>
  <user-auth v-if="adminLog"></user-auth>
</template>

<script>
import UserAuth from './auth/UserAuth.vue';
export default {
  components: {
    UserAuth
  },
  data() {
    return {
      adminLog: false,
    };
  }, 
  methods: {
    logAdmin() {
      this.adminLog = true;
    }
  }
}
</script>

<style scoped>

</style>
