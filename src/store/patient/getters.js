export function getPatientProfile(state) {
  return state.profileToOpen
    ? state.profileToOpen
    : JSON.parse(localStorage.getItem("patientProfile"));
}
