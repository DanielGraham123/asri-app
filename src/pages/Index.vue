<template>
  <q-page class="signIn">
    <form-frame :submitMethod="submitSignIn" :formWidth="'350px'">
      <q-input
        outlined
        square
        dark
        elevated
        color="white"
        v-model="userID"
        label="Your user ID *"
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
        outlined
        square
        dark
        elevated
        dense
        color="white"
        v-model="password"
        label="Your Password *"
        lazy-rules
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          (val) => (val !== null && val !== '') || 'Password is required',
          (val) => val.length >= 6 || 'Password should at least 6 characters',
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

      <template #button>
        <q-btn
          label="LOGIN"
          class="glossy"
          type="submit"
          size="md"
          color="primary"
          style="width: 100%"
        />
      </template>
    </form-frame>

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
import FormFrame from "../components/FormFrame.vue";

export default {
  components: { FormFrame },
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
