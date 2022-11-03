import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store";
import UI from "@/UI";
import "./index.css";
import vHover from "./directives/vHover";

const app = createApp(App);

app.directive("hover", vHover);

UI.forEach((component) => app.component(component.name, component));

app.use(store, key).mount("#app");
