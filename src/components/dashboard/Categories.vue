<template>
  <section class="section" id="categories">

    <div class="container-custom">

      <div class="section-title">

        <span>Quiz Categories</span>

        <h2>
          Pick Your
          <span class="gradient-text">
            Challenge
          </span>
        </h2>

        <p>
          Choose a category and test your knowledge.
        </p>

      </div>

      <div class="category-grid">

        <RouterLink v-for="quiz in quizSets" :key="quiz.id" :to="`/quiz/${quiz.slug}/start`"
          class="category-card" :class="quiz.color">

          <div class="category-icon">
            {{ quiz.icon }}
          </div>

          <h3>{{ quiz.name }}</h3>

          <p>{{ quiz.description }}</p>

          <span>
            {{ quiz.questions }} Questions • {{ quiz.duration }} Minutes →
          </span>

        </RouterLink>

      </div>

    </div>

  </section>
</template>

<script setup>
import { computed } from "vue";

import { useQuestionStore } from "../../stores/questionStore";
import { quizSets as defaultQuizSets } from "../../data/quizSets";

const questionStore = useQuestionStore();

questionStore.initialize();

const quizSets = computed(() => {

  const categories = {};

  questionStore.questions.forEach((question) => {

    if (!categories[question.category]) {

      // Find predefined category (if it exists)
      const existingCategory = defaultQuizSets.find(
        quiz => quiz.slug === question.category
      );

      categories[question.category] = {

        id: existingCategory?.id ?? question.category,

        slug: question.category,

        name:
          existingCategory?.name ??
          question.category
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase()),

        icon:
          existingCategory?.icon ?? "📚",

        color:
          existingCategory?.color ?? "general",

        duration:
          existingCategory?.duration ?? 10,

        description:
          existingCategory?.description ??
          `Test your knowledge in ${question.category
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase())}`,

        questions: 0,

      };

    }

    categories[question.category].questions++;

  });

  return Object.values(categories);

});
</script>