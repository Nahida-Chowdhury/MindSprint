import { defineStore } from "pinia";

import { questionBank } from "../data/questions";

import {
    getQuestions,
    saveQuestions,
} from "../utils/storage";


export const useQuestionStore = defineStore("questions", {


    state: () => ({

        questions: [],

        initialized: false,

    }),



    actions: {


        /* ==========================================
           Initialize Question Store
        ========================================== */


        initialize() {


            const savedQuestions = getQuestions();



            // Check if stored questions are valid
            const categories = Object.keys(questionBank);



            const hasAllCategories = categories.every(category =>

                savedQuestions.some(
                    question => question.category === category
                )

            );




            if(savedQuestions.length > 0 && hasAllCategories){


                this.questions = savedQuestions;


            }

            else{


                const allQuestions = [];



                Object.keys(questionBank).forEach((category)=>{


                    questionBank[category].forEach((question)=>{


                        allQuestions.push({

                            ...question,

                            category,

                        });


                    });


                });



                this.questions = allQuestions;


                saveQuestions(this.questions);


            }




            this.initialized = true;


        },





        /* ==========================================
           Get Questions By Category
        ========================================== */


        getByCategory(category){


            return this.questions.filter(

                question => question.category === category

            );


        },






        /* ==========================================
           Add Question
        ========================================== */


        add(question){


            this.questions.push(question);


            this.save();


        },







        /* ==========================================
           Update Question
        ========================================== */


        update(updatedQuestion){


            const index = this.questions.findIndex(

                question => question.id === updatedQuestion.id

            );



            if(index !== -1){


                this.questions[index] = updatedQuestion;


                this.save();


            }


        },







        /* ==========================================
           Delete Question
        ========================================== */


        delete(id){


            this.questions = this.questions.filter(

                question => question.id !== id

            );


            this.save();


        },







        /* ==========================================
           Save To Local Storage
        ========================================== */


        save(){


            saveQuestions(this.questions);


        },




        /* ==========================================
           Clear Storage (For Testing)
        ========================================== */


        resetQuestions(){


            this.questions = [];


            localStorage.removeItem("questions");


            this.initialized = false;


        }



    },


});