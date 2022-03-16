// import router from "../../router";

export function patientProfile(state, payload) {
  state.profileToOpen = payload;

  localStorage.setItem("patientProfile", JSON.stringify(payload));
  console.log("this route", this.$route);
  this.$router.push({
    path: "/patient/profile"
  });
}
