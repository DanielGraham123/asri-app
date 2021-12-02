<template>
  <q-page class="full-width row justify-center items-center">
    <div class="bg-white card shadow-1 column q-pa-lg">
      <!-- <div class="col-md-12 content-center"> -->
      <q-form
        @submit="submitSignUp"
        @reset="reset"
        ref="signupForm"
        class="q-gutter-md authForm"
      >
        <div class="q-py-sm">
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
            (val) => val.length >= 6 || 'Password should at least 6 characters',
          ]"
        />

        <q-toggle
          v-model="acceptTerms"
          label="I accept the license and terms"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>

        <!-- Already have an account -->
        <div class="text-center q-py-md">
          <div class="">
            Already have an account?
            <router-link to="/" style="text-decoration: none"
              >Sign In</router-link
            >
          </div>
        </div>
      </q-form>
      <!-- </div> -->
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

