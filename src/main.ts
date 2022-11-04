import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import vHover from "./directives/vHover";

const app = createApp(App);

app.directive("hover", vHover);

app.mount("#app");
