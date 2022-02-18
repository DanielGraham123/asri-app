<template>
  <q-page class="q-pa-lg">
    <q-breadcrumbs class="text-grey-8">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el
        to="/patient"
        label="Patient"
        icon="fas fa-user-injured"
      />

      <q-breadcrumbs-el :label="patientName" icon="fas fa-user-alt" />
    </q-breadcrumbs>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      patientName: "John Doe",
    };
  },
});
</script>
