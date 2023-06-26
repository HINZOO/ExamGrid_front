<template>
  <div>
  <div  class="text-end m-2">
    <button class="btn btn-outline-secondary px-5 rounded-5" @click="fnGotoLink2">Link2</button>
  </div>
  <div class="tableWrapper">
    <form id="hiddenForm" name="hiddenForm" >
      <table id="ListTable" class="table table-bordered table-responsive text-center table-hover">
      <thead class="align-middle">
        <tr>
            <th scope="col" rowspan="2" id="noChk">No.</th>
            <th scope="col" rowspan="2">{{$t('Id')}} </th>
            <th scope="col" rowspan="2">{{$t('Name')}} </th>
            <th scope="col" rowspan="2">{{$t('Gender')}} </th>
            <th scope="col" colspan="2">{{$t('Location')}} </th>
        </tr>
        <tr>                
          <th scope="col">{{$t('Nation')}} </th>
          <th scope="col">{{$t('City')}} </th>
        </tr>
      </thead>
      <tbody id="loadCont" class="w-100 h-75 overflow-scroll">
          <tr>
            <td class="col">
              <span>{{ user.u_no }}</span>
            </td>
            <td class="col">
              <span>{{ user.u_id }}</span>
            </td>
            <td class="col">
              <span>{{ user.uname }}</span>
            </td>
            <td class="col">
              <span >{{ user.gender=='W'?'여자':'남자' }}</span>
            </td>
            <td class="col">
              <span>{{ user.nation }}</span>
            </td>
            <td class="col">
              <span>{{ user.city }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    
  </div>
</div>  
</template>

<script>

export default {
name: "Link00User",
components:{
},
props:{
  user: Object,
},
created(){

},
mounted(){

},
computed: {
},
data(){
return{
}
},
methods: {

  // fnGotoLink2(){
  //   this.$router.push({
  //     name: "Link1Page",
  //     params: {link1Uno:this.user.u_no}
  //   })
  // }

},
watch:{
}

}
</script>

<style>

</style>