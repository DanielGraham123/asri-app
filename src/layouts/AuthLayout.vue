<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-py-xl">
      <div class="text-center q-pb-0 q-mb-md">
        <q-icon name="img:asri-logo.png" class="logo-l" />

        <div class="text-white q-px-lg q-mt-md h5">
          {{ $t("appName") }}
        </div>
      </div>

      <router-view />

      <q-footer
        class="row q-px-md q-mb-sm align-center justify-between bg-transparent"
      >
        <div class="q-my-auto">Copyright &copy; A.S.R.I. 2022</div>

        <LangSwitcher
          class="q-mb-s"
          :outlined="true"
          :textColor="'orange'"
        ></LangSwitcher>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import LangSwitcher from "components/LanguageSwitcher.vue";

// import "../css/style.css";
import "../css/tailwind.css";

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
    LangSwitcher,
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

  methods: {},
});
</script>

<style lang="scss">
@import "../css/tailwind.css";

.q-page-container {
  // background: -webkit-linear-gradient(bottom, var(--q-dark), var(--q-primary));
  position: relative;
  z-index: 1;
  background-image: url(../assets/tech.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  max-width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-image: linear-gradient(to bottom right, #0c0c0c, #0f0f0f);
    background-image: linear-gradient(to bottom right, #060f4e, #0f0f0f);
    opacity: 0.2;
    z-index: -1;
  }
}

.logo-l {
  max-width: 100%;
  background-size: contain;
  font-size: 3.8rem !important;
  width: 92px;
  height: 107px;
}

@media (min-width: 991px) {
  .q-layout {
    position: fixed;
  }
}

@media (max-width: 991px) {
  .q-footer {
    position: absolute;
  }
}

@media (max-height: 525px) {
  .q-footer {
    position: absolute;
  }
  .q-layout {
    position: absolute;
  }
}
</style>
