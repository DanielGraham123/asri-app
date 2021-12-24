<template>
  <div class="full-width row justify-center items-start">
    <div class="text-white card column q-py-md q-px-md">
      <q-form
        @submit="submitMethod"
        @reset="reset"
        ref="signupForm"
        class="authForm q-px-md"
        :class="[gutter != null ? gutter : 'q-gutter-md']"
        :style="{ width: formWidth }"
      >
        <slot></slot>

        <div>
          <slot name="button"></slot>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    submitMethod: { type: Function },
    formWidth: { type: String },
    gutter: { type: String },
  },
  methods: {
    reset() {
      // this.$refs.signupForm.value.resetValidation();
    },

    myTweak() {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration
      let offset = 171;
      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    },
  },
};
</script>

<style lang="scss" scoped>
.authForm {
  // width: 350px;
}
</style>
