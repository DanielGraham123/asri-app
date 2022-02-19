<template>
  <q-page class="q-pa-lg">
    <q-breadcrumbs
      class="text-grey-8"
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

      <q-breadcrumbs-el :label="patientName" icon="fas fa-user-alt" />
    </q-breadcrumbs>
  </q-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $store = useStore();

    const patientProfile = $store.state.patient.profileToOpen;

    return {
      patientProfile,
      patientName: patientProfile.patient.name,
      patient() {
        console.log("patient: ", patientProfile);
      },
    };

    patient();
  },

  mounted() {
    // console.log("patient: ", this.patientProfile);
  },
});
</script>
