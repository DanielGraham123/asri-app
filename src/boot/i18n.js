import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

export default boot(({ app }) => {
  console.log("locale lang: ", navigator.language);
  const i18n = createI18n({
    locale: navigator.language || "en-US",
    fallbackLocale: "fr-FR", // set fallback locale
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
