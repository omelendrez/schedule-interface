import HTTP from "../components/http-common";

export default {
  fetchTimeoffs() {
    return HTTP.get("timeoff");
  },
  saveTimeoff(payload) {
    if (payload.id === 0) {
      return HTTP.post("timeoff", payload);
    } else {
      return HTTP.put(`timeoff/${payload.id}`, payload);
    }
  },
  findByEmployee(payload) {
    return HTTP.get(`timeoff/${payload}/employee`);
  },
  findByDate(payload) {
    return HTTP.get(`timeoff/${payload}/date`);
  },
  deleteTimeoff(payload) {
    return HTTP.delete(`timeoff/${payload}`);
  }
};