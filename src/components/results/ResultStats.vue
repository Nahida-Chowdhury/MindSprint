<template>
  <div class="stats-grid">

    <div class="glass stat-box">
      <h2>{{ totalParticipants }}</h2>
      <p>Total Participants</p>
    </div>

    <div class="glass stat-box">
      <h2>{{ highestScore }}</h2>
      <p>Highest Score</p>
    </div>

    <div class="glass stat-box">
      <h2>{{ averageScore }}</h2>
      <p>Average Score</p>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  results: Array,
});

const totalParticipants = computed(() => props.results.length);

const highestScore = computed(() => {
  if (!props.results.length) return 0;

  return Math.max(...props.results.map(r => r.score));
});

const averageScore = computed(() => {
  if (!props.results.length) return 0;

  const total = props.results.reduce(
    (sum, r) => sum + r.score,
    0
  );

  return (total / props.results.length).toFixed(1);
});
</script>