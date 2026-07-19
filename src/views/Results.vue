<template>

<Navbar />

<section class="results-page">

<div class="results-container">


    <!-- Header -->

    <div class="results-header">

        <h1>
            🏆 Quiz Results
        </h1>

        <p>
            View all participants and their performance
        </p>

    </div>




    <!-- Summary -->

    <div class="results-summary">


        <div class="summary-card glass">

            <h2>
                {{ resultStore.results.length }}
            </h2>

            <p>
                Total Participants
            </p>

        </div>



        <div class="summary-card glass">

            <h2>
                {{ averageScore }}%
            </h2>

            <p>
                Average Score
            </p>

        </div>



        <div class="summary-card glass">

            <h2>
                {{ highestScore }}%
            </h2>

            <p>
                Highest Score
            </p>

        </div>


    </div>





    <!-- Results Table -->

    <div class="results-card glass">



        <div class="table-header">


            <h2>
                All Attempts
            </h2>



            <div class="table-actions">


                <!-- Search -->

                <input
                    v-model="search"
                    type="text"
                    class="search-input"
                    placeholder="Search name, email, category..."
                />



                <button
                    v-if="resultStore.results.length"
                    class="delete-all-btn"
                    @click="clearResults"
                >

                    Clear All

                </button>


            </div>



        </div>






        <div
        v-if="filteredResults.length"
        class="table-wrapper"
        >


            <table>


                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Set</th>

                        <th>Score</th>

                        <th>Date</th>

                        <th>Action</th>

                    </tr>

                </thead>




                <tbody>


                    <tr
                    v-for="result in filteredResults"
                    :key="result.id"
                    >



                        <td>

                            {{ result.name }}

                        </td>




                        <td>

                            {{ result.email }}

                        </td>




                        <td>

                            {{ formatCategory(result.category) }}

                        </td>




                        <td>


                            <span class="score-badge">

                                {{ result.score }}/{{ result.total }}

                            </span>


                        </td>




                        <td>

                            {{ result.date }}

                        </td>




                        <td>


                            <button
                            class="delete-btn"
                            @click="deleteResult(result.id)"
                            >

                                Delete

                            </button>


                        </td>



                    </tr>



                </tbody>


            </table>



        </div>






        <!-- Empty -->

        <div
        v-else
        class="empty-results"
        >


            <h3>

                No Results Found

            </h3>



            <p>

                Try another search or complete a quiz first.

            </p>



        </div>




    </div>



</div>


</section>


</template>





<script setup>

import { computed, ref } from "vue";

import Navbar from "../components/common/Navbar.vue";

import { useResultStore } from "../stores/resultStore";



const resultStore = useResultStore();



/*
========================
Search
========================
*/


const search = ref("");



const filteredResults = computed(() => {


    if(!search.value.trim()){

        return resultStore.results;

    }



    const keyword =
        search.value.toLowerCase();



    return resultStore.results.filter(result => {


        return (

            result.name
            .toLowerCase()
            .includes(keyword)



            ||

            result.email
            .toLowerCase()
            .includes(keyword)



            ||

            result.category
            .toLowerCase()
            .includes(keyword)


        );


    });


});






/*
========================
Average Score
========================
*/


const averageScore = computed(()=>{


    if(!resultStore.results.length)

        return 0;



    const total =
    resultStore.results.reduce(
        (sum,result)=>


        sum +
        ((result.score/result.total)*100),


        0

    );



    return Math.round(

        total / resultStore.results.length

    );


});






/*
========================
Highest Score
========================
*/


const highestScore = computed(()=>{


    if(!resultStore.results.length)

        return 0;



    return Math.max(

        ...resultStore.results.map(result =>


            Math.round(

                (result.score/result.total)*100

            )


        )

    );


});






/*
========================
Delete Single Result
========================
*/


function deleteResult(id){


    if(confirm("Delete this result?")){


        resultStore.deleteResult(id);


    }


}





/*
========================
Delete All
========================
*/


function clearResults(){


    if(confirm("Delete all results?")){


        resultStore.clearResults();


    }


}







/*
========================
Category Format
========================
*/


function formatCategory(category){


    return category

    .replace("-"," ")

    .replace(/\b\w/g,char =>
        char.toUpperCase()
    );


}



</script>