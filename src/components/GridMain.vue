<template>
  <div>
    
    <h1>Grid</h1>
    <div id="FullContain" class="border border-secondary w-85 mx-auto p-4">
     <GridInsertSearchList   />
    </div>

  </div>
</template>

<script>
import GridInsertSearchList from '@/components/GridInsertSearchList';

export default {
  name: "List",
  components: { 
    GridInsertSearchList,
  },
  data(){
  }
};
</script>