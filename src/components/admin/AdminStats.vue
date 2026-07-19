<template>
  <div class="admin-stats">

    <div class="stat-card glass">
      <h2>{{ totalQuestions }}</h2>
      <p>Total Questions</p>
    </div>

    <div class="stat-card glass">
      <h2>{{ totalCategories }}</h2>
      <p>Categories</p>
    </div>

    <div class="stat-card glass">
      <h2>{{ totalPlayers }}</h2>
      <p>Participants</p>
    </div>

    <div class="stat-card glass">
      <h2>{{ averageScore }}</h2>
      <p>Average Score</p>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useQuestionStore } from "../../stores/questionStore";
import { useResultStore } from "../../stores/resultStore";

const questionStore = useQuestionStore();
const resultStore = useResultStore();

const totalQuestions = computed(() => questionStore.questions.length);

const totalCategories = computed(() => {
  return new Set(
    questionStore.questions.map(q => q.category)
  ).size;
});

const totalPlayers = computed(() => resultStore.results.length);

const averageScore = computed(() => {

  if (!resultStore.results.length) return "0";

  const total = resultStore.results.reduce(
    (sum, result) => sum + result.score,
    0
  );

  return (
    total / resultStore.results.length
  ).toFixed(1);

});
</script>