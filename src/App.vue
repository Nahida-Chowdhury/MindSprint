<template>
  <RouterView />

  <button
    v-show="showScrollTop"
    class="scroll-top-btn"
    @click="scrollToTop"
  >
    <i class="bi bi-arrow-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const showScrollTop = ref(false);

function handleScroll() {
  showScrollTop.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>