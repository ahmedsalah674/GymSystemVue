/* eslint-disable prettier/prettier */
import http from "../../../http-common";
class CoachesService {
  getAll() {
      return http.get("/coaches");
  }
  get(id) {
      return http.get(`/coaches/${id}`);
  }
  create(data, config) {
      return http.post("/coaches", data, config);
  }
  update(id, data , config) {
      return http.post(`/coaches/${id}/update`, data , config);
  }
  delete(id) {
      return http.delete(`/coaches/${id}`);
  }
}
export default new CoachesService();