<template>
      <div class="tableWrapper">
        <form id="hiddenForm" name="hiddenForm" >
          <table id="ListTable" class="table table-bordered table-responsive text-center table-hover">
          <thead class="align-middle">
            <tr>
                <th scope="col" rowspan="2" id="noChk">선택</th>
                <th scope="col" rowspan="2">아이디</th>
                <th scope="col" rowspan="2">이름</th>
                <th scope="col" rowspan="2">성별</th>
                <th scope="col" colspan="2">장소</th>
            </tr>
            <tr>                
              <th scope="col">국가</th>
              <th scope="col">도시</th>
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
          <button :disabled="pageNum === 0" @click="prevPage" class="btn btn-sm btn-outline-success me-2">
            이전
          </button>
          <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
          <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn btn-sm btn-outline-success ms-2">
          다음
          </button>
        </div>

      </div>
</template>
<script>

import AddRow from '@/components/AddRow.vue'

export default {
  name: "GridTableList",
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
      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
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