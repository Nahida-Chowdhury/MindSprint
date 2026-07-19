<template>
  <div class="search-filter">

    <input
      v-model="localSearch"
      @input="$emit('update:search', localSearch)"
      class="form-control"
      placeholder="Search by name..."
    />

    <select
      v-model="localCategory"
      @change="$emit('update:category', localCategory)"
      class="form-select"
    >
      <option value="">All Categories</option>
      <option>sports</option>
      <option>history</option>
      <option>science</option>
      <option>technology</option>
      <option>general-knowledge</option>
    </select>

  </div>
</template>

<script setup>
import { ref } from "vue";

const localSearch = ref("");
const localCategory = ref("");

defineEmits([
  "update:search",
  "update:category",
]);
</script>