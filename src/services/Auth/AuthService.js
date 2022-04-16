import http from "../../../http-common";

class AuthService {
  login(email, password) {
    return http.post("/login", { email, password });
  }
}

export default new AuthService();