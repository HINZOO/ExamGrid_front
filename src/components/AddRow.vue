<template>
   <tr >
      <td >
          <input type="checkbox" name="e_no"  >
      </td>
      <td class="col">
        <div class="input-group col">
        <input type="text" name="u_id" class="form-control" v-model="form.u_id">
        </div>
      </td>
      <td class="col">
        <div class="input-group  col">
        <input type="text" name="uname" class="form-control" v-model="form.uname">
        </div>
      </td>
      <td class="col">
        <div class="col d-flex justify-content-evenly ">
            <div class="form-check form-check-inline ">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="gender" value="M" v-model="form.gender" checked>
                남</label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="gender" value="W" v-model="form.gender">
                녀</label>
            </div>  
        </div>   
      </td>
      <td class="col">
            <select class="form-select" v-model="form.nation" @change="updateCities" name="nation">
              <option value="">국가 </option>
              <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
            </select>
      </td>
      <td class="col">
        <div class="col dropdown">
              <button type="button" class="w-100 btn btn-primary bg-white text-black text-start border border-light-subtle" data-bs-toggle="dropdown" >
               <span v-if="this.citiesString==''">도시</span>
               <span v-else>{{ this.citiesString }}</span>
              </button>
              <div class="dropdown-menu p-4 w-100">
                <label>
                  <input 
                          type="checkbox" 
                          @click="checkedAll($event.target.checked)"
                          v-model="selectAllCitiesCheckbox"
                          >
                          전체
                </label>
                  <div  
                      v-for="city in this.cities[form.nation]"
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
      </td>
  </tr>
</template>

<script>
export default {
  name: "addRow",
  props:{
    
  },
  data() {
    return {
      selectAllCitiesCheckbox:false,
      countries: ['한국', '미국', '일본'], // 국가 목록
      cities: {
        한국: ['서울', '부산', '인천','경기','대구'],
        미국: ['뉴욕', 'LA', '시카고'],
        일본:  ['도쿄', '오사카', '후쿠오카']
      }, // 도시 목록
      items: [],
      selectedCites:[],
      citiesString:'',
      form:{  u_id: '',
              uname: '',
              gender: '',
              toTime: '',
              fromTime:'',
              nation: '',
              city: '',
            },
    };
  },
  methods: {
    updateCities() {
      this.form.city = '';
      this.selectedCites=[];
      this.selectAllCitiesCheckbox=false;
      // 선택한 국가가 변경될 때마다 선택한 도시 초기화
    },
    updateCitiesString() {
    this.citiesString = this.selectedCites.join();
    this.form.city=this.citiesString;
    },
    checkedAll(checked){
      this.selectAllCitiesCheckbox = checked
      if (this.selectAllCitiesCheckbox) {
      this.selectedCites = [...this.cities[this.form.nation]];
      } else {
        this.selectedCites = [];
      }
    }


  },
  watch: {
    selectedCites() {
    this.updateCitiesString(); // selectedCites 값 변경 시 citiesString 업데이트
    },
    form: {
      deep: true,
      handler(newForm) {
        this.$emit('row-userdata', newForm);
      }
    }
  }
}
</script>

<style>

</style>