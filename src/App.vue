<template>
  <div>
    <Navbar />

    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Login from './views/Login.vue'

export default {
  components: {
    Navbar
  }
};
</script>

<style>
/* Add your global styles here */
</style>
