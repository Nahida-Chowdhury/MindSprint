<template>
  <Navbar />

  <section class="start-page">

    <div class="container-custom">

      <div class="start-grid">

        <!-- Left -->

        <div class="quiz-info glass">

          <div class="quiz-icon">

            {{ selectedQuiz?.icon }}

          </div>

          <h2>{{ selectedQuiz?.name }}</h2>

          <p>

            {{ selectedQuiz?.description }}

          </p>

          <div class="quiz-meta">

            <div>

              <strong>{{ selectedQuiz?.questions }}</strong>

              <span>Questions</span>

            </div>

            <div>

              <strong>{{ selectedQuiz?.duration }}</strong>

              <span>Minutes</span>

            </div>

          </div>

        </div>

        <!-- Right -->

        <div class="glass form-card">

          <h2>Start Challenge</h2>

          <form @submit.prevent="startQuiz">

            <div class="mb-3">

              <label>Name</label>

              <input v-model="name" class="form-control" placeholder="Enter your name" />

            </div>

            <div class="mb-4">

              <label>Email</label>

              <input v-model="email" type="email" class="form-control" placeholder="Enter your email" />

            </div>

            <button class="primary-btn w-100">

              Start Quiz

            </button>

          </form>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import Navbar from "../components/common/Navbar.vue";

import { quizSets } from "../data/quizSets";

import { questionBank } from "../data/questions";

import { useQuizStore } from "../stores/quizStore";
import { useQuestionStore } from "../stores/questionStore";

const route = useRoute();

const router = useRouter();

const store = useQuizStore();

const category = route.params.category;

const name = ref("");

const email = ref("");

const selectedQuiz = computed(() =>
  quizSets.find((q) => q.slug === category)
);

const questionStore = useQuestionStore();


function startQuiz() {

  if (!name.value.trim() || !email.value.trim()) {

    alert("Please enter your name and email.");

    return;

  }


  store.resetQuiz();


  store.setUser({

    name: name.value,

    email: email.value,

    category,

  });


  questionStore.initialize();


  const questions =
    questionStore.getByCategory(category);



  if (!questions.length) {

    alert("No questions found for this category.");

    return;

  }


  store.setQuestions(questions);


  router.push(`/quiz/${category}`);

}
</script>