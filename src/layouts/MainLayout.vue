<template>
  <q-layout view="lHh Lpr lFf" class="shad">
    <q-header elevated style="background-color: var(--q-secondary)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-img src="~assets/tech.jpg" class="header-image absolute-top"></q-img>

        <!-- <div class="q-px-lg q-pt-lg q-pb-md">
          <div class="text-h3">Todo-M</div>
        </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
      :width="270"
      :breakpoint="600"
      class="text-white"
    >
      <q-toolbar-title class="absolute-top text-left q-pa-md q-ml-lg">
        A.S.R.I.
      </q-toolbar-title>

      <q-scroll-area
        style="
          height: calc(100% - 270px);
          margin-top: 50px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item style="border-bottom: 1px dotted grey" class="">
            <q-item-section style="max-width: 52px">
              <q-avatar>
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

          <q-item clickable v-ripple to="/">
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
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
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
</style>
