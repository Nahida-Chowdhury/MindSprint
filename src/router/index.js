import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import TakeQuiz from "../views/TakeQuiz.vue";
import Quiz from "../views/Quiz.vue";
import Result from "../views/Result.vue";
import Admin from "../views/Admin.vue";
import Results from "../views/Results.vue";
import NotFound from "../views/NotFound.vue";
import QuizCategories from "../views/QuizCategories.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    // User information page before starting the quiz
    {
      path: "/quiz/:category/start",
      name: "takeQuiz",
      component: TakeQuiz,
      props: true,
    },

    // Quiz page
    {
      path: "/quiz/:category",
      name: "quiz",
      component: Quiz,
      props: true,
    },

    // Individual user's result
    {
      path: "/result",
      name: "result",
      component: Result,
    },

    // All participants' results
    {
      path: "/results",
      name: "results",
      component: Results,
    },

    // Admin dashboard
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },

    {
      path: "/take-quiz",
      name: "quizCategories",
      component: QuizCategories
    },

    // 404 Page
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFound,
    },
  ],
});

export default router;