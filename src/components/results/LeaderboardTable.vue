<template>
  <div class="leaderboard">

    <div
      v-for="(result, index) in sortedResults"
      :key="index"
      class="leader-card glass"
    >

      <div class="rank">

        <span v-if="index===0">🥇</span>
        <span v-else-if="index===1">🥈</span>
        <span v-else-if="index===2">🥉</span>
        <span v-else>#{{ index+1 }}</span>

      </div>

      <div class="player">

        <h3>{{ result.name }}</h3>

        <small>{{ result.category }}</small>

      </div>

      <div class="score">

        {{ result.score }}/{{ result.total }}

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  results: {
    type: Array,
    default: () => [],
  },
});

const sortedResults = computed(() => {
  return [...props.results].sort((a, b) => b.score - a.score);
});
</script>