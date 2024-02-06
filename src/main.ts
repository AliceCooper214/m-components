import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icon from "@element-plus/icons-vue";
import { toLine } from "./utils";
import mUI from "./components";
import "./mock";

const app = createApp(App);
for (let i in Icon) {
  app.component(`el-icon-${toLine(i)}`, (Icon as any)[i]);
}

app.use(router).use(ElementPlus).use(mUI);
app.mount("#app");
