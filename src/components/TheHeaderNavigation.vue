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

<template>
  <ul class="flex flex-col lg:flex-row gap-x-8 xl:gap-x-16 gap-y-4">
    <li v-for="navLink in navLinks" :key="navLink">
      <a
        href="#"
        class="after:content-[''] after:block after:h-px after:w-0 after:bg-black hover:after:w-full after:transition-all"
        >{{ navLink }}</a
      >
    </li>
  </ul>
</template>
