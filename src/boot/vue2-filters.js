import { boot } from "quasar/wrappers";
import Vue2Filters from "vue2-filters";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  console.log("filters: ", Vue2Filters.mixin);
  app.use(Vue2Filters.mixin);
});
