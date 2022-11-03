import { DirectiveBinding } from "vue";

export default {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    el.addEventListener("mouseenter", () => {
      binding.value(true);
    });
    el.addEventListener("mouseleave", () => {
      binding.value(false);
    });
  },
};
