<template>
  <section class="hero">

    <!-- Background Shapes -->
    <div class="shape shape1"></div>
    <div class="shape shape2"></div>
    <div class="shape shape3"></div>

    <div class="container-custom hero-container">

      <!-- Left -->
      <div class="hero-content">

        <span class="hero-badge">
          🚀 Interactive Quiz Platform
        </span>

        <h1>
          Challenge Your
          <span class="gradient-text">Mind</span>
          with
          <br>
          MindSprint
        </h1>

        <p>
          Test your knowledge through exciting quizzes in Sports,
          History, Science, Technology and General Knowledge.
          Race against the clock and climb the leaderboard.
        </p>

        <div class="hero-buttons">

          <RouterLink
            to="/take-quiz"
            class="primary-btn"
          >
            Start Quiz
          </RouterLink>

          <a
            href="#categories"
            class="secondary-btn"
          >
            Explore Categories
          </a>

        </div>

      </div>

      <!-- Right -->

      <div class="hero-image">

        <div class="glass hero-card">

          <h3>🏆 Today's Challenge</h3>

          <div class="score-circle">

            <span>10</span>

            <small>Questions</small>

          </div>

          <div class="hero-info">

            <div>
              <strong>10</strong>
              <small>Minutes</small>
            </div>

            <div>
              <strong>5</strong>
              <small>Categories</small>
            </div>

            <div>
              <strong>100+</strong>
              <small>Players</small>
            </div>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
</script>