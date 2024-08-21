<template>
  <Navbar />
  <div>
    <router-view />
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import Navbar from './components/Navbar.vue';

const isAuthenticated = ref(!!localStorage.getItem('jwt'));
provide('isAuthenticated', isAuthenticated);

export default {
  components: {
    Navbar
  }
};
</script>

<style>
</style>
