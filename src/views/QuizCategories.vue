<template>
  <Navbar />

  <section class="category-page">
    <div class="container-custom">

      <!-- Header -->
      <div class="category-header">
        <h1>Choose Your Challenge</h1>

        <p>
          Select a category and test your knowledge
        </p>
      </div>

      <!-- Categories -->
      <div class="category-grid">

        <div
          v-for="quiz in quizSets"
          :key="quiz.id"
          class="category-card"
          :class="quiz.color"
          @click="startQuiz(quiz.slug)"
        >

          <div class="icon">
            {{ quiz.icon }}
          </div>

          <h2>
            {{ quiz.name }}
          </h2>

          <p>
            {{ quiz.description }}
          </p>

          <div class="category-info">

            <span>
              {{ quiz.questions }} Questions
            </span>

            <span>
              {{ quiz.duration }} min
            </span>

          </div>

          <button class="primary-btn">
            Start
          </button>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import Navbar from "../components/common/Navbar.vue";

import { useQuestionStore } from "../stores/questionStore";
import { quizSets as defaultQuizSets } from "../data/quizSets";

const router = useRouter();

const questionStore = useQuestionStore();

questionStore.initialize();

/* ==========================================
   Generate Categories Dynamically
========================================== */

const quizSets = computed(() => {

  const categories = {};

  questionStore.questions.forEach((question) => {

    if (!categories[question.category]) {

      // Find matching category from quizSets.js
      const existingCategory = defaultQuizSets.find(
        quiz => quiz.slug === question.category
      );

      categories[question.category] = {

        id:
          existingCategory?.id ??
          question.category,

        slug:
          question.category,

        name:
          existingCategory?.name ??
          question.category
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase()),

        icon:
          existingCategory?.icon ??
          "🧩",

        color:
          existingCategory?.color ??
          "general",

        duration:
          existingCategory?.duration ??
          10,

        description:
          existingCategory?.description ??
          `Test your knowledge in ${
            question.category
              .replace(/-/g, " ")
              .replace(/\b\w/g, char => char.toUpperCase())
          }`,

        questions: 0,

      };

    }

    categories[question.category].questions++;

  });

  return Object.values(categories);

});

/* ==========================================
   Start Quiz
========================================== */

function startQuiz(category) {

  router.push(`/quiz/${category}/start`);

}
</script>