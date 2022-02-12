<template>
  <q-page
    class="q-px-lg q-py-lg"
    :class="[$q.dark.mode ? 'bg-dark-body' : 'bg-grey-2']"
  >
    <div class="row q-col-gutter-md items-end">
      <div class="col-xs-6 q-ml-auto">
        <q-card :class="[$q.dark.mode ? 'jumbotron-2' : 'jumbotron']">
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-xs-8">
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
              <div class="col-xs-4">
                <q-img src="~assets/welcom.png"></q-img>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-3" v-for="(dash, index) in dashes" :key="index">
        <q-card
          class="mycard text-white q-pa-sm"
          :style="{ background: dash.bg }"
        >
          <div class="row items-center">
            <div class="col">
              <q-card-section>
                <div class="text-h5">{{ dash.title }}</div></q-card-section
              >

              <q-card-section>
                <div class="text-h3 text-weight-bold">{{ dash.count }}</div>
              </q-card-section>
            </div>

            <div class="col">
              <q-card-section>
                <q-icon :name="dash.icon" size="xl" class="full-width"></q-icon>
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
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="calories" :props="props">
              <q-badge color="green">
                {{ props.row.calories }}
              </q-badge>
            </q-td>
            <q-td key="fat" :props="props">
              <q-badge color="purple">
                {{ props.row.fat }}
              </q-badge>
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
import { defineComponent, watch } from "vue";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
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
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
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
    watch(
      () => $q.dark.isActive,
      (val) => {
        console.log(val ? "On dark mode" : "On light mode");
      }
    );
    return {
      columns,
      rows,
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
</style>
