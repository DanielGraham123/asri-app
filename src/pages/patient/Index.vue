<template>
  <q-page
    class="q-pa-lg"
    :class="[$q.dark.mode ? 'bg-dark-body' : 'bg-grey-2']"
  >
    <div class="row justify-between">
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
        <q-breadcrumbs-el label="List" icon="fas fa-clipboard-list" />
      </q-breadcrumbs>

      <q-btn
        color="primary"
        icon-right="archive"
        label="Export to csv"
        no-caps
        size="sm"
        @click="exportTable"
      />
    </div>

    <!-- Historic Patient listing -->
    <div class="q-py-md">
      <q-table
        title="All Appointments"
        :rows="rows"
        :columns="columns"
        row-key="index"
        :table-header-style="{
          textTransform: 'uppercase',
          color: 'grey',
        }"
        :filter="filter"
        :loading="loading"
        virtual-scroll
        :virtual-scroll-item-size="48"
        :virtual-scroll-sticky-size-start="48"
        class="my-sticky-virtscroll-table"
        :pagination="pagination"
        @virtual-scroll="onScroll"
        :table-colspan="7"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>

        <template v-slot:top>
          <div class="text-h5">Patients List</div>

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
            <q-td key="address" :props="props">
              <q-item>
                <q-item-section>{{ props.row.address }}</q-item-section>
              </q-item>
            </q-td>
            <q-td key="age" :props="props">
              <q-item>
                <q-item-section>{{ props.row.age }}</q-item-section>
              </q-item>
            </q-td>
            <q-td key="phone" :props="props">
              <q-item>
                <q-item-section>{{ props.row.phone }}</q-item-section>
              </q-item>
            </q-td>
            <q-td key="lastvisit" :props="props">
              <q-item>
                <q-item-section class="text-grey-7">{{
                  cleanDate(props.row.lastvisit)
                }}</q-item-section>
              </q-item>
            </q-td>
            <q-td key="lasttreatment" :props="props">
              <q-item>
                <q-item-section>{{ props.row.lasttreatment }}</q-item-section>
              </q-item>
            </q-td>
            <!-- <q-td key="gender" :props="props">
              <q-item>
                <q-item-section>{{ props.row.gender }}</q-item-section>
              </q-item>
            </q-td> -->
            <q-td>
              <q-btn
                @click="openProfile(props.row)"
                icon="fas fa-eye"
                flat
                round
                dense
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar, date, exportFile } from "quasar";
import { useStore } from "vuex";
import patients from "../../assets/data/patients-list.json";

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
    name: "address",
    label: "Address",
    field: "address",
    align: "left",
    sortable: true,
    headerStyle: "padding-left: 2rem !important",
  },
  {
    name: "age",
    label: "Age",
    field: "age",
    align: "left",
    sortable: true,
  },
  {
    name: "phone",
    label: "Phone",
    field: "phone",
    align: "left",
    headerStyle: "padding-left: 2rem !important",
  },
  {
    name: "lastvisit",
    label: "Last Visit",
    field: "lastvisit",
    align: "left",
    sort: (a, b, rowA, rowB) =>
      new Date(rowB.lastvisit) - new Date(rowA.lastvisit),
    sortable: true,
    headerStyle: "padding-left: 2rem !important",
  },
  {
    name: "lasttreatment",
    label: "Last Treatment",
    field: "lasttreatment",
    align: "left",
    sortable: true,
    headerStyle: "padding-left: 2rem !important",
  },
  // {
  //   name: "gender",
  //   label: "Gender",
  //   field: "gender",
  //   align: "left",
  //   sortable: true,
  //   headerStyle: "padding-left: 2rem !important",
  // },
];

const seed = patients.rows;

// we generate lots of rows here
let allRows = [];
for (let i = 0; i < 1000; i++) {
  allRows = allRows.concat(seed.slice(0).map((r) => ({ ...r })));
}
allRows.forEach((row, index) => {
  row.index = index;
});

const pageSize = 100;
const lastPage = Math.ceil(allRows.length / pageSize);

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted
    .split('"')
    .join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    .split("\n")
    .join("\\n")
    .split("\r")
    .join("\\r");

  return `"${formatted}"`;
}

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const cleanDate = (dateVal) => {
      return date.formatDate(dateVal, "MMM DD, YYYY");
    };

    const nextPage = ref(2);

    const rows = computed(() =>
      allRows.slice(0, pageSize * (nextPage.value - 1))
    );

    const loading = ref(false);

    return {
      columns,
      rows,
      cleanDate,
      filter: ref(""),
      pagination: ref({
        sortBy: "desc",

        rowsPerPage: 15,
      }),

      loading,

      nextPage,
      // profileToOpen,

      onScroll({ to, ref }) {
        const lastIndex = rows.value.length - 1;

        if (
          loading.value !== true &&
          nextPage.value < lastPage &&
          to === lastIndex
        ) {
          loading.value = true;

          setTimeout(() => {
            nextPage.value++;
            nextTick(() => {
              ref.refresh();
              loading.value = false;
            });
          }, 500);
        }
      },

      exportTable() {
        // naive encoding to csv format
        console.log("rows: ", rows.value);
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            rows.value.map((row) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile("patients-list.csv", content, "text/csv");

        if (status !== true) {
          $q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },

      openProfile(profile) {
        $store.commit("patient/patientProfile", profile);
        console.log("opening profile: ", profile);
      },
    };
  },
});
</script>
