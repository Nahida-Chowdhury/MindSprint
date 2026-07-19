<template>

    <Navbar />

    <section class="category-page">

        <div class="container-custom">


            <div class="category-header">

                <h1>
                    Choose Your Challenge
                </h1>

                <p>
                    Select a category and test your knowledge
                </p>

            </div>



            <div class="category-grid">


                <div v-for="quiz in quizSets" :key="quiz.id" class="category-card" :class="quiz.color"
                    @click="startQuiz(quiz.slug)">


                    <div class="icon">
                        {{ quiz.icon }}
                    </div>


                    <h2>
                        {{ quiz.name }}
                    </h2>


                    <p>
                        {{ quiz.description }}
                    </p>


                    <div class="category-info">

                        <span>
                            {{ quiz.questions }} Questions
                        </span>


                        <span>
                            {{ quiz.duration }} min
                        </span>


                    </div>


                    <button class="primary-btn">

                        Start

                    </button>


                </div>


            </div>


        </div>

    </section>

</template>



<script setup>

import { useRouter } from "vue-router";

import Navbar from "../components/common/Navbar.vue";

import { quizSets } from "../data/quizSets";


const router = useRouter();



function startQuiz(category) {

    router.push(
        `/quiz/${category}/start`
    );

}


</script>