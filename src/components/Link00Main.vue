<template>
  <div>
    
    <h1>Grid</h1>
    <div id="FullContain" class="border border-secondary w-85 mx-auto p-4">
     <Link00Form
        @isLink="fnIsLink"
        @userData="fnUserDataByLink" 
        v-if="this.isLink==false" />
     <Link00User 
      v-if="this.isLink"
      :user="this.userData"
     /> 
    </div>

  </div>
</template>

<script>
import Link00Form from '@/components/Link00Form.vue';
import Link00User from '@/components/Link00User.vue';


export default {
  name: "Link00Main",
  components: { 
    Link00Form,
    Link00User
  },
  data(){
    return{
      isLink: false,
      // InLink1: false,
      // InLink2: false
      userData:{}
    }
  },
  methods:{
    fnIsLink(isLink){
      this.isLink=isLink;
    },
    fnUserDataByLink(userData){
      this.userData=userData;
    }
  },
  computed: {
  }
};
</script>