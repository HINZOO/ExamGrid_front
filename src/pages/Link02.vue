<template>
  <div class="list container my-4">
    <Link02Form 
    :USER="user"
    />
  </div>
</template>

<script>
import Link02Form from '@/components/Link02Form.vue';

export default {
  name: "Link02",
  components: {
    Link02Form
  },
  props:{
    linkUno:String
  },
  data() {
    return {
      u_no: '',
      user:{}
    }
  },
  mounted() {
    this.fnUserList();
  },
  methods:{
    fnUserList(){
      let apiUrl ='/api/user';
      this.$axios.post(apiUrl, { u_no: this.u_no }, { headers: { 'Content-Type': 'application/json' } })
      .then(({ data }) => {
        this.user=data;
      })
      .catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
         alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
        } 
      });
    }

  },
  created() {
    this.u_no = this.$route.params.linkUno;
  }
}
</script>

<style>
</style>