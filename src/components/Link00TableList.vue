<template>
      <div class="tableWrapper">
        <form id="hiddenForm" name="hiddenForm" >
          <table id="ListTable" class="table table-bordered table-responsive text-center table-hover">
          <thead class="align-middle">
            <tr>
                <th scope="col" rowspan="2" id="noChk">{{$t('Choice')}} </th>
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
              <AddRow
                v-if="this.addrow"
                @row-userdata="RowUserData"
              />
              <tr scope="row" v-for="(user,idx) in  paginatedData" :key="idx" @dblclick="fnModify(user)" >
                <td >
                  <input type="checkbox" name="u_no" v-model="indexArr" :value="user.u_no" @change="arrayChk()">
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
                  <!-- <span v-for="city in user.city" :key="city">{{ city }}</span> -->
                  <span>{{ user.city }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <div class="btn-cover text-center">
          <button :disabled="pageNum === 0" @click="prevPage" class="btn btn-sm btn-secondary me-2">
            {{$t('Prev')}}
          </button>
          <a v-for="(idx) in pageCount" :key="idx" @click="goToPage(idx - 1)" :class="{ active: idx === pageNum + 1 }" class="mx-1 btn btn-link text-secondary">{{ idx }}</a>
          <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn btn-sm btn-secondary ms-2">
            {{$t('Next')}}
          </button>
        </div>

      </div>
</template>
<script>

import AddRow from '@/components/Link00AddRow.vue'

export default {
  name: "Link00TableList",
  components:{
    AddRow,

  },
  props:{
    usersList:Array,
    addrow:Boolean,
   // modalOpen:Boolean,
    pageSize: {
      type: Number,
      required: false,
      default: 5
    }
  },
  created(){

  },
  mounted(){
    this.users=this.usersList

   
  },
  computed: {
    pageCount () {
      let listLeng = this.usersList.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      return this.usersList.slice(start, end);
    }
  },
  data(){
    return{
      indexArr:[],
      addRowUser:{},
      modifyUserNo:'',
      pageNum: 0
    }
  },
  methods: {
    arrayChk(){
      this.$emit("delchk",this.indexArr)
    },
    fnModify(user){
      this.modifyUserNo=user.u_no;
      this.$emit("modifyUserNo",this.modifyUserNo)
      console.log(this.modifyUserNo);
    },
    RowUserData(userData){
      //addrow로 부터 입력된 유저 데이터 받아옴
      this.addRowUser = userData;
      this.sendUserDataToParent();
    },
    sendUserDataToParent() {
    // sendUserData 이벤트를 발생시켜 addRowUser 데이터를 부모로 전달
    this.$emit('sendUserData', this.addRowUser);
    },
    goToPage(index) {
      this.pageNum = index;
  },
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    }
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