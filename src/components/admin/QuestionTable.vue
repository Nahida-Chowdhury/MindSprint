<template>
  <div>

    <div
      v-for="question in questions"
      :key="question.id"
      class="question-item glass"
    >

      <div class="question-header">

        <span class="category">
          {{ question.category }}
        </span>

        <div>

          <button
            class="edit-btn"
            @click="$emit('edit', question)"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            @click="$emit('delete', question.id)"
          >
            Delete
          </button>

        </div>

      </div>

      <h4>{{ question.question }}</h4>

      <ul>
        <li
          v-for="option in question.options"
          :key="option"
          :class="{ correct: option === question.correctAnswer }"
        >
          {{ option }}
        </li>
      </ul>

    </div>

  </div>
</template>

<script setup>
defineProps({
  questions: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete"]);
</script>