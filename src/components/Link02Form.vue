<template>
  <div>
  <form name="Link1Form" id="Link1Form">
      <div class="row">    
        <div class="input-group mb-3 col">
          <input type="text" class="form-control" name="job" id="job" :placeholder="$t('JOB')" v-model="job">
        </div>  
        <div class="input-group mb-3 col">
            <input type="text" class="form-control" name="hobby" id="hobby" :placeholder="$t('HOBBY')" v-model="hobby">
        </div>
        <div class="col d-flex justify-content-evenly ">
            <div class="form-check form-check-inline ">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="ismarried" value="1" v-model="ismarried">
                {{$t('Married')}}</label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="ismarried" value="0" v-model="ismarried">
                {{$t('Single')}}</label>
            </div>    
        </div>        
        <div class="col d-flex justify-content-evenly">
          <div class="form-check form-check-inline">
              <label class="form-check-label">
              <input class="form-check-input lang" type="radio" name="lang" @click="changeLocale($event.target.value)" value="ko" >
              {{$t('Korean')}}</label>
          </div>
          <div class="form-check form-check-inline">
              <label class="form-check-label">
              <input class="form-check-input lang" type="radio" name="lang" @click="changeLocale($event.target.value)" value="cn">
              {{$t('Chinese')}}</label>
          </div>
        </div>
      </div>  
      <div class="row">
          <div class="col">
            <select class="form-select" v-model="foodcate" @change="updateFoodtype" name="foodcate">
              <option value="">{{$t('FoodCategory')}} </option>
              <option v-for="food in this.FOODCATE" :value="food" :key="food">{{ food }}</option>
            </select>
          </div>
          <div class="col ">
            <select class="form-select" v-model="foodtype" name="foodtype">
              <option  value=""> {{$t('FoodType')}} </option>
              <option v-for="foodType in FOODTYPE[this.foodcate]" :value="foodType" :key="foodType">{{ foodType }}</option>
            </select>                   
          </div> 
          
          <div class="col">
            <div class="form-floating">
              <input type="text" class="form-control" name="toTime" id="floatingFrom" v-model="toTime" placeholder="일정 시작" onfocus="(this.type='date')">
              <label for="floatingFrom">{{$t('ToTime')}} </label>
            </div>
          </div>
         <div class="col">
          <div class="form-floating">
            <input type="text" class="form-control" name="fromTime"  id="floatingTo" v-model="fromTime" placeholder="일정 끝" onfocus="(this.type='date')">
            <label  for="floatingTo">{{$t('FromTime')}} </label>
          </div>
        </div>
      </div>
     <hr class="mb-0">
     <div class="d-flex  justify-content-between align-items-center ">
       <div>
        아이디: {{ this.USER.u_id }} / 이름: {{ this.USER.uname }}
       </div>
       <div id="buttons" class="text-end py-3 ">
         <button type="button" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click="fnAddRow()">{{$t('Add')}}</button>
         <button type="button" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click.prevent="fnSave()">{{$t('Save')}}</button>
         <button type="submit" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click.prevent="fnExcelDown()">{{$t('Excel')}}</button>
         <button type="button" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click="fnDelete()" >{{$t('Delete')}}</button>
       </div>
     </div>
    </form>

    <Link02TableList
      :user="this.USER" 
      v-bind:addrow="this.addRow"
      @delchk="fnDelNum"
      @modifyUserNo="fnModifyVal"
      @sendUserData="handleUserData"
    />
    <ModifyModal
    v-if="this.isOpen"  
    v-bind:isOpen="this.isOpen"
    :updateUserNo="this.updateUserNo"
    @modalClose="isModal"
    :fnList="fnGetList"
    @isLink="fnIsLink"
    @userLink="fnUserData"
    @updatedUser="fnUpdatedUser"
    />
  
  </div>
  </template>

<script>
import Link02TableList from '@/components/Link02TableList.vue'
import * as xlsx from 'xlsx'
import ModifyModal from '@/components/Link02ModifyModal.vue'
export default {
  name: "Link02Form",
  components:{
    Link02TableList,
    ModifyModal
  },
  props:{
    USER:Object
  },
  data() {
    return {
      isLink: false,
      userDataByLink:{},
      selectedLanguage: 'ko',
      isOpen: false,
      updateUserNo: '',
      IndexDelArr:[],
      userList:[],
      user:this.USER,
      updateUser:[],
      addRow:false,
      addRowUserData:null,

      job: '',
      hobby: '',
      ismarried: '',
      toTime: '',
      fromTime:'',
      foodcate: '',
      foodtype: '',
      FOODCATE: ['한식', '양식', '일식','중식'],
            FOODTYPE: {
                한식: ['비빔밥', '된장찌개', '삼겹살','떡','백반'],
                양식: ['피자','파스타','햄버거','스테이크','샐러드'],
                일식: ['초밥', '덮밥', '오코노미야끼'],
                중식: ['짜장면', '짬뽕', '탕수육']
            },
      requestBody: this.$route.query,
      idx: this.$route.query.idx,
      
    }
  },
  created(){

  },
  mounted(){
    this.fnGetList();     
    //this.updateUser=this.user;
  },
  computed(){
    this.updateUser=this.user;
  },
  methods: {
    updateFoodtype() {
      this.foodtype = '';
    },
    updateCitiesString() {
    this.citiesString = this.selectedFoodTypes.join();
    },
    fnExcelDown(){
      const workBook = xlsx.utils.book_new()
      let userArray=[];
      let setCell={
        "번호":1,
        "직업":this.USER.job,
        "취미":this.USER.hobby,
        "결혼유무":(this.USER.ismarried)?'O':'X',
        "좋아하는음식분류":this.USER.foodcate,
        "좋아하는음식종류":this.USER.foodtype,
      }
      userArray.push(setCell);
      const workSheet = xlsx.utils.json_to_sheet(userArray)
      xlsx.utils.book_append_sheet(workBook, workSheet, 'example')
      xlsx.writeFile(workBook, 'example.xlsx')
    },
    fnDelete() {
      if (this.IndexDelArr.length > 0) {
        confirm("삭제 하시겠습니까?");
        let apiUrl = '/api/delete';
        this.$axios.post(apiUrl, this.IndexDelArr)
          .then(() => {
            alert("삭제하였습니다.");
            this.IndexDelArr = [];
            this.fnGetList();
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
            }
          });
      } else {
        alert("삭제할 유저를 선택하세요.");
      }
    },
    fnGetList() {
      this.$axios
      .post("/api/user",this.USER)
      .then(({ data }) => {
        console.log(data);
        this.user=data;
      })
      .catch((err) => {
        if (err.message.indexOf("Network Error") > -1) {
          alert("네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.");
        }
      });
    },
    fnSave(){
      let form={
        "u_no": this.USER.u_no,
        "job": this.job,
        "hobby": this.hobby,
        "ismarried":this.ismarried,
        "foodcate": this.foodcate,
        "foodtype":this.foodtype,
        }
      let apiUrl ='/api/link2/update';
      this.$axios.post(apiUrl,form)
      .then((res) => {
        if(res){
          alert("등록되었습니다.")
          window.location.reload(true);
        }
      }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
      alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
      }
      })
    },
    fnDelNum(indexArr){
      this.IndexDelArr=indexArr
      return this.IndexDelArr;
    },
    fnAddRow(){
      this.addRow=true
      return this.addRow
    },
    fnModifyVal(modifyUserNo){
      this.isOpen=true;
      this.updateUserNo=modifyUserNo;
      console.log("업데이트"+this.isOpen,this.updateUserNo)
    },
    isModal(isModal){
      this.isOpen=isModal;
    },
    fnUpdatedUser(user){
      this.updateUser=user;
    },

    // userOneSearch(user){
    //   let apiUrl ='/api/list'
    //   console.log("검색"+user)
    //   const USER = {
    //     "e_no": user.u_no,
    //     "u_id": user.u_id,
    //     "uname": user.uname,
    //     "gender":user.gender,
    //     "nation": user.nation,
    //     "city":user.city,
    //     "post_time": user.post_time,
    //     "toTime": '',
    //     "fromTime": '',
    //   }
    //   this.$axios.post(apiUrl,USER)
    //   .then((res) => {
    //     this.isOpen=false;
    //     this.userList=res.data
    //     console.log("검색"+res.data)
    //   }).catch((err) => {
    //       if (err.message.indexOf('Network Error') > -1) {
    //         alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
    //       }
    //     })
    // },
   
    handleUserData(userData) {
      this.addRowUserData=userData
    },

    changeLocale(val) {
      if(val=='ko'){
        return (this.$i18n.locale = 'ko')
      }else{
        this.$i18n.locale = 'cn'
      }
    },
    fnIsLink(isLink){
      this.isLink=isLink,
      this.$emit('isLink',this.isLink);
    },
    fnUserData(user){
      this.userDataByLink=user;
      this.$emit('userData',this.userDataByLink)
    }
  },
  watch() {
    return{
      user: this.user
    }
  }

}
</script>

<style>

</style>