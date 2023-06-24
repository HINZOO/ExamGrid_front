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
        <select class="form-select" v-model="form.city" name="city">
              <option  value="">도시</option>
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
      countries: ['한국', '미국', '일본'], // 국가 목록
      cities: {
        한국: ['서울', '부산', '인천','경기','대구'],
        미국: ['뉴욕', 'LA', '시카고'],
        일본:  ['도쿄', '오사카', '후쿠오카']
      }, // 도시 목록
      items: [],
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
      this.form.city = ''; // 선택한 국가가 변경될 때마다 선택한 도시 초기화
    },
    submitForm() {
      const newUser = {
        u_id: this.form.u_id,
        uname: this.form.uname,
        gender: this.form.gender,
        nation: this.form.nation,
        city: this.form.city
      };
      this.$emit('add-user', newUser);
      // 폼 초기화
      this.form.u_id = '';
      this.form.uname = '';
      this.form.gender = 'M';
      this.form.nation = '';
      this.form.city = '';
    }

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