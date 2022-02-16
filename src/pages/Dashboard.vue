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
            <div class="col">
              <q-card-section>
                <div class="text-weight-medium text-h5 dash-title text-sm-h6">
                  {{ dash.title }}
                </div></q-card-section
              >

              <q-card-section>
                <div class="text-h3 text-weight-bold">{{ dash.count }}</div>
              </q-card-section>
            </div>

            <div class="col">
              <q-card-section>
                <q-icon
                  :name="dash.icon"
                  :size="$q.screen.gt.sm ? 'xl' : 'md'"
                  class="full-width"
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
        :grid="$q.screen.lt.md"
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
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
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
                {{ cleanDate(props.row.date) }}
              </q-item>
            </q-td>
            <q-td key="carbs" :props="props">
              <q-badge color="orange">
                {{ props.row.carbs }}
              </q-badge>
            </q-td>
            <q-td key="protein" :props="props">
              <q-badge color="primary">
                {{ props.row.protein }}
              </q-badge>
            </q-td>
            <q-td key="sodium" :props="props">
              <q-badge color="teal">
                {{ props.row.sodium }}
              </q-badge>
            </q-td>
            <q-td key="calcium" :props="props">
              <q-badge color="accent">
                {{ props.row.calcium }}
              </q-badge>
            </q-td>
            <q-td key="iron" :props="props">
              <q-badge color="amber">
                {{ props.row.iron }}
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
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    patient: {
      name: "Frozen Yogurt",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1613407308000,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    patient: {
      name: "Ice cream sandwich",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1620909708000,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    patient: {
      name: "Eclair",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1615545708000,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    patient: {
      name: "Cupcake",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1634636508000,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    patient: {
      name: "Gingerbread",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1635867708000,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    patient: {
      name: "Jelly bean",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1640183448000,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    patient: {
      name: "Lollipop",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1641133848000,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    patient: {
      name: "Honeycomb",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1641385848000,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    patient: {
      name: "Donut",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1641810648000,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    patient: {
      name: "KitKat",
      img: "https://cdn.quasar.dev/img/avatar.png",
    },
    date: 1644750048000,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
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
        "sodium",
        "calcium",
        "iron",
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
</style>
