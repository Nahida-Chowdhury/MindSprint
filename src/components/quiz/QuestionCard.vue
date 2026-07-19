<template>

<div class="question-card glass">


    <!-- Question Header -->

    <div class="question-header">


        <span class="question-number">

            Question {{ questionIndex + 1 }}

        </span>


        <span class="points">

            +1 Point

        </span>


    </div>




    <!-- Question -->

    <h2>

        {{ question.question }}

    </h2>




    <!-- Options -->

    <div class="options">


        <button

            v-for="(option,index) in question.options"

            :key="index"

            class="option-btn"

            :class="{
                selected: modelValue === option
            }"

            @click="$emit('update:modelValue', option)"

        >

            <span class="option-letter">

                {{ String.fromCharCode(65 + index) }}

            </span>


            {{ option }}


        </button>



    </div>


</div>

</template>



<script setup>

defineProps({

    question:{
        type:Object,
        required:true
    },


    modelValue:String,


    questionIndex:{
        type:Number,
        default:0
    }

});



defineEmits([

    "update:modelValue"

]);


</script>