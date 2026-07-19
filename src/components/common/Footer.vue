<template>
  <footer class="footer">

    <div class="container-custom">

      <div class="footer-grid">

        <!-- Brand -->

        <div>

          <h2 class="gradient-text">
            MindSprint
          </h2>

          <p>
            Challenge your knowledge through interactive quizzes.
            Learn, compete, and improve every day.
          </p>

        </div>

        <!-- Quick Links -->

        <div>

          <h4>Quick Links</h4>

          <ul>

            <li><RouterLink to="/">Home</RouterLink></li>

            <li><RouterLink to="/take-quiz">Take Quiz</RouterLink></li>

            <li><RouterLink to="/results">Results</RouterLink></li>

            <li><RouterLink to="/admin">Admin</RouterLink></li>

          </ul>

        </div>

        <!-- Categories -->

        <div>

          <h4>Categories</h4>

          <ul>

            <li>Sports</li>

            <li>History</li>

            <li>Science</li>

            <li>Technology</li>

            <li>General Knowledge</li>

          </ul>

        </div>

        <!-- Social -->

        <div>

          <h4>Connect</h4>

          <div class="socials">

            <a href="#"><i class="bi bi-facebook"></i></a>

            <a href="#"><i class="bi bi-github"></i></a>

            <a href="#"><i class="bi bi-linkedin"></i></a>

            <a href="#"><i class="bi bi-envelope-fill"></i></a>

          </div>

        </div>

      </div>

      <hr>

      <p class="copyright">
        © 2026 MindSprint. Built with Vue 3.
      </p>

    </div>

  </footer>
</template>

<script setup>
</script>