<template>
  <ul class="flex flex-col lg:mt-7 lg:flex-row lg:gap-16 gap-4 flex-wrap">
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
