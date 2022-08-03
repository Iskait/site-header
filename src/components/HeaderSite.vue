<template>
  <div class="flex flex-col gap-7 bg-slate-100 p-8 relative">
    <div
      @mouseover="toggleShowNav(true)"
      class="flex gap-24 justify-between items-center lg:flex-col lg:items-start lg:gap-6"
    >
      <p class="font-montserrat font-medium">ОЛИМП КЛИНИК</p>
      <transition name="slide">
        <SearchInput v-if="!getScreenWidth() ? showMenu : true" />
      </transition>
      <div id="mobile-nav"></div>
      <transition name="slide">
        <PrivateBlock v-if="!getScreenWidth() ? showMenu : true" />
      </transition>
    </div>
    <div id="desktop-nav"></div>
    <teleport
      v-if="mount"
      :to="getScreenWidth() ? '#desktop-nav' : '#mobile-nav'"
    >
      <transition name="slide">
        <HeaderNav v-if="getScreenWidth() ? showNav : showMenu" />
      </transition>
    </teleport>
    <MobileMenu @click="toggleShowMenu" />
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
const showNav = computed<boolean>(() => store.state.showNav);
const showMenu = computed<boolean>(() => store.state.showMenu);
const toggleShowNav = (payload: boolean) =>
  store.commit("toggleShowNav", payload);
const toggleShowMenu = () => store.commit("toggleShowMenu");
const scrollHandler = (): void => {
  toggleShowNav(false);
};

const getScreenWidth = (): boolean => window.screen.availWidth > 1024;

onMounted(() => {
  mount.value = true;
  getScreenWidth() && document.addEventListener("scroll", scrollHandler);
});
onUnmounted(() => {
  mount.value = false;
  document.removeEventListener("scroll", scrollHandler);
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
