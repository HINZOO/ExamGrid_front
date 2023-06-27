<template>
  <div class="tableWrapper">
    <form id="hiddenForm" name="hiddenForm" >
      <table id="ListTable" class="table table-bordered table-responsive text-center table-hover">
      <thead class="align-middle">
        <tr>
            <th scope="col" rowspan="2" >{{$t('Choice')}} </th>
            <th scope="col" rowspan="2">{{$t('JOB')}} </th>
            <th scope="col" rowspan="2">{{$t('HOBBY')}} </th>
            <th scope="col" rowspan="2">{{$t('IsMarried')}} </th>
            <th scope="col" colspan="2">{{$t('FavoriteFood')}} </th>
        </tr>
        <tr>                
          <th scope="col">{{$t('Category')}} </th>
          <th scope="col">{{$t('Type')}} </th>
        </tr>
      </thead>
      <tbody id="loadCont" class="w-100 h-75 overflow-scroll">
          <AddRow
            v-if="this.addrow"
            @row-userdata="RowUserData"
          />
          <tr scope="row" @dblclick="fnModify(user.u_no)" >
            <td >
              <input type="checkbox" name="u_no" v-model="indexArr" :value="user.u_no" @change="arrayChk()">
            </td>
            <td class="col">
              <span>{{ user.job!=null?user.job:'미정' }}</span>
            </td>
            <td class="col">
              <span>{{ user.hobby!=null?user.hobby:'미정'}}</span>
            </td>
            <td class="col">
              <span >{{ user.ismarried=='1'?'O':'X' }}</span>
            </td>
            <td class="col">
              <span>{{ user.foodcate!=null?user.foodcate:'미정' }}</span>
            </td>
            <td class="col">
              <span>{{ user.foodtype!=null?user.foodtype:'미정'}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>
<script>

import AddRow from '@/components/Link00AddRow.vue'

export default {
  name: "Link02TableList",
  components:{
    AddRow,
  },
  props:{
    user:Object,
    addrow:Boolean,
  },
  created(){

  },
  mounted(){
    this.users=this.user
  },
  computed(){
    this.users=this.user
  },
  data(){
    return{
      indexArr:[],
      addRowUser:{},
      modifyUserNo:'',
      users:this.user
    }
  },
  methods: {
    arrayChk(){
      this.$emit("delchk",this.indexArr)
    },
    fnModify(user){
      this.modifyUserNo=user;
      this.$emit("modifyUserNo",this.modifyUserNo)
      console.log(this.modifyUserNo);
    },
    RowUserData(userData){
      //addrow로 부터 입력된 유저 데이터 받아옴
      this.addRowUser = userData;
      this.sendUserDataToParent();
    },
 
   },
   watch:{
    addRowUser() {
    // addRowUser 데이터가 변경될 때마다 sendUserDataToParent() 메서드 호출
    this.sendUserDataToParent();
   }
  }
}
</script>

<style>

</style>