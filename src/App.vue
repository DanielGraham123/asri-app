<template>
  <router-view />
</template>
<script>
import { defineComponent, watch } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "App",

  setup() {
    const $q = useQuasar();

    $q.dark.set(false);

    watch(
      () => $q.dark.isActive,
      (val) => {
        console.log(val ? "On dark mode" : "On light mode");
      }
    );
  },
});
</script>
