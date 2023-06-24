<template>
  <div>
    <Header/>
    <RouterView/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import RouterView from 'vue-router'
export default {
  name: 'App',
  components: {
    Header,RouterView
  }
}
</script>

<style>
</style>