/* eslint-disable prettier/prettier */
import http from "../../../http-common";
class StripeOperationService {

  getAll() {
    return http.get("/stripe/operation");
  }

  get(id) {
    return http.get(`/stripe/operation/${id}`);
  }

  create(data) {
    return http.post("/stripe/operation", data);
  }

  update(id, data) {
    return http.put(`/stripe/operation/${id}`, data);
  }

  delete(id) {
    return http.delete(`/stripe/operation/${id}`);
  }

}
export default new StripeOperationService();