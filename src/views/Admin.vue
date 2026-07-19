<template>

<Navbar/>

<section class="section">

<div class="container-custom">

<AdminLogin
v-if="!loggedIn"
@success="loggedIn=true"
/>

<AdminDashboard
v-else
/>

</div>

</section>

</template>

<script setup>

import {ref} from "vue";

import Navbar from "../components/common/Navbar.vue";

import AdminLogin from "../components/admin/AdminLogin.vue";

import AdminDashboard from "../components/admin/AdminDashboard.vue";

const loggedIn=ref(false);

</script>