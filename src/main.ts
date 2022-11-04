import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import UI from "@/UI";
import vHover from "./directives/vHover";

const app = createApp(App);

app.directive("hover", vHover);

UI.forEach((component) => app.component(component.name, component));

app.mount("#app");
