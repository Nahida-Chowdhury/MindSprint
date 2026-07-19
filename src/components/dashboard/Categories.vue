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
import { quizSets } from "../../data/quizSets";
</script>