<template>

<div class="timer-card">

    <i class="bi bi-clock-fill"></i>

    <span>
        {{ minutes }}:{{ seconds }}
    </span>

</div>

</template>


<script setup>

import { computed } from "vue";


const props = defineProps({

    timeLeft:Number

});


const minutes = computed(()=>{

    return Math.floor(
        props.timeLeft / 60
    );

});


const seconds = computed(()=>{

    return String(
        props.timeLeft % 60
    ).padStart(2,"0");

});


</script>