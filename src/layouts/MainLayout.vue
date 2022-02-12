<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="[$q.dark.mode ? 'bg-dark-toolbar' : 'bg-white']">
      <q-toolbar
        class="text-dark shadow-1"
        :class="[$q.dark.mode ? 'text-white' : '']"
      >
        <!-- page title -->
        <div class="q-pa-sm">
          <div class="text-h6">Dashboard</div>
        </div>

        <!-- search field -->
        <div class="q-py-md q-px-md" color="negative" style="min-width: 680px">
          <q-input
            rounded
            standout="bg-grey-13 black"
            placeholder="Search"
            dense
            hide-bottom-space
            v-model="searchText"
            class="text-negative"
            bottom-slots
            clearable
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <!-- switch dark button -->
        <q-btn
          flat
          dense
          round
          :icon="$q.dark.mode ? 'light_mode' : 'dark_mode'"
          @click="switchDark()"
          class="q-mx-md"
        ></q-btn>

        <!-- notifications -->
        <q-btn flat round dense icon="notifications_none" class="q-mr-md" />

        <!-- translate dropdown -->
        <q-select
          :options="flags"
          flat
          dense
          v-model="locale"
          emit-value
          map-options
          options-dense
          :style="$q.screen.gt.sm ? { minWidth: '60px' } : ''"
          bg-color="transparent"
          class="q-mr-md"
          :fill-input="$q.screen.gt.sm ? true : false"
          :hide-selected="$q.screen.gt.sm ? false : true"
          borderless
          :outlined="$q.screen.gt.sm ? true : false"
        >
          <template #prepend>
            <q-icon
              v-if="locale"
              :name="'img:flags/' + locale.split('-')[1].toLowerCase() + '.svg'"
            />
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section side>
                <q-icon :name="'img:flags/' + scope.opt.flag + '.svg'" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <!-- profile -->
        <q-btn flat dense rounded class="" icon-right="arrow_drop_down">
          <q-avatar class="q-mx-sm">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <!-- <div class="text-weight-bold text-">John Doe</div> -->

          <q-menu fit anchor="bottom left" self="top left">
            <q-list style="mpx">
              <q-item clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Inbox</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Account Settings</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="270"
      :breakpoint="600"
      class="text-white"
      :class="$q.dark.mode ? 'dark-drawer' : ''"
      :dark="$q.dark.mode ? true : false"
    >
      <!-- height: calc(100% - 270px) -->
      <q-scroll-area style="height: 100%">
        <q-list>
          <q-item class="q-pb-md">
            <q-item-section avatar>
              <q-icon class="dash-logo" name="img:asri-icon.png" />
            </q-item-section>

            <q-item-section>
              <div class="text-h5">A.S.R.I.</div>
            </q-item-section>
          </q-item>

          <q-item style="border-bottom: 1px dotted grey" class="">
            <q-item-section avatar>
              <q-avatar style="max-width: 52px">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="text-grey-3">
                <div class="text-weight-bold text-">John Doe</div>
                <div class="text-">Hopital la Quintini</div>
              </div></q-item-section
            >
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Patient </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>

            <q-item-section> Appointments </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section> Settings </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="absolute-bottom q-mb-sm" to="/">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img src="~assets/tech.jpg" class="side-bg absolute-top"></q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LangSwitcher from "components/LanguageSwitcher.vue";
import { useQuasar } from "quasar";

const translateOptions = [
  { label: "English", value: "en-US", country: "United States", flag: "us" },
  { label: "French", value: "fr-FR", country: "France", flag: "fr" },
];

import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { watch } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    LangSwitcher,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const { locale } = useI18n({ useScope: "global" });
    const $q = useQuasar();

    // calling here; equivalent to when component is created
    const switchDark = () => {
      $q.dark.toggle();
    };

    watch(
      () => $q.dark.isActive,
      (val) => {
        console.log(val ? "On dark mode" : "On light mode");
      }
    );

    return {
      locale,
      flags: translateOptions,
      leftDrawerOpen,
      switchDark,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  data() {
    return {
      miniState: true,
      searchText: "",
      // flags: translateOptions,
      // flagLocale: translateOptions[0],
    };
  },

  watch: {},

  methods: {},
});
</script>

<style lang="scss">
.header-image,
.side-bg {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}

.side-bg::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-image: linear-gradient(to bottom right, #0c0c0c, #0f0f0f);
  background: linear-gradient(to bottom right, #0c0c0c, #0f0f0f);
}

.q-item__section--side > .q-icon.dash-logo {
  font-size: 42px !important;
}

.black {
  color: black;
}
</style>
