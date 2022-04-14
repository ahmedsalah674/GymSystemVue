/* eslint-disable prettier/prettier */
import http from "../../../http-common";
class GymService {
  getAll() {
    return http.get("/gyms");
  }
  get(id) {
    return http.get(`/gyms/${id}`);
  }
  create(data, config) {
    return http.post("/gyms", data, config);
  }
  update(id, data , config) {
    return http.post(`/gyms/${id}/update`, data , config);
  }
  delete(id) {
    return http.delete(`/gyms/${id}`);
  }
}
export default new GymService();