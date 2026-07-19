<template>
  <div class="admin-login glass">

    <h2>🔒 Admin Access</h2>

    <p>Enter administrator password</p>

    <input
      v-model="password"
      type="password"
      class="form-control"
      placeholder="Password"
      @keyup.enter="login"
    >

    <button
      class="primary-btn w-100 mt-4"
      @click="login"
    >
      Login
    </button>

  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["success"]);

const password = ref("");

function login() {

  if(password.value==="MindSprint123"){

      emit("success");

      return;
  }

  alert("Wrong password");

}
</script>