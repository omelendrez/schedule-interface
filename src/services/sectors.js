import HTTP from "../components/http-common";

export default {
  fetchSectors() {
    return HTTP.get("sector");
  },
  saveSector(payload) {
    if (payload.id === 0) {
      return HTTP.post("sector", payload);
    } else {
      return HTTP.put(`sector/${payload.id}`, payload);
    }
  },
  deleteSector(payload) {
    return HTTP.delete(`sector/${payload}`);
  }
};
