<template>
  <div class="root">
      <teleport to="body">
          <div class="modal" >
              <div>
                <div class="d-flex justify-content-between">
                    <h3 class="modal-title">{{$t('Modify')}}</h3>
                    <!-- <button type="button" class="text-end btn btn-outline-secondary mb-2" @click="fnOneUser"> link </button> -->
                </div>
                <div class="modal-body">
                    <input type="hidden" name="u_no" >
                    <div class="row">
                        <div class="col">
                            <label class="form-control"> {{$t('JOB')}}</label>
                        </div>
                        <div class="input-group mb-3 col">
                            <input type="text" class="form-control" name="job" v-model="this.job" :placeholder="$t('JOB')">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="form-control">{{$t('HOBBY')}}</label>
                        </div>
                        <div class="input-group mb-3 col">
                            <input type="text" class="form-control" name="hobby" v-model="this.hobby" :placeholder="$t('HOBBY')">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 mb-3">
                            <label class="form-control">{{$t('IsMarried')}}</label>
                        </div>
                        <div class="mb-3 form-check form-check col-3">
                            <input class="form-check-input" type="radio" name="ismarried" id="married" v-model="this.ismarried" value="1" >
                            <label class="form-check-label" for="married">{{$t('Married')}}</label>
                        </div>
                        <div class=" mb-3 form-check form-check col-3">
                            <input class="form-check-input" type="radio" name="ismarried" id="single"  v-model="this.ismarried" value="0">
                            <label class="form-check-label" for="single">{{$t('Single')}}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col input-group mb-3">
                            <label class="form-control">{{$t('FoodCategory')}}</label>
                        </div>
                        <div class="col nation">
                            <select class="form-select" v-model="this.foodcate" @change="updateCities" name="foodcate"  >
                                <option value="">{{$t('FoodCategory')}} </option>
                                <option v-for="food in FOODCATE" :value="food" :key="food">{{ food }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col input-group mb-3">
                            <label class="form-control">{{$t('FoodType')}}</label>
                    </div>
                    <div class="col city">
                        <select class="form-select" v-model="this.foodtype" name="foodtype">
                            <option value=""> {{$t('FoodType')}} </option>
                            <option v-for="foodType in FOODTYPE[this.foodcate]" :value="foodType" :key="foodType">{{ foodType }}</option>
                        </select>    
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
            isModal : false,
            isLink:false,
            FOODCATE: ['한식', '양식', '일식','중식'],
            FOODTYPE: {
                한식: ['비빔밥', '된장찌개', '삼겹살','떡','백반'],
                양식: ['피자','파스타','햄버거','스테이크','샐러드'],
                일식: ['초밥', '덮밥', '오코노미야끼'],
                중식: ['짜장면', '짬뽕', '탕수육']
            },
            u_no:'',
            job: '',
            hobby: '',
            ismarried: '',
            foodcate: '',
            foodtype: '',
            user:{}
            
        }
    },
    methods:{
        updateCities() {
            this.city = '';
        },
        fnModalClose(){
            this.isModal=false;
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
               this.job=data.job;
               this.hobby=data.hobby;
               this.ismarried=data.ismarried;
               this.foodcate=data.foodcate;
               this.foodtype=data.foodtype;
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
                "job": this.job,
                "hobby": this.hobby,
                "ismarried":this.ismarried,
                "foodcate": this.foodcate,
                "foodtype":this.foodtype,
            }
            let apiUrl ='/api/link2/update';
            this.$axios.post(apiUrl,form)
            .then((res) => {
                console.log(res.config.data);
                this.user=form;
                this.$emit('updatedUser',this.user);
                this.fnModalClose();
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
    },
    mounted() {
    this.isModal = this.isOpen;
    this.fnUserList()
     }, 
    watch: {

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