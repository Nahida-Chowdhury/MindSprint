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


            <button class="primary-btn add-question-btn" @click="showForm = true">

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

            <CategoryFilter v-model="selectedCategory" />


            <div class="pagination-select">

                <select v-model="itemsPerPage" class="category-select">

                    <option value="5">
                        Show 5
                    </option>

                    <option value="10">
                        Show 10
                    </option>

                    <option value="20">
                        Show 20
                    </option>

                    <option value="50">
                        Show 50
                    </option>

                </select>

            </div>


        </div>





        <!-- ===========================
             TABLE
        ============================ -->


        <div class="question-table-wrapper">


            <QuestionTable :questions="filteredQuestions" @edit="editQuestion" @delete="deleteQuestion" />
            <div class="pagination-controls" v-if="totalPages > 1">


                <button class="secondary-btn" @click="currentPage--" :disabled="currentPage === 1">
                    Previous
                </button>



                <span>
                    Page {{ currentPage }} of {{ totalPages }}
                </span>



                <button class="primary-btn" @click="currentPage++" :disabled="currentPage === totalPages">
                    Next
                </button>


            </div>


        </div>





        <!-- ===========================
             FORM MODAL
        ============================ -->


        <QuestionForm v-if="showForm" :question="editingQuestion" @close="closeForm" />



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

const itemsPerPage = ref(10);
const currentPage = ref(1);
const selectedCategory = ref("");
const showForm = ref(false);
const editingQuestion = ref(null);

const filteredQuestions = computed(() => {


    let data = questionStore.questions;


    if (selectedCategory.value) {

        data = data.filter(
            q => q.category === selectedCategory.value
        );

    }


    const start =
        (currentPage.value - 1) * itemsPerPage.value;


    return data.slice(
        start,
        start + Number(itemsPerPage.value)
    );


});

const totalPages = computed(() => {


    let data = questionStore.questions;


    if (selectedCategory.value) {

        data = data.filter(
            q => q.category === selectedCategory.value
        );

    }


    return Math.ceil(
        data.length / itemsPerPage.value
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