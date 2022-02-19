<template>
  <q-page
    class="q-pa-lg"
    :class="[$q.dark.mode ? 'bg-dark-body' : 'bg-grey-2']"
  >
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

    <!-- Profile Section -->
    <div class="row q-py-md">
      <div class="col-md-8">
        <div class="row">
          <div class="col-4">
            <q-card
              class="q-px-md q-pb-md shadow-1 text-center"
              square
              style="height: 290px"
            >
              <q-card-section class="q-pb-sm">
                <q-avatar size="80px">
                  <img :src="patientProfile.patient.img" alt="" />
                </q-avatar>

                <div class="text-h6 q-px-md q-pt-sm">
                  {{ cleanName(patientProfile.patient.name) }}
                </div>

                <div class="text-subtitle3 text-grey">
                  {{ patientProfile.phone }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-h6">{{ patientProfile.visits }}</div>
                <div class="text-subtitle3 text-grey">Visits</div>
              </q-card-section>

              <q-card-action class="q-mb-md">
                <q-btn size="md" outline class="full-width text-capitalize"
                  >Send Message</q-btn
                >
              </q-card-action>
            </q-card>
          </div>

          <div class="col-8 profile-info">
            <q-card square class="shadow-1 q-ml-xs" style="height: 290px">
              <div class="row q-px-md q-py-lg">
                <div class="col-4">
                  <q-card-section>
                    <div class="text-grey">Full Name:</div>
                    <div class="">{{ patientProfile.patient.name }}</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-grey">Gender:</div>
                    <div class="">{{ patientProfile.gender }}</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-grey">Last Visit:</div>
                    <div class="">
                      {{ cleanDate(patientProfile.lastvisit) }}
                    </div>
                  </q-card-section>
                </div>
                <div class="col-4">
                  <q-card-section>
                    <div class="text-grey">Birthday:</div>
                    <div class="">{{ patientProfile.dob }}</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-grey">Phone:</div>
                    <div class="">{{ patientProfile.phone }}</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-grey">Last Doctor:</div>
                    <div class="">{{ patientProfile.lastdoctor }}</div>
                  </q-card-section>
                </div>
                <div class="col-4">
                  <q-card-section>
                    <div class="text-grey">Address:</div>
                    <div class="">{{ patientProfile.address }}</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-grey">Last Treatment:</div>
                    <div class="">
                      {{ patientProfile.lasttreatment }}
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-grey">Last Hospital:</div>
                    <div class="">{{ patientProfile.lasthospital }}</div>
                  </q-card-section>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useQuasar, date } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const patientProfile = $store.state.patient.profileToOpen;

    const cleanName = (name) => {
      let name_ = name.split(" ");

      if (name_.length > 2) {
        return name_[0] + " " + name_[name_.length - 1];
      }
      return name;
    };

    const cleanDate = (dateVal) => {
      return date.formatDate(dateVal, "MMM DD, YYYY");
    };

    onMounted(() => {
      console.log("patient profile: ", patientProfile);
    });

    return {
      patientProfile,
      patientName: patientProfile.patient.name,
      cleanName,
      cleanDate,
    };
  },

  mounted() {
    // console.log("patient: ", this.patientProfile);
  },
});
</script>
