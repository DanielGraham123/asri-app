<template>
  <q-page class="signUp">
    <form-frame
      :submitMethod="submitSignUp"
      :gutter="'q-gutter-x-sm'"
      :formWidth="formWidth"
    >
      <!-- Row 1 -->
      <div class="row rf">
        <div class="col-sm-6 col-xs-12 q-gutter-x-sm">
          <q-input
            outlined
            square
            dark
            v-model="userData.firstName"
            :label="$t('FirstName')"
            color="white"
            lazy-rules
            dense
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                $t('FirstName') + ' ' + $t('required'),
            ]"
          />
        </div>

        <div class="col-sm-6 col-xs-12 q-gutter-x-sm">
          <q-input
            outlined
            square
            dark
            v-model="userData.lastName"
            :label="$t('LastName')"
            color="white"
            lazy-rules
            dense
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                $t('LastName') + ' ' + $t('required'),
            ]"
          />
        </div>
      </div>

      <!-- Row 2 -->
      <div class="row rf">
        <div class="col-sm-6 col-xs-12 q-gutter-x-sm">
          <q-input
            outlined
            square
            dark
            v-model="userData.email"
            :label="$t('email')"
            color="white"
            lazy-rules
            dense
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                $t('email') + ' ' + $t('required'),
            ]"
          />
        </div>

        <div class="col-sm-6 col-xs-12 q-gutter-x-sm">
          <q-input
            outlined
            dense
            square
            dark
            color="white"
            v-model="userData.phone"
            :label="$t('phone')"
            mask="+237 ### ### ###"
            fill-mask
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                $t('phone') + ' ' + $t('required'),
            ]"
          />
        </div>
      </div>

      <!-- Row 3 -->
      <div class="row rf">
        <div class="col-sm-6 col-xs-12 q-gutter-x-sm">
          <q-input
            outlined
            square
            dark
            color="grey-5"
            dense
            v-model="userData.dob"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="userData.dob">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-sm-6 col-xs-12 q-gutter-x-sm">
          <q-select
            outlined
            v-model="userData.field"
            :options="fieldOptions"
            label-color="grey-5"
            dense
            square
            emit-value
            map-options
            options-dense
            :label="$t('field')"
          />
        </div>
      </div>

      <!-- Row 4 -->
      <div class="row q-mt-auto q-mb-xs">
        <div class="col-md-12 row justify-between items-center q-gutter-x-sm">
          <div class="text-italic text-grey-5">{{ $t("additional") }}?</div>
          <q-btn
            flat
            :label="$t('comment')"
            color="info"
            @click="prompt = true"
          />
        </div>
      </div>

      <q-dialog v-model="prompt" persistent>
        <q-card
          style="
            min-width: 350px;
            background: radial-gradient(circle, #173bb7 0%, rgb(14 26 80) 100%);
          "
        >
          <q-card-section>
            <div class="text-h6 text-grey-5">{{ $t("comment") }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              v-model="userData.comment"
              color="grey-5"
              outlined
              square
              dark
              dense
              type="textarea"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" color="negative" v-close-popup />
            <q-btn flat label="Add address" color="grey-5" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <template #button>
        <q-btn
          :label="$t('submitUser')"
          class="glossy text-uppercase"
          type="submit"
          size="md"
          color="primary"
          style="width: 100%"
        />
      </template>
    </form-frame>
    <!-- Already have an account -->
    <div class="text-center q-pb-lg">
      <div class="text-grey-5">
        Already have an account?
        <router-link to="/" style="text-decoration: none" class="text-warning"
          >Sign In</router-link
        >
      </div>
    </div>

    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import FormFrame from "../components/FormFrame.vue";

export default {
  name: "SignUp",
  components: {
    FormFrame,
  },

  data() {
    return {
      userID: "",
      password: "",
      acceptTerms: false,
      prompt: false,
      formWidth: "450px",
      fieldOptions: [
        this.$t("security"),
        this.$t("medecine"),
        this.$t("finance"),
      ],

      // user data
      userData: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        field: "",
        dob: "1983/04/19",
        comment: "",
      },
    };
  },

  methods: {
    submitSignUp() {
      console.log("user uid: ", this.userID);
      console.log("user password: ", this.password);
      console.log("user terms: ", this.acceptTerms);
    },

    onResize(size) {
      console.log(size);
      // {
      //   width: 1200 // width of viewport (in px)
      //   height: 920 // height of viewport (in px)
      // }
      if (size.width > 600) {
        //md is 992px
        this.formWidth = "500px";
      } else {
        this.formWidth = "100%";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row.rf {
  justify-content: space-between;
}

@media (max-width: 600px) {
  .row.rf {
    justify-content: center;
  }
}
</style>
