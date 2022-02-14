<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="[$q.dark.mode ? 'bg-dark-toolbar' : 'bg-white']">
      <q-toolbar
        class="text-dark shadow-1"
        :class="[$q.dark.mode ? 'text-white' : '']"
      >
        <!-- page title -->
        <div class="q-pa-sm flex items-center no-wrap">
          <q-btn
            icon="menu"
            flat
            dense
            @click="leftDrawerOpen = !leftDrawerOpen"
            class="q-mr-md-sm q-mr-sm-md"
          ></q-btn>
          <div class="text-h6 truncate">
            {{ $t("dashboard") }}

            <q-tooltip> {{ $t("dashboard") }} </q-tooltip>
          </div>
        </div>

        <q-space></q-space>

        <!-- search field -->
        <div
          class="q-pa-md"
          :class="[
            searchClosed ? 'closed q-mr-xs-lg q-mr-sm-none' : 'full-width',
          ]"
          v-if="$q.screen.gt.sm"
          :style="[
            searchClosed
              ? {}
              : { maxWidth: '80%', transition: 'max-width 0.5s' },
          ]"
        >
          <q-input
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
          </q-input>
        </div>

        <!-- responsive search field -->
        <!-- <q-btn icon="search" flat dense round class=""> -->
        <div class="cursor-pointer" v-else>
          <q-btn icon="search" flat dense>
            <q-popup-edit
              style="max-width: 100%"
              v-model="searchText"
              anchor="center middle"
              self="center middle"
              fit
              class="full-width q-mr-md"
              auto-save
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-btn>
        </div>
        <!-- </q-btn> -->

        <q-space v-if="$q.screen.gt.sm"></q-space>

        <!-- switch dark button -->
        <q-btn
          flat
          dense
          round
          :icon="$q.dark.mode ? 'light_mode' : 'dark_mode'"
          @click="switchDark()"
          class="q-mr-sm"
          v-if="$q.screen.gt.sm"
        ></q-btn>

        <!-- notifications -->
        <q-btn
          flat
          round
          dense
          icon="notifications_none"
          class="q-mr-md-md q-mr-sm-none"
        />

        <!-- translate dropdown -->
        <q-select
          :options="flags"
          v-if="$q.screen.gt.sm"
          flat
          dense
          v-model="locale"
          emit-value
          map-options
          options-dense
          :style="$q.screen.gt.sm ? { minWidth: '60px' } : ''"
          bg-color="transparent"
          borderless
          hide-dropdown-icon
          class="q-mr-md"
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
        <q-btn round :ripple="false" push class="q-ml-md-md q-ml-sm-md q-mr-sm">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <!-- <div class="text-weight-bold text-">John Doe</div> -->

          <q-menu fit anchor="bottom start" self="top left">
            <q-list dense style="min-width: 200px">
              <q-item clickable v-close-popup>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Inbox</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Account Settings</q-item-section>
              </q-item>

              <q-separator v-if="$q.screen.lt.md"></q-separator>

              <q-item clickable v-if="$q.screen.lt.md">
                <q-item-section side
                  ><q-icon name="translate"></q-icon
                ></q-item-section>
                <q-item-section>Translate</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <!-- language submenu -->
                <q-menu anchor="top end" self="top start">
                  <q-list dense>
                    <q-item
                      clickable
                      v-close-popup
                      v-for="flag in flags"
                      :key="'menu-' + flag.value"
                      @click="switchLanguage(flag)"
                    >
                      <q-item-section
                        ><q-icon
                          :name="'img:flags/' + flag.flag + '.svg'"
                        ></q-icon
                      ></q-item-section>
                      <q-item-section>{{ flag.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>

              <q-item clickable v-if="$q.screen.lt.md" @click="switchDark()">
                <q-item-section side
                  ><q-icon
                    :name="$q.dark.mode ? 'dark_mode' : 'light_mode'"
                  ></q-icon
                ></q-item-section>
                <q-item-section>{{
                  $q.dark.mode ? "Light Mode" : "Dark Mode"
                }}</q-item-section>
              </q-item>

              <q-separator></q-separator>

              <q-item clickable v-close-popup>
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

          <q-item clickable v-close-popup v-ripple>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-close-popup v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Patient </q-item-section>
          </q-item>

          <q-item clickable v-close-popup v-ripple>
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>

            <q-item-section> Appointments </q-item-section>
          </q-item>

          <q-item clickable v-close-popup v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section> Settings </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            v-ripple
            class="absolute-bottom q-mb-sm"
            to="/"
          >
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
import Vue2Filters from "vue2-filters";

export default defineComponent({
  name: "MainLayout",

  // mixins: [Vue2Filters.install],

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

    const switchLanguage = (lang) => {
      console.log("current lang", lang);
      console.log("current locale: ", locale);
      locale.value = lang.value;
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
      switchLanguage,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  data() {
    return {
      miniState: true,
      searchText: "",
      searchClosed: false,
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

  methods: {},

  mounted() {
    console.log("current screen: ", this.$q.screen.gt.sm);
    this.screen = this.$q.screen.gt.sm;
    this.searchClosed = this.$q.screen.gt.sm ? false : true;
  },
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

.truncate {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.closed {
  max-width: 8.4% !important;
}
</style>
