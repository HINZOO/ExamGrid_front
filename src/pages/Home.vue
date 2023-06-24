<template>
  <div class="home container">
    <h3 class="mt-3">[Front] vue.js</h3>
    <h3>[Back] SpringFrameWork</h3>
    <h3>[DB] Oracle</h3>
    <ul>
      <li v-for="(item,idx) in state.items" :key="idx">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';

export default {
  name: "Home",
  setup(){
    const state=reactive({
      items:[]
    })
    axios.get("/api/items").then(({data})=>{
      console.log(data);
      state.items=data;
    })
    return {state}
  },
  mounted() {
    //this.mySelect.multiselect();
  },
}
</script>

<style>

</style>