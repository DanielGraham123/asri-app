<template>
  <!-- search field -->
  <div
    class="q-pa-md"
    :class="[searchClosed ? 'closed q-mr-xs-lg q-mr-sm-none' : 'full-width']"
    v-if="$q.screen.gt.sm"
    :style="[
      searchClosed ? {} : { maxWidth: '80%', transition: 'max-width 0.5s' },
    ]"
    id
  >
    <!-- <q-input
      rounded
      standout="bg-grey-13 black"
      placeholder="Search"
      dense
      @focus="searchClosed = false"
      @blur="!screen ? (searchClosed = true) : ''"
      hide-bottom-space
      v-model="searchText"
      class="text-negative"
      bottom-slots
      :bg-color="searchClosed ? 'transparent' : ''"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>-->
    <q-select
      v-model="searchModel"
      clearable
      rounded
      standout
      use-input
      :options="options"
      @filter="filterFn"
      @filter-abort="abortFilterFn"
      input-debounce="0"
      :placeholder="searchModel ? '' : 'Search'"
      hide-dropdown-icon
      for="search-field"
      class="q-px-sm cursor-inherit"
      dense
      :loading="false"
      color="primary"
    >
      <template #prepend>
        <q-icon round name="search"></q-icon>
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">No results</q-item-section>
        </q-item>
      </template>
      <template v-slot:option="{ opt, itemProps }">
        <q-item v-bind="itemProps">
          <q-item-section side>
            <q-avatar>
              <img :src="opt.image" alt />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ opt.name }}</q-item-label>
            <q-item-label caption>{{ opt.date }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="opt.type.color">{{ opt.type.name }}</q-badge>
          </q-item-section>
        </q-item>
      </template>

      <template #append>
        <q-btn flat size="15px" icon="photo_camera" @click="openCamera()"></q-btn>
      </template>

      <template #selected>
        <q-chip
          v-if="searchModel"
          dense
          square
          color="white"
          text-color="primary"
          class="q-my-none q-ml-xs q-mr-none"
        >
          <q-avatar size="sm">
            <img :src="searchModel.image" alt />
          </q-avatar>
          {{ searchModel.name }}
        </q-chip>
      </template>
    </q-select>
  </div>

  <!-- responsive search field -->
  <div class v-else>
    <q-btn icon="search" flat dense>
      <q-popup-edit
        style="width: 75%"
        v-model="searchModel"
        class="q-mr-md"
        auto-save
        v-slot="scope"
        id="mobile-search"
        :cover="false"
        :offset="[0, 0]"
      >
        <q-select
          v-model="scope.value"
          @keyup.enter="scope.set"
          clearable
          rounded
          standout
          use-input
          hide-selected
          :options="options"
          input-debounce="0"
          @filter="filterFn"
          @filter-abort="abortFilterFn"
          placeholder="Search"
          hide-dropdown-icon
          for="mobile-field"
          dense
        >
          <template #prepend>
            <q-icon name="search"></q-icon>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section side>
                <q-avatar>
                  <img :src="scope.opt.image" alt />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption>{{ scope.opt.date }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge :color="scope.opt.type.color">
                  {{
                  scope.opt.type.name
                  }}
                </q-badge>
              </q-item-section>
            </q-item>
          </template>

          <template #selected>
            <q-chip
              v-if="searchModel"
              dense
              square
              color="white"
              text-color="primary"
              class="q-my-none q-ml-xs q-mr-none"
            >
              <q-avatar size="sm">
                <img :src="searchModel.image" alt />
              </q-avatar>
              {{ searchModel.name }}
            </q-chip>
          </template>
        </q-select>
      </q-popup-edit>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useQuasar, date } from "quasar";
import { useRoute } from "vue-router";
import router from "../router/index";

const types = [
  { name: "Medical", color: "deep-purple-6" },
  { name: "Emergency", color: "negative" },
  { name: "In-house", color: "cyan-5" },
];

const stringOptions = [
  {
    name: "John Doe",
    image: require("../assets/John_Doe.png"),
    date: 1641133848000,
  },
  {
    name: "Jane Doe",
    image: require("../assets/Jane_Doe.png"),
    date: 1641810648000,
  },
].reduce((acc, opt) => {
  for (let i = 1; i <= 10; i++) {
    let randType = Math.floor(Math.random() * types.length);
    acc.push({
      name: opt.name + " " + i,
      image: opt.image,
      date: date.formatDate(opt.date, "MMM DD, HH:mm"),
      type: {
        name: types[randType].name,
        color: types[randType].color,
      },
    });
  }
  return acc;
}, []);

export default defineComponent({
  setup() {
    const $q = useQuasar();

    const searchClosed = ref("");

    const options = ref(stringOptions);
    const route = useRoute();

    const { searchModel } = ref(null);

    watch(
      () => $q.dark.isActive,
      (val) => {
        console.log(val ? "On dark mode" : "On light mode");
      }
    );

    return {
      searchClosed,
      searchModel,
      options,

      openCamera() {
        this.$router.push("/cam");
      },

      filterFn(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === "") {
                options.value = stringOptions;
              } else {
                const needle =
                  typeof val == "object"
                    ? val.name.toLowerCase()
                    : val.toLowerCase();
                console.log("needle: ", val);
                options.value = stringOptions.filter(
                  (v) => v.name.toLowerCase().indexOf(needle) > -1
                );
              }
            },

            // "ref" is the Vue reference to the QSelect
            (ref) => {
              if (val !== "" && ref.options.length > 0) {
                ref.setOptionIndex(-1); // reset optionIndex in case there is something selected
                ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
              }
            }
          );
        }, 200);
      },

      filterFnAutoselect(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === "") {
                options.value = stringOptions;
              } else {
                const needle = val.toLowerCase();
                options.value = stringOptions.filter(
                  (v) => v.name.toLowerCase().indexOf(needle) > -1
                );
              }
            },

            // "ref" is the Vue reference to the QSelect
            (ref) => {
              if (
                val !== "" &&
                ref.options.length > 0 &&
                ref.getOptionIndex() === -1
              ) {
                ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
                ref.toggleOption(ref.options[ref.optionIndex], true); // toggle the focused option
                console.log("options:", ref.options[ref.optionIndex]);
              }
            }
          );
        }, 150);
      },

      abortFilterFn() {
        // console.log('delayed filter aborted')
      },

      setModel(val) {
        console.log("set model: ", val.name);
        searchModel.value = val.name;
        console.log("search model: ", searchModel.value);
      },
    };
  },

  data() {
    return {
      miniState: true,
      searchText: "",
    };
  },

  computed: {
    screen() {
      return this.$q.screen.gt.sm;
    },
  },

  watch: {
    screen(val) {
      this.searchClosed = val ? false : true;
      console.log("search closed: ", this.searchClosed, val);
    },
  },

  mounted() {
    console.log("current screen: ", this.$q.screen.gt.sm);
    // this.screen = this.$q.screen.gt.sm;
    this.searchClosed = this.screen ? false : true;
  },
});
</script>

<style lang="scss" scoped></style>
