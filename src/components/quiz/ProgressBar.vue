<template>
  <div class="progress-wrapper">

    <div class="progress-top">

      <span class="question-count">
        Question {{ current + 1 }} / {{ total }}
      </span>


      <span class="percentage">
        {{ progress }}%
      </span>

    </div>


    <div class="progress-track">

      <div
        class="progress-fill"
        :style="{ width: progress + '%' }"
      ></div>

    </div>

  </div>
</template>


<script setup>

import { computed } from "vue";


const props = defineProps({

  current:{
    type:Number,
    required:true
  },


  total:{
    type:Number,
    required:true
  }

});



const progress = computed(()=>{

  if(!props.total)
    return 0;


  return Math.round(
    ((props.current + 1) / props.total) * 100
  );

});

</script>
