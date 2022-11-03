<template>
  <div
    v-hover="(state: boolean) => (isHovered = state)"
    class="flex flex-col gap-7 bg-white p-8 fixed w-full"
  >
    <div
      class="flex lg:gap-24 gap-10 justify-between lg:items-center flex-col lg:flex-row items-start"
    >
      <div class="w-full lg:w-fit flex justify-between">
        <p class="font-montserrat font-medium">ОЛИМП КЛИНИК</p>
        <MobileMenu @click="toggleShowMenu" />
      </div>
      <transition name="slide">
        <SearchInput v-if="!isLaptopScreen ? showMenu : true" />
      </transition>
      <div v-show="!isLaptopScreen && showMenu" id="mobile-nav" />
      <transition name="slide">
        <PrivateBlock v-if="!isLaptopScreen ? showMenu : true" />
      </transition>
    </div>
    <div
      v-show="isLaptopScreen && (isHovered || isScrolled)"
      id="desktop-nav"
    />
    <teleport
      v-if="mount"
      :to="isLaptopScreen ? '#desktop-nav' : '#mobile-nav'"
    >
      <transition name="slide">
        <HeaderNav v-if="isLaptopScreen ? isHovered || isScrolled : showMenu" />
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "@/store";
import SearchInput from "./SearchInput.vue";
import HeaderNav from "./HeaderNav.vue";
import PrivateBlock from "./PrivateBlock.vue";
const store = useStore();
const mount = ref<boolean>(false);
const isHovered = ref<boolean>(false);
const isScrolled = ref<boolean>(false);
const showMenu = computed<boolean>(() => store.state.showMenu);
const toggleShowMenu = () => store.commit("toggleShowMenu");

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
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-80px);
  opacity: 0.3;
}
</style>
