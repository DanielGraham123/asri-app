<template>
  <q-page
    class="q-pa-lg"
    :class="[$q.dark.mode ? 'bg-dark-body' : 'bg-grey-2']"
  >
    <q-breadcrumbs
      class="text-grey"
      :active-color="$q.dark.mode ? 'blue-12' : 'primary'"
    >
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          :color="$q.dark.mode ? 'blue-12' : 'primary'"
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

    <!-- booklet  -->
    <!-- <flipbook
      class="flipbook"
      :pages="[
        'https://pixabay.com/photos/sunset-tree-water-silhouette-1373171/',
        'https://cdn.pixabay.com/photo/2013/05/12/18/55/balance-110850_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/12/11/15/34/lion-3012515__340.jpg',
        'https://cdn.pixabay.com/photo/2014/03/26/17/50/sunset-298850_1280.jpg',
      ]"
    >
    </flipbook> -->
    <!-- <Flipbook class="book" :pages="pages">
      <template v-slot="prop">
        <img :src="prop.page.url" alt="" />
      </template>
    </Flipbook> -->

    <Flipper width="270px" height="300px" :flipped="flipped" @click="onClick">
      <div slot="front">Frontface</div>

      <div slot="back">Backface</div>
    </Flipper>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import Flipbook from "vue-flipbook";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const patientProfile = $store.getters["patient/getPatientProfile"];

    const tab = ref("upcoming-apptmnts");
    let flipped = false;
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

    const pages = [
      { url: "http://via.placeholder.com/500x500/001f3f" },
      { url: "http://via.placeholder.com/500x500/0074D9" },
      { url: "http://via.placeholder.com/500x500/7FDBFF" },
      { url: "http://via.placeholder.com/500x500/39CCCC" },
      { url: "http://via.placeholder.com/500x500/3D9970" },
      { url: "http://via.placeholder.com/500x500/2ECC40" },
      { url: "http://via.placeholder.com/500x500/01FF70" },
      { url: "http://via.placeholder.com/500x500/FFDC00" },
      { url: "http://via.placeholder.com/500x500/FF851B" },
      { url: "http://via.placeholder.com/500x500/FF4136" },
      { url: "http://via.placeholder.com/500x500/85144b" },
      { url: "http://via.placeholder.com/500x500/F012BE" },
      { url: "http://via.placeholder.com/500x500/B10DC9" },
    ];

    onMounted(() => {
      console.log("patient profile: ", patientProfile);

      console.log(
        "patient profile getter: ",
        $store.getters["patient/getPatientProfile"]
      );
    });

    return {
      patientProfile,
      patientName: patientProfile.patient.name,
      cleanName,
      cleanDate,
      pages,
      flipped,
      onClick: () => {
        flipped = !flipped;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
// @import url("./booklet.scss");
.flipbook {
  width: 90vw;
  height: 90vh;
}
</style>
