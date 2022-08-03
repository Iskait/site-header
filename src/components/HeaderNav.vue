<template>
  <ul class="flex flex-row gap-16 flex-wrap lg:flex-col lg:gap-2">
    <li v-for="navLink in navLinks" :key="navLink">
      <a
        href="#"
        class="after:content-[''] after:block after:h-px after:w-0 after:bg-black hover:after:w-full after:transition-all"
        >{{ navLink }}</a
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";

const navLinks = ref<string[]>([
  "Направления",
  "Специалисты",
  "Предложения",
  "Клиники",
  "Аппараты",
  "Пациентам",
  "Новости и медиа",
  "О клинике",
]);
</script>
