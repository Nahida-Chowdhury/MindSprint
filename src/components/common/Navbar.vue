<template>
    <header class="navbar-wrapper">
        <nav class="container-custom navbar-custom">

            <!-- Logo -->
            <RouterLink to="/" class="logo">
                <div class="logo-icon">
                    <i class="bi bi-lightning-charge-fill"></i>
                </div>

                <div class="logo-text">
                    <span class="gradient-text">MindSprint</span>
                    <small>Challenge Your Mind</small>
                </div>
            </RouterLink>

            <!-- Navigation -->

            <ul class="nav-links">

                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>

                <li>
                    <RouterLink to="/take-quiz">
                        Take Quiz
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/admin">Admin</RouterLink>
                </li>

                <li>
                    <RouterLink to="/results">LeaderBoard</RouterLink>
                </li>

            </ul>

            <!-- Right Side -->

            <div class="right-side">

                <button class="theme-btn" @click="toggleTheme">

                    <i :class="darkMode
                        ? 'bi bi-sun-fill'
                        : 'bi bi-moon-stars-fill'
                        "></i>

                </button>

                <RouterLink to="/take-quiz" class="start-btn">
                    Start Quiz
                </RouterLink>

            </div>

        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const darkMode = ref(false);

const toggleTheme = () => {
    darkMode.value = !darkMode.value;

    if (darkMode.value) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    }
};

onMounted(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        darkMode.value = true;
        document.documentElement.setAttribute("data-theme", "dark");
    }
});
</script>