<script setup lang="ts">
import { ref, onMounted } from "vue";
import TheHeaderNavigation from "./TheHeaderNavigation.vue";
import UserIcon from "@/assets/user.svg?component";
import MenuIcon from "@/assets/menu.svg?component";
import SearchIcon from "@/assets/search.svg?component";

const isHovered = ref<boolean>(false);
const isScrolled = ref<boolean>(false);
const isMobileMenuOpen = ref<boolean>(false);

const isLaptopScreen = ref(window.screen.availWidth >= 1024);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY <= 0) {
      isScrolled.value = false;
    } else {
      isScrolled.value = true;
    }
  });
  window.addEventListener("resize", () => {
    isLaptopScreen.value = window.screen.availWidth > 1024;
  });
});
</script>

<template>
  <div
    v-hover="(state: boolean) => (isHovered = state)"
    class="bg-background-primary grid lg:grid-cols-[135px_1fr_225px] gap-x-16 p-8 fixed w-full text-primary items-center transition-all duration-300"
    :class="[
      !isLaptopScreen && isMobileMenuOpen
        ? 'gap-y-8'
        : isLaptopScreen && (!isScrolled || isHovered)
        ? 'gap-y-7'
        : 'gap-y-0',
    ]"
  >
    <div class="flex justify-between">
      <p class="font-medium">ОЛИМП КЛИНИК</p>
      <MenuIcon
        fill="currentColor"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="w-10 lg:hidden cursor-pointer block"
      />
    </div>
    <transition name="slide">
      <div
        v-if="isLaptopScreen || isMobileMenuOpen"
        class="flex bg-background-primary border-primary border rounded-md overflow-hidden"
      >
        <input
          type="text"
          placeholder="Поиск по сайту..."
          class="p-3 outline-none bg-inherit flex-1"
        />
        <button class="px-4 border-l shrink-0 border-primary">
          <SearchIcon fill="currentColor" />
        </button>
      </div>
    </transition>
    <transition name="slide">
      <div
        v-if="isLaptopScreen || isMobileMenuOpen"
        class="flex gap-x-4 order-last lg:order-none"
      >
        <button class="button">Обратный звонок</button>
        <button class="button">
          <UserIcon fill="currentColor" />
        </button>
      </div>
    </transition>
    <transition name="slide">
      <TheHeaderNavigation
        v-if="isLaptopScreen ? isHovered || !isScrolled : isMobileMenuOpen"
        class="lg:col-span-3"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-300;
}

.slide-enter-from,
.slide-leave-to {
  @apply lg:h-0 opacity-0 -translate-y-40 lg:translate-y-0;
}
</style>
