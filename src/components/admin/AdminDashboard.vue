<template>

    <div class="admin-page">


        <!-- ===========================
             HEADER
        ============================ -->

        <div class="admin-header">

            <div>
                <h1>
                    Question Management
                </h1>

                <p>
                    Manage quiz questions and categories
                </p>
            </div>


            <button
                class="primary-btn add-question-btn"
                @click="showForm = true"
            >

                + Add Question

            </button>


        </div>




        <!-- ===========================
             STATISTICS
        ============================ -->


        <AdminStats />





        <!-- ===========================
             FILTER
        ============================ -->


        <div class="admin-toolbar">


            <CategoryFilter 
                v-model="selectedCategory"
            />


        </div>





        <!-- ===========================
             TABLE
        ============================ -->


        <div class="question-table-wrapper">


            <QuestionTable
                :questions="filteredQuestions"
                @edit="editQuestion"
                @delete="deleteQuestion"
            />


        </div>





        <!-- ===========================
             FORM MODAL
        ============================ -->


        <QuestionForm

            v-if="showForm"

            :question="editingQuestion"

            @close="closeForm"

        />



    </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { useQuestionStore } from "../../stores/questionStore";

import CategoryFilter from "./CategoryFilter.vue";
import QuestionTable from "./QuestionTable.vue";
import QuestionForm from "./QuestionForm.vue";
import AdminStats from "./AdminStats.vue";

const questionStore = useQuestionStore();

questionStore.initialize();

const selectedCategory = ref("");
const showForm = ref(false);
const editingQuestion = ref(null);

const filteredQuestions = computed(() => {
    if (!selectedCategory.value) {
        return questionStore.questions;
    }

    return questionStore.questions.filter(
        q => q.category === selectedCategory.value
    );
});

function editQuestion(question) {
    editingQuestion.value = { ...question };
    showForm.value = true;
}

function deleteQuestion(id) {
    if (confirm("Delete this question?")) {
        questionStore.delete(id);
    }
}

function closeForm() {
    showForm.value = false;
    editingQuestion.value = null;
}
</script>