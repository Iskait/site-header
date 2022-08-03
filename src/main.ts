import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store";
import UI from "@/UI";
import "./index.css";

const app = createApp(App);

UI.forEach((component) => app.component(component.name, component));

app.use(store, key).mount("#app");
