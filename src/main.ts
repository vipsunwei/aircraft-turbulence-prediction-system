import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementUI from "./element-plus";
import "./main.css";

const app = createApp(App);
app
  .use(elementUI)
  .use(store)
  .use(router)
  .mount("#app");
