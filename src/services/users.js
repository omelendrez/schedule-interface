import HTTP from "../components/http-common";

export default {
  fetchUsers() {
    return HTTP.get("user");
  },
  login(payload) {
    return HTTP.get("login", { params: payload });
  },
  saveUser(payload) {
    if (payload.id === 0) {
      return HTTP.post("user", payload);
    } else {
      return HTTP.put(`user/${payload.id}`, payload);
    }
  },
  deleteUser(payload) {
    return HTTP.delete(`user/${payload}`);
  }
};
