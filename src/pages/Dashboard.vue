<template>
  <q-page
    class="q-px-lg q-py-lg"
    :class="[$q.dark.mode ? 'bg-dark-body' : 'bg-grey-2']"
  >
    <div class="row q-col-gutter-md q-col-gutter-sm-sm items-end">
      <div class="col-xs-12 col-md-6 q-ml-auto">
        <q-card fit :class="[$q.dark.mode ? 'jumbotron-2' : 'jumbotron']">
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-xs-12 col-sm-8 col-md-8">
                <div class="text-h5 text-weight-bold q-pb-sm">
                  Welcome, John Doe
                </div>
                <div class="text-subtitle3 q-pb-md">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Explicabo minus consequatur ipsum eos.
                </div>
                <q-btn
                  label="Check this"
                  color="orange"
                  icon-right="arrow_right_alt"
                  size="sm"
                  class="absolute-bottom q-px-xs q-mx-md q-mb-lg"
                  style="width: 115px"
                ></q-btn>
              </div>
              <div class="col-sm-4" v-show="!$q.screen.lt.sm">
                <q-img contain src="~assets/welcom.png"></q-img>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="col-xs-12 col-sm-6 col-md-3"
        v-for="(dash, index) in dashes"
        :key="index"
      >
        <q-card
          class="mycard text-white q-pa-sm"
          :style="{ background: dash.bg }"
        >
          <div class="row items-center">
            <div class="col-8">
              <q-card-section>
                <div class="text-weight-medium text-h5 dash-title text-sm-h6">
                  {{ dash.title }}
                </div></q-card-section
              >

              <q-card-section>
                <div class="text-h3 text-weight-bold">{{ dash.count }}</div>
              </q-card-section>
            </div>

            <div class="col-4">
              <q-card-section>
                <q-icon
                  :name="dash.icon"
                  :size="$q.screen.gt.sm ? 'xl' : 'md'"
                  class="full-width"
                  :class="$q.screen.lt.sm ? 'on-right' : ''"
                ></q-icon>
              </q-card-section>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- table -->
    <div class="q-py-md">
      <q-table
        title="All Appointments"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :table-header-style="{
          textTransform: 'uppercase',
          color: 'grey',
        }"
        :filter="filter"
      >
        <template v-slot:top>
          <div>
            <div class="text-h5">All Appointments</div>
            <div class="text-subtitle3">Appointments for 2021</div>
          </div>

          <q-space></q-space>

          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
            :class="[$q.screen.lt.sm ? 'full-width' : '']"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-card class="flex flex-left items-center">
              <q-card-section class="">
                <q-avatar>
                  <img :src="props.row.patient.img" />
                </q-avatar>
              </q-card-section>

              <q-card-section class="truncate-patient">
                <div>{{ props.row.patient.name }}</div>
                <div class="te">{{ cleanDate(props.row.date) }}</div>
              </q-card-section>

              <q-card-section> </q-card-section>

              <q-separator />
            </q-card>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="patient" :props="props">
              <q-item dense>
                <q-item-section side>
                  <q-avatar>
                    <img :src="props.row.patient.img" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.row.patient.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
            <q-td key="date" :props="props">
              <q-item>
                <q-item-section>{{ cleanDate(props.row.date) }}</q-item-section>
              </q-item>
            </q-td>
            <q-td key="type" :props="props">
              <q-badge
                rounded
                outlined
                :color="props.row.type.color"
                :label="props.row.type.name"
              >
              </q-badge>
            </q-td>
            <q-td key="clinic" :props="props">
              <q-item>
                <q-item-section>{{ props.row.clinic }}</q-item-section>
              </q-item>
            </q-td>
            <q-td key="ref" :props="props">
              <q-item>
                <q-item-section class="text-grey">{{
                  props.row.ref
                }}</q-item-section>
              </q-item>
            </q-td>
            <q-td key="status" :props="props">
              <q-badge :color="props.row.status.color" transparent>
                {{ props.row.status.name }}
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import { useQuasar } from "quasar";
import { date } from "quasar";

const columns = [
  {
    name: "patient",
    align: "left",
    label: "Patient",
    field: (row) => row.patient.name,
    sortable: true,
    headerStyle: "padding-left: 2rem !important",
  },
  {
    name: "date",
    label: "Date",
    field: "date",
    align: "left",
    sort: (a, b, rowA, rowB) => new Date(rowB.date) - new Date(rowA.date),
    sortable: true,
    headerStyle: "padding-left: 2rem !important",
  },
  {
    name: "type",
    label: "Type",
    field: (row) => row.type.name,
    align: "left",
    sortable: true,
  },
  {
    name: "clinic",
    label: "Clinic",
    field: "clinic",
    align: "left",
    sortable: true,
    headerStyle: "padding-left: 2rem !important",
  },
  {
    name: "ref",
    label: "Ref",
    field: "ref",
    align: "left",
    sortable: true,
    headerStyle: "padding-left: 2rem !important",
  },
  {
    name: "status",
    label: "Status",
    field: (row) => row.status.name,
    align: "left",
    sortable: true,
  },
];

const rows = [
  {
    patient: {
      name: "Frozen Yogurt",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1613407308000,
    type: {
      name: "In-house",
      color: "cyan-5",
    },
    clinic: "Central Hospital of Yaoundé",
    ref: "9283928AF12",
    status: {
      name: "Due",
      color: "red",
    },
  },
  {
    patient: {
      name: "Ice cream sandwich",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1620909708000,
    type: {
      name: "In-house",
      color: "cyan-5",
    },
    clinic: "Central Hospital of Yaoundé",
    ref: "9283928AF12",
    status: {
      name: "Due",
      color: "red",
    },
  },
  {
    patient: {
      name: "Eclair",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1615545708000,
    type: {
      name: "Emergency",
      color: "negative",
    },
    clinic: "Yaoundé General Hospital",
    ref: "9283928AF12",
    status: {
      name: "Upcoming",
      color: "light-blue-6",
    },
  },
  {
    patient: {
      name: "Cupcake",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1634636508000,
    type: {
      name: "Medical",
      color: "deep-purple-6",
    },
    clinic: "Yaoundé General Hospital",
    ref: "9283928AF12",
    status: {
      name: "Completed",
      color: "green-13",
    },
  },
  {
    patient: {
      name: "Gingerbread",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1635867708000,
    type: {
      name: "Medical",
      color: "deep-purple-6",
    },
    clinic: "Baptist Hospital",
    ref: "9283928AF12",
    status: {
      name: "Upcoming",
      color: "light-blue-6",
    },
  },
  {
    patient: {
      name: "Jelly bean",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1640183448000,
    type: {
      name: "Medical",
      color: "deep-purple-6",
    },
    clinic: "Baptist Hospital",
    ref: "9283928AF12",
    status: {
      name: "Postponed",
      color: "amber-7",
    },
  },
  {
    patient: {
      name: "Lollipop",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1641133848000,
    type: {
      name: "In-house",
      color: "cyan-5",
    },
    clinic: "Laquintinie Hospital",
    ref: "9283928AF12",
    status: {
      name: "Postponed",
      color: "amber-7",
    },
  },
  {
    patient: {
      name: "Honeycomb",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1641385848000,
    type: {
      name: "Emergency",
      color: "negative",
    },
    clinic: "Laquintinie Hospital",
    ref: "9283928AF12",
    status: {
      name: "Upcoming",
      color: "light-blue-6",
    },
  },
  {
    patient: {
      name: "Donut",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1641810648000,
    type: {
      name: "Emergency",
      color: "negative",
    },
    clinic: "Laquintinie Hospital",
    ref: "9283928AF12",
    status: {
      name: "Completed",
      color: "green-13",
    },
  },
  {
    patient: {
      name: "KitKat",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1644750048000,
    type: { name: "Medical", color: "deep-purple-6" },
    clinic: "Yaoundé General Hospital",
    ref: "9283928AF12",
    status: {
      name: "Due",
      color: "red",
    },
  },
];

export default defineComponent({
  setup() {
    const $q = useQuasar();

    const cleanDate = (dateVal) => {
      return date.formatDate(dateVal, "MMM DD, HH:mm");
    };

    watch(
      () => $q.dark.isActive,
      (val) => {
        console.log(val ? "On dark mode" : "On light mode");
      }
    );
    return {
      visibleColumns: ref([
        "patients",
        "desc",
        "fat",
        "carbs",
        "protein",
        "clinic",
        "ref",
        "status",
      ]),

      columns,
      rows,
      cleanDate,
      filter: ref(""),
    };
  },
  data() {
    return {
      dashes: [
        {
          title: "Patients",
          count: 45,
          icon: "fa fa-hospital-user",
          bg: "radial-gradient(circle, rgb(255 0 0) 0%, rgb(123 15 15) 100%)",
        },
        {
          title: "Appointments",
          count: 100,
          icon: "event",
          bg: "radial-gradient(circle, #7a00ff 0%, rgb(25 12 134) 100%)",
        },
      ],
    };
  },

  computed: {},

  mounted() {
    console.log(
      "current date: ",
      new Date(date.formatDate(1613407308000, "MMM DD, HH:mm")).getTime()
    );
  },
});
</script>

<style lang="scss" scoped>
.mycard {
  width: 100%;
}

.jumbotron {
  background-color: $deep-purple-2;
}

.jumbotron-2 {
  background-color: $deep-purple-8;
}

.dash-title {
  width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate-patient {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
