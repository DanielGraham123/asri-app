<template>
  <q-page class="signIn">
    <div class="full-width row justify-center items-start">
      <div class="bg-white card shadow-1 column q-pa-lg">
        <q-form
          @submit="submitSignIn"
          @reset="reset"
          ref="signinForm"
          class="q-gutter-md authForm"
        >
          <div class="q-py-sm text-center">
            <div class="text-h5 text-primary">LogIn</div>
            <div class="text-subtitle-2 text-secondary">
              Welcome back! Login to your account
            </div>
          </div>

          <q-input
            filled
            v-model="userID"
            label="Your user ID *"
            hint="Your ASRI Identifier"
            lazy-rules
            dense
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter you User ID',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            filled
            dense
            v-model="password"
            label="Your Password *"
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              (val) => (val !== null && val !== '') || 'Password is required',
              (val) =>
                val.length >= 6 || 'Password should at least 6 characters',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-toggle
            v-model="acceptTerms"
            label="I accept the license and terms"
          />

          <div>
            <q-btn
              label="LOGIN"
              class="glossy"
              type="submit"
              size="md"
              color="primary"
              style="width: 100%"
            />
          </div>
        </q-form>
      </div>
    </div>

    <!-- Already have an account -->
    <div class="text-center q-py-md">
      <div class="text-grey-5">
        Don't have an account?
        <router-link
          to="/register"
          class="text-warning"
          style="text-decoration: none"
          >Sign up</router-link
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default {
  data() {
    return {
      userID: "",
      password: "",
      acceptTerms: false,
      password: "",
      isPwd: true,
    };
  },

  methods: {
    submitSignIn() {
      console.log("user uid: ", this.userID);
      console.log("user password: ", this.password);
      console.log("user terms: ", this.acceptTerms);
      this.$router.push("/dashboard");
    },

    reset() {
      // this.$refs.signinForm.value.resetValidation();
    },
  },
};
</script>

<style scoped>
/* .signIn {
  z-index: 10;
} */
</style>
