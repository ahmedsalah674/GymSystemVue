/* eslint-disable prettier/prettier */
import http from "../../../http-common";
class StripeService {

  CreateToken(data) {
    return http.post("/stripe/token", data);
  }

  CreateCustomer(data) {
    return http.post("/stripe/customer", data);
  }

  CreateCharge(data) {
    return http.post("/stripe/charge", data);
  }

}
export default new StripeService();