<template>
  <q-page class="signUp">
    <div class="full-width row justify-center items-start">
      <div class="bg-white card shadow-1 column q-pa-lg">
        <!-- <div class="col-md-12 content-center"> -->
        <q-form
          @submit="submitSignUp"
          @reset="reset"
          ref="signupForm"
          class="q-gutter-md authForm"
        >
          <div class="q-py-sm text-center">
            <div class="text-h5 text-primary">Create Your Account</div>
            <div class="text-subtitle-2 text-secondary">
              Enter your personal details to create your account
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
          />

          <q-input
            filled
            dense
            type="password"
            v-model="password"
            label="Your Password"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Password is required',
              (val) =>
                val.length >= 6 || 'Password should at least 6 characters',
            ]"
          />

          <q-toggle
            v-model="acceptTerms"
            label="I accept the license and terms"
          />

          <div>
            <q-btn
              label="CREATE ACCOUNT"
              class="glossy"
              type="submit"
              size="md"
              color="primary"
              style="width: 100%"
            />
          </div>
        </q-form>
        <!-- </div> -->
      </div>
    </div>

    <!-- Already have an account -->
    <div class="text-center q-py-md">
      <div class="text-white">
        Already have an account?
        <router-link to="/" style="text-decoration: none" class="text-warning"
          >Sign In</router-link
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
    };
  },

  methods: {
    submitSignUp() {
      console.log("user uid: ", this.userID);
      console.log("user password: ", this.password);
      console.log("user terms: ", this.acceptTerms);
    },

    reset() {
      // this.$refs.signupForm.value.resetValidation();
    },
  },
};
</script>

