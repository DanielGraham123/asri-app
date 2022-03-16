import { boot } from "quasar/wrappers";
// import Flipbook from "flipbook-vue";
import Flipbook from "vue-flipbook";
import Flipper from "vue-flipper";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component("Flipper", Flipper);
  console.log("flipper", Flipper);
});
