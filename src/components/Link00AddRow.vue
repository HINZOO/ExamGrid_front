<template>
   <tr >
      <td >
          <input type="checkbox" name="e_no">
      </td>
      <td class="col">
        <div class="input-group col">
        <input type="text" name="u_id" class="form-control" v-model="form.u_id" :placeholder="$t('Id')">
        </div>
      </td>
      <td class="col">
        <div class="input-group  col">
        <input type="text" name="uname" class="form-control" v-model="form.uname" :placeholder="$t('Name')">
        </div>
      </td>
      <td class="col">
        <div class="col d-flex justify-content-evenly ">
            <div class="form-check form-check-inline ">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="gender" value="M" v-model="form.gender" checked>
                {{$t('Man')}}</label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label">
                <input class="form-check-input gender" type="radio" name="gender" value="W" v-model="form.gender">
                {{$t('Woman')}}</label>
            </div>  
        </div>   
      </td>
      <td class="col">
            <select class="form-select" v-model="form.nation" @change="updateCities" name="nation">
              <option value="">{{$t('Nation')}} </option>
              <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
            </select>
      </td>
      <td class="col">
            <select class="form-select" v-model="form.city" name="city">
              <option  value=""> {{$t('City')}} </option>
              <option v-for="city in cities[form.nation]" :value="city" :key="city">{{ city }}</option>
            </select>   
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
    },
  },
  watch: {
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