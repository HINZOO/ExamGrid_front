<template>
  <div class="home container">
    <h3 class="mt-3">[Front] vue.js</h3>
    <h3>[Back] SpringFrameWork</h3>
    <h3>[DB] Oracle</h3>
    <ul>
      <li v-for="(item,idx) in state.items" :key="idx">{{ item }}</li>
    </ul>
    <button @click="changeLocale">{{ $t('title') }}</button>

  </div>
</template>

<script>
//https://velog.io/@alsdud116/vue3-i18n-%EC%A0%81%EC%9A%A9 (다국어전용 아주 좋았던 참고사이트.)
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
  methods:{
    changeLocale() {
      if (this.$i18n.locale === 'en') return (this.$i18n.locale = 'ko')
      this.$i18n.locale = 'en'
    }
  },
  mounted() {
    //this.mySelect.multiselect();
  },
}
</script>

<style>

</style>