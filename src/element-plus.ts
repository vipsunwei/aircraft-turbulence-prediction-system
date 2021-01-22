import {
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElCard
} from "element-plus";

const components = [
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElCard
];
// eslint-disable-next-line
function install(app: any) {
  components.map(component => {
    app.use(component);
    console.info("已注册的组件：", component.name);
  });
}

export default install;
