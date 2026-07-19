<template>
  <Navbar />

  <section class="quiz-page quiz-screen">

    <div class="container-custom quiz-container">

      <Timer :timeLeft="store.timeLeft" />

      <ProgressBar :current="store.currentQuestion" :total="store.questions.length" />

      <QuestionCard v-if="currentQuestion" :question="currentQuestion" :questionIndex="store.currentQuestion"
        v-model="selectedAnswer" />

      <div class="quiz-navigation">

        <button class="secondary-btn" @click="previousQuestion" :disabled="store.currentQuestion === 0">
          Previous
        </button>

        <button class="primary-btn" @click="nextQuestion" :disabled="!selectedAnswer">
          {{
            store.currentQuestion === store.questions.length - 1
              ? "Submit"
              : "Next"
          }}
        </button>

      </div>

    </div>

  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import Navbar from "../components/common/Navbar.vue";
import Timer from "../components/quiz/Timer.vue";
import ProgressBar from "../components/quiz/ProgressBar.vue";
import QuestionCard from "../components/quiz/QuestionCard.vue";

import { useQuizStore } from "../stores/quizStore";
import { useResultStore } from "../stores/resultStore";

const router = useRouter();

const store = useQuizStore();

const resultStore = useResultStore();

let interval;

let submitted = false;

const currentQuestion = computed(() => {
  return store.questions[store.currentQuestion];
});

const selectedAnswer = computed({
  get() {
    return store.answers[currentQuestion.value?.id] || "";
  },

  set(value) {
    store.saveAnswer(currentQuestion.value.id, value);
  },
});

function previousQuestion() {
  store.previousQuestion();
}

function nextQuestion() {
  if (
    store.currentQuestion <
    store.questions.length - 1
  ) {
    store.nextQuestion();
  } else {
    submitQuiz();
  }
}

function submitQuiz() {

  if (submitted) return;

  submitted = true;

  clearInterval(interval);


  let score = 0;


  store.questions.forEach((question) => {

    if (
      store.answers[question.id] ===
      question.correctAnswer
    ) {

      score++;

    }

  });


  resultStore.saveResult({

    id: Date.now(),

    name: store.currentUser.name,

    email: store.currentUser.email,

    category: store.currentUser.category,

    score,

    total: store.questions.length,

    date: new Date().toLocaleString(),

  });


  store.setScore(score);
  store.clearQuizState();


  router.push("/result");

}

onMounted(() => {

  store.loadQuizState();

  store.startTimer();


  interval = setInterval(() => {


    if (store.timeLeft > 0) {


      store.decreaseTime();


    }
    else {


      clearInterval(interval);

      submitQuiz();


    }


  }, 1000);


});

onUnmounted(() => {
  clearInterval(interval);
});
</script>