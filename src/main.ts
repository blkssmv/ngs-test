import { createApp } from "vue";
import App from "./App.vue";
import TreeComponent from "./components/TreeComponent.vue";
import "./assets/globals.scss";

createApp(App).component("TreeComponent", TreeComponent).mount("#app");
