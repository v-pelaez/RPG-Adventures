<script setup>
import { RouterView } from "vue-router";
import FooterComponentVue from './components/FooterComponent.vue';
import HeaderComponentVue from './components/HeaderComponent.vue';
import { ref } from 'vue';
</script>

<template>
  <HeaderComponentVue />
  <RouterView />
  <FooterComponentVue />
</template>

<style></style>
