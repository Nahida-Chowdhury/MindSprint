<template>

  <div class="category-filter">


    <select
      class="category-select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >


      <option value="">
        All Categories
      </option>



      <option
        v-for="quiz in quizSets"
        :key="quiz.id"
        :value="quiz.slug"
      >

        {{ quiz.name }}

      </option>



    </select>


  </div>

</template>



<script setup>

import { quizSets } from "../../data/quizSets";


defineProps({

  modelValue:{
    type:String,
    default:""
  }

});


defineEmits([
  "update:modelValue"
]);


</script>