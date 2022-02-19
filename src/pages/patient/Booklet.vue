<template>
  <q-page class="q-pa-lg">
    <q-breadcrumbs
      class="text-grey"
      :active-color="$q.dark.mode ? 'info' : 'primary'"
    >
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          :color="$q.dark.mode ? 'info' : 'primary'"
        />
      </template>

      <q-breadcrumbs-el
        to="/patient"
        label="Patient"
        icon="fas fa-user-injured"
      />
      <q-breadcrumbs-el
        to="/patient/profile"
        :label="patientName"
        icon="fas fa-user"
      />
      <q-breadcrumbs-el label="Booklet" icon="fas fa-book" />
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
