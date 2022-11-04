<template>
  <div
    v-hover="(state: boolean) => (isHovered = state)"
    class="flex flex-col bg-white p-8 fixed w-full"
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
            <img src="@/assets/user.svg" alt="user-private" />
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
