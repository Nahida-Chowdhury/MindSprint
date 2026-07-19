import { defineStore } from "pinia";


const STORAGE_KEY = "mindsprint_results";


export const useResultStore = defineStore("results", {

    state: () => ({

        results: JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        ),

        currentResult: null,

    }),



    actions: {


        // Save new quiz result
        saveResult(result) {


            this.results.unshift(result);


            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(this.results)
            );


            this.currentResult = result;

        },



        // Delete single result
        deleteResult(id) {


            this.results =
                this.results.filter(
                    result => result.id !== id
                );


            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(this.results)
            );


        },



        // Delete all results
        clearResults() {


            this.results = [];


            localStorage.removeItem(
                STORAGE_KEY
            );


        },



        // Load saved results
        loadResults() {


            const saved =
                localStorage.getItem(STORAGE_KEY);



            if(saved){

                this.results =
                    JSON.parse(saved);

            }


        }

    }

});