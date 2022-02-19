// import router from "../../router";

export function patientProfile(state, payload) {
  state.profileToOpen = payload;
  this.$router.push({ path: "/patient/profile" });
}
