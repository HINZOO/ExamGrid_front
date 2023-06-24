<template>
  <div class="list container my-4">
    <GridMain/>
  </div>
</template>

<script>
import GridMain from '@/components/GridMain';

export default {
  name: "grid",
  components: {
    GridMain,
  },
  data() {
    return {
      //cites: [' ']
    }
  }
}
</script>

<style>
</style>