import http from "../../../http-common";
class revenueServices {
    getAll() {
        return http.get("/stripe/operation");
    }
    getAllFormat() {
        return http.get("/stripe/operationformat");
    }
    get(id) {
        return http.get(`/revenue/${id}`);
    }
    delete(id) {
        return http.delete(`/stripe/operation/${id}`);
    }
}
export default new revenueServices(); 