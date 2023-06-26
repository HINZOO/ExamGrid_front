<template>
  <div class="root">
      <teleport to="body">
          <div class="modal" >
              <div>
                <div class="d-flex justify-content-between">
                    <h3 class="modal-title">{{$t('Modify')}}</h3>
                    <button type="button" class="text-end btn btn-outline-secondary mb-2" @click="fnOneUser"> link </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="u_no" >
                    <div class="row">
                        <div class="col">
                            <label class="form-control"> {{$t('Id')}}</label>
                        </div>
                        <div class="input-group mb-3 col">
                            <input type="text" class="form-control" name="u_id" v-model="this.u_id" :placeholder="$t('Id')">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="form-control">{{$t('Name')}}</label>
                        </div>
                        <div class="input-group mb-3 col">
                            <input type="text" class="form-control" name="uname" v-model="this.uname" :placeholder="$t('Name')">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 mb-3">
                            <label class="form-control">{{$t('Gender')}}</label>
                        </div>
                        <div class="mb-3 form-check form-check col-3">
                            <input class="form-check-input" type="radio" name="gender" id="genderM" v-model="this.gender" value="M" >
                            <label class="form-check-label" for="genderM">{{$t('Man')}}</label>
                        </div>
                        <div class=" mb-3 form-check form-check col-3">
                            <input class="form-check-input" type="radio" name="gender" id="genderW"  v-model="this.gender" value="W">
                            <label class="form-check-label" for="gender">{{$t('Woman')}}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col input-group mb-3">
                            <label class="form-control">{{$t('Nation')}}</label>
                        </div>
                        <div class="col nation">
                            <select class="form-select" v-model="this.nation" @change="updateCities" name="nation"  >
                                <option value="">{{$t('Nation')}} </option>
                                <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col input-group mb-3">
                            <label class="form-control">{{$t('City')}}</label>
                    </div>
                    <div class="col city">
                        <div class="col dropdown">
                        <button type="button" class="w-100 btn btn-primary bg-white text-black text-start border border-light-subtle" data-bs-toggle="dropdown" >
                        <span v-if="this.citiesString==''">{{$t('City')}}</span>
                        <span v-else>{{ this.citiesString }}</span>
                        </button>
                        <div class="dropdown-menu p-4 w-100">
                            <label>
                            <input 
                                    type="checkbox" 
                                    @click="checkedAll($event.target.checked)"
                                    v-model="selectAllCitiesCheckbox"
                                    >
                                    {{$t('ALL')}}
                            </label>
                            <div  
                                v-for="city in this.cities[nation]"
                                :key="city" 
                            >
                                <label>
                                <input type="checkbox"  
                                    v-model="selectedCites"
                                    name="city" 
                                :value="city"
                                >{{ city }}
                                </label>
                            </div>  
                        </div>
                        </div> 
                    </div>
                    </div>
                    <div class="text-center my-3">
                        <button type="button" class="btn btn-primary me-4" @click="modifySave">저장</button>
                        <button type="button" class="btn btn-secondary" @click="fnModalClose">취소</button>
                    </div>
                </div>
              </div>
          </div>
      </teleport>
  </div>
</template>

<script>
export default {
    name: 'ModifyModal',
    props: {
        isOpen : Boolean,
        updateUserNo : Number,
        fnList:Function
    },
    data(){
        return{
            selectAllCitiesCheckbox: false,
            isModal : false,
            isLink:false,
            countries: ['한국', '미국', '일본'], // 국가 목록
            cities: {
                한국: ['서울', '부산', '인천','경기','대구'],
                미국: ['뉴욕','LA', '시카고'],
                일본: ['도쿄', '오사카', '후쿠오카']
            }, // 도시 목록
            selectedCites:[],
            citiesString:'',
            u_no:'',
            u_id: '',
            uname: '',
            gender: '',
            nation: '',
            city: '',
            post_time:'',
            user:{}
            
        }
    },
    methods:{
        updateCities() {
            this.city = '';
            this.selectedCites=[];
            this.selectAllCitiesCheckbox=false; // 선택한 국가가 변경될 때마다 선택한 도시 초기화
        },
        updateCitiesString() {
        this.citiesString = this.selectedCites.join();
        },
        fnModalClose(){
            this.isModal=false
            this.$emit('modalClose',this.isModal)
        },
        fnUserList(){
            let apiUrl ='/api/user';
            let uno={
                "u_no": parseInt(this.updateUserNo)
            }
            this.$axios.post(apiUrl,uno)
            .then(({data}) => {
               this.u_no=data.u_no;
               this.u_id=data.u_id;
               this.uname=data.uname;
               this.gender=data.gender;
               this.nation=data.nation;
               const cityArr=data.city.split(",")
               this.selectedCites = cityArr
               this.post_time=data.post_time
               return this.user=data;
            }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
            })
        },
        modifySave(){
            let form={
                "u_no": this.u_no,
                "u_id": this.u_id,
                "uname": this.uname,
                "gender":this.gender,
                "nation": this.nation,
                "city":this.citiesString,
            }
            let apiUrl ='/api/update';
            this.$axios.post(apiUrl,form)
            .then((res) => {
                console.log(res);
                this.fnModalClose();
                this.fnList();            
            }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
            })
        },
        fnOneUser(){
            this.isLink = !this.isLink;
            this.$emit('userLink',this.user);
            this.$emit('isLink',this.isLink);
            this.fnModalClose();
        },
        checkedAll(checked){
            this.selectAllCitiesCheckbox = checked
            if (this.selectAllCitiesCheckbox) {
            this.selectedCites = [...this.cities[this.nation]];
            this.selectAllCitiesCheckbox=false;
            } else {
                this.selectedCites = [];
            }
        }
    },
    mounted() {
    this.isModal = this.isOpen;
    this.fnUserList()
     }, 
    watch: {
    selectedCites() {
    this.updateCitiesString(); // selectedCites 값 변경 시 citiesString 업데이트
     }
    }
}

</script>

<style scoped>
 .root{
  position: relative;
 }
 .modal{
  position:absolute;
  top:0;
  left:0;
  background-color: rgba(0,0,0,0.1);
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
 }
 .modal>div{
  background-color: #fff;
  padding:50px;
  border-radius: 10px;
 }
</style>