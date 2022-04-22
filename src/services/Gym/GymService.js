/* eslint-disable prettier/prettier */
import http from "../../../http-common";
class GymService {
  getAll() {
    return http.get("/gyms");
  }
  get(id) {
    return http.get(`/gyms/${id}`);
  }
  removeManager(data) {
    return http.post(`gym-remove-manager`, data);
  }
  addManager(data) {
    return http.post(`gym-add-manager`, data);
  }
  create(data) {
    console.log(data);
    return http.post("/gyms", data);
  }
  update(id, data) {
    return http.post(`/gyms/${id}/update`, data);
  }
  delete(id) {
    return http.delete(`/gyms/${id}`);
  }
}
export default new GymService();