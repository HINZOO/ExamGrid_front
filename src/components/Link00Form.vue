<template>
  <div>
  <form name="searchAndInsertForm" id="searchAndInsertForm">
      <div class="row">    
        <div class="input-group mb-3 col">
          <input type="text" class="form-control" name="u_id" id="u_id" :placeholder="$t('Id')" v-model="u_id">
        </div>  
        <div class="input-group mb-3 col">
            <input type="text" class="form-control" name="uname" id="uname" :placeholder="$t('Name')" v-model="uname">
        </div>
        <div class="col d-flex justify-content-evenly ">
            <div class="form-check form-check-inline ">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="gender" value="M" v-model="gender">
                {{$t('Man')}}</label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="gender" value="W" v-model="gender">
                {{$t('Woman')}}</label>
            </div>    
        </div>        
        <div class="col d-flex justify-content-evenly">
          <div class="form-check form-check-inline">
              <label class="form-check-label">
              <input class="form-check-input lang" type="radio" name="lang" @click="changeLocale($event.target.value)" value="ko" >
              한국어</label>
          </div>
          <div class="form-check form-check-inline">
              <label class="form-check-label">
              <input class="form-check-input lang" type="radio" name="lang" @click="changeLocale($event.target.value)" value="en">
              English</label>
          </div>
        </div>
      </div>  
      <div class="row">
          <div class="col nation">
            <select class="form-select" v-model="selectedNation" @change="updateCities" name="nation">
              <option value="">{{$t('Nation')}} </option>
              <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
            </select>
          </div>
          <div class="col city">
            <select class="form-select" v-model="this.selectedCity" name="city">
              <option  value=""> {{$t('City')}} </option>
              <option v-for="city in cities[selectedNation]" :value="city" :key="city">{{ city }}</option>
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
      <div id="buttons" class="text-end py-3 ">
        <button type="submit" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click.prevent="fnLink1()" >Link1</button>
        <button type="submit" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click.prevent="fnSearch()" >{{$t('Search')}} </button>
        <button type="button" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click="fnAddRow()">{{$t('Add')}}</button>
        <button type="button" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click.prevent="fnSave()">{{$t('Save')}}</button>
        <button type="submit" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click.prevent="fnExcelDown()">{{$t('Excel')}}</button>
        <button type="button" class="btn btn-outline-secondary mx-1 px-3 rounded-5" @click="fnDelete()" >{{$t('Delete')}}</button>
      </div>
    </form>

    <Link00TableList
      v-bind:usersList="userList" 
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
    />
  
  </div>
  </template>

<script>
import Link00TableList from '@/components/Link00TableList.vue'
import * as xlsx from 'xlsx'
import ModifyModal from '@/components/Link00ModifyModal.vue'

 export default {
  name: "Link00Form",
  components:{
    Link00TableList,
    ModifyModal
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
      addRow:false,
      addRowUserData:null,

      u_id: '',
      uname: '',
      gender: '',
      toTime: '',
      fromTime:'',
      selectedNation: '',
      selectedCity: '',
      selectedCites:[],
      countries: ['한국', '미국', '일본'], // 국가 목록
      cities: {
        한국: ['서울', '부산', '인천','경기','대구'],
        미국: ['뉴욕', 'LA', '시카고'],
        일본:  ['도쿄', '오사카', '후쿠오카']
      }, // 도시 목록
      requestBody: this.$route.query,
      idx: this.$route.query.idx,
      
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    updateCities() {
      this.selectedCity = '';
    },
    checkDuplicateId() {
      const apiUrl = '/api/idcheck';
      let USER ={}
      if(this.addRowUserData){
        USER = {
        u_id: this.addRowUserData.u_id
        };
      }else{
        USER = {
        u_id: this.u_id
        };
      }
      return this.$axios.post(apiUrl, USER)
        .then(res => res.data !== '' && res.data !== null) // 중복 여부를 boolean으로 반환
        .catch(error => {
          console.error(error);
          return false; // 중복 여부를 알 수 없는 경우 false로 처리
        });
    },
    chkAllInputs() {
      if(this.addRowUserData){
        if (this.addRowUserData.u_id === '' || this.addRowUserData.uname === '' || this.addRowUserData.gender === '' || this.addRowUserData.nation === '' || this.addRowUserData.city === '') {
        return true; // 하나라도 비어있으면 true 반환
       } else {
         return false; // 모두 입력되어 있으면 false 반환
        }
      }else{
        if (this.u_id === '' || this.uname === '' || this.gender === '' || this.nation === '' || this.city === '') {
        return true; // 하나라도 비어있으면 true 반환
       } else {
         return false; // 모두 입력되어 있으면 false 반환
        }
      }
   
    },
    fnSave() {
      this.checkDuplicateId()
        .then(isDuplicate => {
          if (isDuplicate) {
            alert('아이디가 중복되었습니다.');
            return;
          }
          if (this.chkAllInputs()) {
            alert('값을 입력하세요.');
            return;
          }
      let apiUrl='/api/insert';
      this.citiesString = this.selectedCites.join()
      this.form = {
        "u_no": this.idx,
        "u_id": this.u_id,
        "uname": this.uname,
        "gender":this.gender,
        "nation": this.selectedNation,
        "city":this.city,
        "toTime": this.toTime,
        "fromTime":this.fromTime,
      }
      if (this.form.u_no === undefined) {
        //INSERT
        if(this.addRowUserData){
          this.form= this.addRowUserData;
        }
        this.$axios.post(apiUrl, this.form)
        .then((res) => {
          alert('등록되었습니다.')
          console.log(res);
          window.location.reload(true);//새로고침이라..다시 생각해봐.
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      }});
    },
    fnSearch(){
      let apiUrl ='/api/list'
      this.form = {
        "e_no": this.e_no,
        "u_id": this.u_id,
        "uname": this.uname,
        "gender":this.gender,
        "nation": this.selectedNation,
        "city":this.city,
        "toTime": this.toTime,
        "fromTime":this.fromTime,
      }
      this.$axios.post(apiUrl, this.form)
      .then((res) => {
        this.userList=res.data
      }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
    },
    fnExcelDown(){
      const workBook = xlsx.utils.book_new()
      let userArray=[];
      let idx = 1;
      for(let user of this.userList){
        let setCell={
          "번호":idx,
          "아이디":user.u_id,
          "이름":user.uname,
          "성별":(user.gender=='W')?'녀':'남',
          "국가":user.nation,
          "도시":user.city,
        }
        userArray.push(setCell);
        idx++; 
      }

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
        .get("/api/list", {
          params: this.requestBody
        })
        .then(({ data }) => {
          console.log(data);
          this.userList=data

        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.");
          }
        });
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
    // userOneSearch(user){
    //   let apiUrl ='/api/list'
    //   console.log("검색"+user)
    //   const USER = {
    //     "e_no": user.e_no,
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
        this.$i18n.locale = 'en'
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
  watch: {
    selectedCites() {
    this.updateCitiesString(); // selectedCites 값 변경 시 citiesString 업데이트
    },
  }

}
</script>

<style>

</style>