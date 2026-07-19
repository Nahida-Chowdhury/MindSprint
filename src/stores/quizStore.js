import { defineStore } from "pinia";


const QUIZ_STORAGE = "mindsprint_active_quiz";



export const useQuizStore = defineStore("quiz", {


  state: () => ({


    // Current participant information
    currentUser: {

      name: "",

      email: "",

      category: "",

    },



    // Current quiz questions
    questions: [],



    // Current question index
    currentQuestion: 0,



    // Selected answers
    answers: {},



    // Final score
    score: 0,



    // 10 minutes = 600 seconds
    timeLeft: 600,



  }),




  actions: {



    // Save user information before quiz starts
    setUser(user) {

      this.currentUser = user;

      this.saveQuizState();

    },




    // Load selected category questions
    setQuestions(questions) {

      this.questions = questions;

      this.saveQuizState();

    },





    // Save selected answer
    saveAnswer(questionId, answer) {


      this.answers[questionId] = answer;


      this.saveQuizState();


    },





    // Move to next question
    nextQuestion() {


      if(
        this.currentQuestion < this.questions.length - 1
      ){

        this.currentQuestion++;

        this.saveQuizState();

      }


    },





    // Move to previous question
    previousQuestion() {


      if(this.currentQuestion > 0){


        this.currentQuestion--;


        this.saveQuizState();


      }


    },





    // Start timer
    startTimer() {


      if(this.timeLeft <= 0){

        this.timeLeft = 600;

      }


      this.saveQuizState();


    },





    // Decrease timer every second
    decreaseTime() {


      if(this.timeLeft > 0){


        this.timeLeft--;


        this.saveQuizState();


      }


    },





    // Save score
    setScore(score) {


      this.score = score;


    },





    // Save quiz progress to localStorage
    saveQuizState() {


      localStorage.setItem(

        QUIZ_STORAGE,

        JSON.stringify({

          currentUser: this.currentUser,

          questions: this.questions,

          currentQuestion: this.currentQuestion,

          answers: this.answers,

          score: this.score,

          timeLeft: this.timeLeft,

        })

      );


    },





    // Restore quiz after refresh
    loadQuizState() {


      const saved = localStorage.getItem(
        QUIZ_STORAGE
      );



      if(saved){


        const data = JSON.parse(saved);



        this.currentUser = data.currentUser || {

          name:"",
          email:"",
          category:"",

        };



        this.questions = data.questions || [];



        this.currentQuestion =
          data.currentQuestion || 0;



        this.answers =
          data.answers || {};



        this.score =
          data.score || 0;



        this.timeLeft =
          data.timeLeft || 600;


      }


    },





    // Remove saved quiz after completing
    clearQuizState() {


      localStorage.removeItem(
        QUIZ_STORAGE
      );


    },





    // Reset everything
    resetQuiz() {



      this.currentUser = {

        name: "",

        email: "",

        category: "",

      };



      this.questions = [];

      this.currentQuestion = 0;

      this.answers = {};

      this.score = 0;

      this.timeLeft = 600;



      this.clearQuizState();



    },



  },


});