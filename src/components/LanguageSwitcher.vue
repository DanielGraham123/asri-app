<template>
  <div id="langSwitcher">
    <q-select
      v-model="locale"
      :options="localeOptions"
      label-color="grey-11"
      dense
      outlined
      emit-value
      map-options
      options-dense
      bg-color="transparent"
      style="min-width: 150px"
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
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export default {
  props: {},
  setup() {
    const { locale } = useI18n({ useScope: "global" });

    return {
      locale,
      localeOptions: [
        {
          label: "English",
          value: "en-US",
          country: "United States",
          flag: "us",
        },
        { label: "French", value: "fr-FR", country: "France", flag: "fr" },
      ],
    };
  },

  mounted() {
    console.log("textColor:", this.textColor);
  },
};
</script>

<style scoped></style>
