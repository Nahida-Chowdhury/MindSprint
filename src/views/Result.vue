<template>
  <Navbar />

  <section class="result-page">

    <div class="result-container">


      <!-- Header -->

      <div class="result-header">

        <h1>
          🎉 Congratulations!
        </h1>

        <p>
          You have successfully completed the quiz.
        </p>

      </div>



      <!-- Main Result Card -->

      <div
        v-if="result"
        class="result-card glass"
      >


        <!-- Score Section -->

        <div class="score-section">


          <div class="score-circle">

            <span>
              {{ result.score }}
            </span>

            <small>
              / {{ totalQuestions }}
            </small>

          </div>


          <h2>
            {{ percentage }}%
          </h2>


          <span class="badge">
            {{ performance }}
          </span>


        </div>




        <!-- Information Section -->


        <div class="info-section">


          <div class="info-card">

            <i class="bi bi-person-fill"></i>

            <div>

              <small>
                Name
              </small>

              <h4>
                {{ result.name }}
              </h4>

            </div>

          </div>




          <div class="info-card">

            <i class="bi bi-envelope-fill"></i>

            <div>

              <small>
                Email
              </small>

              <h4>
                {{ result.email }}
              </h4>

            </div>

          </div>





          <div class="info-card">

            <i class="bi bi-book-fill"></i>

            <div>

              <small>
                Category
              </small>

              <h4>
                {{ categoryName }}
              </h4>

            </div>

          </div>





          <div class="info-card">

            <i class="bi bi-check-circle-fill"></i>

            <div>

              <small>
                Correct Answers
              </small>

              <h4>
                {{ result.score }}/{{ totalQuestions }}
              </h4>

            </div>

          </div>



        </div>


      </div>




      <!-- Empty Result -->

      <div
        v-else
        class="glass empty-result"
      >

        <h2>
          No Result Found
        </h2>

        <p>
          Please complete a quiz first.
        </p>


        <RouterLink
          to="/"
          class="home-btn"
        >
          Go Home
        </RouterLink>


      </div>





      <!-- Progress -->


      <div
        v-if="result"
        class="glass progress-card"
      >


        <div class="progress-title">

          Performance

        </div>




        <div class="progress">


          <div
            class="progress-bar"
            :style="{ width: percentage + '%' }"
          ></div>


        </div>




        <div class="progress-label">


          <span>
            {{ percentage }}%
          </span>


          <span>
            {{ performance }}
          </span>


        </div>


      </div>






      <!-- Buttons -->


      <div
        v-if="result"
        class="action-buttons"
      >


        <RouterLink
          to="/"
          class="home-btn"
        >

          <i class="bi bi-house-fill"></i>

          Back Home

        </RouterLink>





        <RouterLink
          to="/results"
          class="leader-btn"
        >

          <i class="bi bi-trophy-fill"></i>

          Leaderboard

        </RouterLink>



      </div>



    </div>


  </section>
</template>



<script setup>

import { computed, onMounted } from "vue";

import Navbar from "../components/common/Navbar.vue";

import { useResultStore } from "../stores/resultStore";



const resultStore = useResultStore();




onMounted(() => {

  resultStore.loadResults();

});




// Latest result

const result = computed(() => {

  return resultStore.results[0] || null;

});





const totalQuestions = computed(() => {

  return result.value?.total || 0;

});





const percentage = computed(() => {


  if(!totalQuestions.value)
    return 0;



  return Math.round(
    (result.value.score / totalQuestions.value) * 100
  );


});





const performance = computed(() => {


  if (percentage.value >= 90)
    return "Outstanding";


  if (percentage.value >= 80)
    return "Excellent";


  if (percentage.value >= 70)
    return "Great";


  if (percentage.value >= 60)
    return "Good";


  if (percentage.value >= 40)
    return "Keep Practicing";


  return "Needs Improvement";


});





const categoryName = computed(() => {


  if(!result.value?.category)
    return "";



  return result.value.category

    .replace("-", " ")

    .replace(/\b\w/g, c => c.toUpperCase());


});



</script>