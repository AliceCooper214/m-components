// import { toLine } from '@/utils';
// import { App, defineAsyncComponent } from 'vue'

// export default {
//   install(app: App) {
//     const components = import.meta.glob('./*/src/index.vue')
//     for (const [fullPath, fn] of Object.entries(components)) {
//       let name = fullPath.replace('./', '').split('/')[0]
//       name = name.replace(name[0], name[0].toUpperCase()).split(/(?=[A-Z])/).join('-')
//       const componentsName = 'm-' + toLine(name)
//       app.component(componentsName, defineAsyncComponent(fn as any))
//     }
//   }
// }

import type { App } from "vue";
import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import trend from "./trend";
import notification from "./notification";
import list from "./list";
import menu from "./menu";
import chooseTime from "./chooseTime";
import chooseDate from "./chooseDate";
import progress from "./progress";
import chooseCity from "./chooseCity";
import form from "./form";
import modalForm from "./modalForm";
import table from "./table";
import calendar from "./calendar";
import "../styles/base.scss";
import "../styles/ui.scss";

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  chooseTime,
  chooseDate,
  chooseCity,
  progress,
  form,
  modalForm,
  table,
  calendar,
];

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item);
    });
  },
};
