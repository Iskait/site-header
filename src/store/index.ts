import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import IStore from "@/models/store.model";

export const key: InjectionKey<Store<IStore>> = Symbol();

export const store = createStore<IStore>({
  state: {
    showNav: true,
    showMenu: false,
  },
  mutations: {
    toggleShowNav: (state, payload: boolean): void => {
      state.showNav = payload;
    },
    toggleShowMenu: (state): void => {
      state.showMenu = !state.showMenu;
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
