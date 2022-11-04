<template>
  <div
    v-hover="(state: boolean) => (isHovered = state)"
    class="flex flex-col bg-background-primary p-8 fixed w-full text-primary"
  >
    <div
      class="flex lg:gap-x-24 justify-between lg:items-center flex-col lg:flex-row items-start transition-all duration-300"
      :class="[
        isMobileMenuOpen
          ? 'gap-y-10'
          : isScrolled && !isMobileMenuOpen
          ? 'gap-y-2'
          : 'gap-y-0',
      ]"
    >
      <div class="w-full lg:w-fit flex justify-between">
        <p class="font-montserrat font-medium">ОЛИМП КЛИНИК</p>
        <div
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="w-[40px] lg:hidden cursor-pointer block before:content-[''] before:h-[2px] before:w-full before:bg-black before:block before:rounded before:mb-3 after:content-[''] after:h-[2px] after:w-2/3 after:bg-black after:block after:rounded"
        />
      </div>
      <transition name="slide">
        <SearchInput v-if="isLaptopScreen || isMobileMenuOpen" />
      </transition>
      <div id="mobile-nav" />
      <transition name="slide">
        <div
          v-if="isLaptopScreen || isMobileMenuOpen"
          class="flex justify-between items-center gap-6"
        >
          <button class="button">Обратный звонок</button>
          <button class="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
              />
              <path
                d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
              />
            </svg>
          </button>
        </div>
      </transition>
    </div>
    <div id="desktop-nav" />
    <teleport
      v-if="mount"
      :to="isLaptopScreen ? '#desktop-nav' : '#mobile-nav'"
    >
      <transition name="slide">
        <HeaderNav
          v-if="isLaptopScreen ? isHovered || isScrolled : isMobileMenuOpen"
        />
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SearchInput from "./SearchInput.vue";
import HeaderNav from "./HeaderNav.vue";
const mount = ref<boolean>(false);
const isHovered = ref<boolean>(false);
const isScrolled = ref<boolean>(false);
const isMobileMenuOpen = ref<boolean>(false);

const isLaptopScreen = ref(window.screen.availWidth >= 1024);

onMounted(() => {
  mount.value = true;
  window.addEventListener("scroll", () => {
    if (window.scrollY <= 0) {
      isScrolled.value = true;
    } else {
      isScrolled.value = false;
    }
  });
  window.addEventListener("resize", () => {
    isLaptopScreen.value = window.screen.availWidth > 1024;
  });
});
onUnmounted(() => {
  mount.value = false;
});
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-300;
}

.slide-enter-from,
.slide-leave-to {
  @apply lg:h-0 opacity-0 lg:mt-0 lg:translate-y-0 -translate-y-10;
}
</style>
