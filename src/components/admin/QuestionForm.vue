<template>
  <div class="question-form-overlay">
    <div class="question-form glass">
      <h2>{{ isEdit ? "Edit Question" : "Add Question" }}</h2>

      <form @submit.prevent="saveQuestion">
        <!-- CATEGORY -->
        <div class="mb-3">
          <label>Category</label>
          <select v-model="form.category" class="form-select" @change="handleCategoryChange" required>
            <option value="">Select Category</option>
            <option v-for="category in categories" :key="category.slug" :value="category.slug">
              {{ category.name }}
            </option>
            <option value="new">➕ Create New Category</option>
          </select>
        </div>

        <!-- NEW CATEGORY -->
        <div v-if="form.category === 'new'" class="mb-3">
          <label>New Category Name</label>
          <input v-model="newCategory" class="form-control" placeholder="Example: Movies" />
        </div>

        <!-- QUESTION -->
        <div class="mb-3">
          <label>Question</label>
          <textarea v-model="form.question" class="form-control" rows="3" required></textarea>
        </div>

        <!-- OPTIONS -->
        <div v-for="(option, index) in form.options" :key="index" class="mb-3">
          <label>Option {{ index + 1 }}</label>
          <input v-model="form.options[index]" class="form-control" required />
        </div>

        <!-- CORRECT ANSWER -->
        <div class="mb-4">
          <label>Correct Answer</label>
          <select v-model="form.correctAnswer" class="form-select" required>
            <option v-for="option in form.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- BUTTONS -->
        <div class="form-actions">
          <button type="button" class="secondary-btn" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="primary-btn">
            {{ isEdit ? "Update" : "Save" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref } from "vue";
import { useQuestionStore } from "../../stores/questionStore";
import { useCategoryStore } from "../../stores/categoryStore";

const props = defineProps({
  question: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(["close"]);

const questionStore = useQuestionStore();
const categoryStore = useCategoryStore();

questionStore.initialize();
categoryStore.initialize();

const newCategory = ref("");

/*
  Dynamic categories
  comes from saved questions
*/
const categories = computed(() => categoryStore.categories);

const form = reactive({
  id: null,
  category: "",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: ""
});

const isEdit = computed(() => {
  return !!props.question;
});

watch(
  () => props.question,
  (value) => {
    if (value) {
      form.id = value.id;
      form.category = value.category;
      form.question = value.question;
      form.options = [...value.options];
      form.correctAnswer = value.correctAnswer;
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  form.id = null;
  form.category = "";
  form.question = "";
  form.options = ["", "", "", ""];
  form.correctAnswer = "";
  newCategory.value = "";
}

function handleCategoryChange() {
  if (form.category !== "new") {
    newCategory.value = "";
  }
}

function saveQuestion() {
  let category = form.category;

 if (form.category === "new") {

  if (!newCategory.value.trim()) {
    alert("Please enter category name");
    return;
  }

  category = newCategory.value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const exists = categoryStore.categories.some(
    item => item.slug === category
  );

  if (!exists) {

    categoryStore.addCategory({
      id: Date.now(),

      slug: category,

      name: newCategory.value.trim(),

      icon: "📚",

      color: "general",

      questions: 0,

      duration: 10,

      description: `Test your knowledge in ${newCategory.value.trim()}`
    });

  }

}

  const payload = {
    id: form.id ?? Date.now(),
    category,
    question: form.question,
    options: [...form.options],
    correctAnswer: form.correctAnswer
  };

  if (isEdit.value) {
    questionStore.update(payload);
  } else {
    questionStore.add(payload);
  }

  // refresh categories immediately
  emit("close");
}
</script>