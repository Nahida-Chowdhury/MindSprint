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
        v-for="category in categories"
        :key="category.slug"
        :value="category.slug"
      >

        {{ category.name }}

      </option>


    </select>

  </div>

</template>


<script setup>

import { computed } from "vue";
import { useQuestionStore } from "../../stores/questionStore";


const props = defineProps({

  modelValue:{
    type:String,
    default:""
  }

});


defineEmits([
  "update:modelValue"
]);


const questionStore = useQuestionStore();



const categories = computed(()=>{


  const uniqueCategories = [
    ...new Set(
      questionStore.questions.map(
        q => q.category
      )
    )
  ];


  return uniqueCategories.map(category => ({

    slug: category,

    name: category
      .replace("-"," ")
      .replace(/\b\w/g,char=>char.toUpperCase())

  }));

});


</script>