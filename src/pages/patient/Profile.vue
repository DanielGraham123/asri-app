<template>
  <q-page
    class="q-pa-lg"
    :class="[$q.dark.mode ? 'bg-dark-body' : 'bg-grey-2']"
  >
    <div class="flex justify-between items-baseline">
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

      <!-- edit patient profile and print -->
      <div class="flex">
        <q-btn
          icon="print"
          unelevated
          size="sm"
          :outline="$q.dark.mode"
          class="q-mr-sm no-shadow text-grey text-weight-bold"
          :class="$q.dark.mode ? '' : 'bg-white'"
        ></q-btn>

        <q-btn
          unelevated
          :outline="$q.dark.mode"
          :class="$q.dark.mode ? '' : 'bg-white'"
          class="text-grey text-weight-bold no-shadow"
        >
          <q-icon left name="fas fa-edit" size="12px"></q-icon>
          <div>Edit Patient</div>
        </q-btn>
      </div>
    </div>
    <!-- Profile Section -->
    <div class="row q-py-md">
      <div class="col-md-8">
        <div class="row">
          <div class="col-4">
            <q-card
              class="q-px-md q-pb-md no-shadow text-center"
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
            <q-card square class="no-shadow q-ml-xs" style="height: 290px">
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
      <div class="col-md-4 q-pl-md">
        <!-- Previous Prescription -->
        <q-card square class="no-shadow">
          <q-card-section class="flex justify-between items-center q-pb-sm">
            <div class="text-subtitle1 text-weight-bold">
              Prev. Prescriptions
            </div>
            <a
              href="/patient/booklet"
              :class="[$q.dark.mode ? 'text-blue-12' : 'text-primary']"
              class="text-weight-bold"
              >See all</a
            >
          </q-card-section>

          <q-card-section
            class="q-mx-sm q-mb-sm"
            :class="[$q.dark.mode ? 'bg-blue-grey-10' : 'bg-indigo-1']"
            style="height: 155px; overflow-y: scroll"
          >
            <ul class="q-px-md q-my-xs">
              <li v-for="i in 10" :key="i">
                Some previous drug/prescription here
              </li>
            </ul>
          </q-card-section>

          <q-card-section class="flex items-end justify-between">
            <div>
              <div class="text-subtitle2">Previously checked by:</div>
              <div class="flex items-center">
                <q-icon
                  name="person_outline"
                  :color="$q.dark.mode ? 'blue-12' : 'secondary'"
                ></q-icon>
                <div class="text-subtitle3 text-grey q-ml-sm">
                  {{ patientProfile.lastdoctor }}
                </div>
              </div>
            </div>

            <div class="text-grey text-subtitle3">
              <span :class="$q.dark.mode ? 'text-blue-12' : 'text-secondary'"
                >On:
              </span>
              {{ cleanDate(patientProfile.lastvisit) }}
            </div>
          </q-card-section>
        </q-card>

        <!-- Files / Documents -->
        <q-card square class="no-shadow q-mt-md">
          <q-card-section class="q-pb-sm">
            <div class="text-subtitle1 text-weight-bold">Files/Documents</div>
          </q-card-section>

          <q-card-section class="q-px-md q-pt-xs q-mb-sm">
            <q-list bordered separator>
              <q-item v-ripple clickable v-for="i in 5" :key="'file' + i">
                <q-item-section side>
                  <q-icon name="description"></q-icon>
                </q-item-section>

                <q-item-section>
                  <div class="text-grey">X-Ray result.pdf</div>
                </q-item-section>

                <q-item-section side>
                  <div class="flex items-center">
                    <q-btn
                      size="sm"
                      flat
                      dense
                      round
                      icon="download_for_offline"
                    ></q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
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
