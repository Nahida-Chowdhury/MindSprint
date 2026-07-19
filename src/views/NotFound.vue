<template>
  <Navbar />

  <section class="not-found-page">

    <div class="container-custom">

      <div class="not-found-card glass">

        <div class="error-code">
          404
        </div>

        <div class="error-icon">
          🚀
        </div>

        <h1>
          Page Not Found
        </h1>

        <p>
          Sorry! The page you are looking for doesn't exist or has been moved.
        </p>

        <div class="not-found-actions">

          <RouterLink
            to="/"
            class="primary-btn"
          >
            <i class="bi bi-house-fill"></i>
            Back Home
          </RouterLink>

          <button
            class="secondary-btn"
            @click="$router.back()"
          >
            <i class="bi bi-arrow-left"></i>
            Go Back
          </button>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import Navbar from "../components/common/Navbar.vue";

const $router = useRouter();
</script>

<style scoped>

.not-found-page{
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:120px 20px 60px;
}

.not-found-card{
    max-width:650px;
    margin:auto;
    text-align:center;
    padding:60px 40px;
    border-radius:28px;
}

.error-code{
    font-size:110px;
    font-weight:900;
    line-height:1;
    background:linear-gradient(135deg,#6C63FF,#9333EA);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}

.error-icon{
    font-size:70px;
    margin:15px 0;
}

.not-found-card h1{
    font-size:40px;
    font-weight:700;
    margin-bottom:15px;
}

.not-found-card p{
    font-size:18px;
    color:var(--text-light);
    max-width:500px;
    margin:0 auto 35px;
}

.not-found-actions{
    display:flex;
    justify-content:center;
    gap:18px;
    flex-wrap:wrap;
}

.not-found-actions a,
.not-found-actions button{
    min-width:180px;
}

@media(max-width:768px){

    .error-code{
        font-size:80px;
    }

    .error-icon{
        font-size:55px;
    }

    .not-found-card{
        padding:40px 25px;
    }

    .not-found-card h1{
        font-size:30px;
    }

    .not-found-actions{
        flex-direction:column;
    }

    .not-found-actions a,
    .not-found-actions button{
        width:100%;
    }

}
</style>