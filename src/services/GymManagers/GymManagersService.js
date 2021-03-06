/* eslint-disable prettier/prettier */
import http from "../../../http-common";
class GymManagersService {
    getAll() {
        return http.get("/gymmanagers");
    }
    getWithoutGyms() {
        return http.get("/gymmanagers-withoutGyms");
    }
    get(id) {
        return http.get(`/gymmanagers/${id}`);
    }
    create(data, config) {
        return http.post("/gymmanagers", data, config);
    }
    update(id, data , config) {
        return http.post(`/gymmanagers/${id}/update`, data , config);
    }
    delete(id) {
        return http.delete(`/gymmanagers/${id}`);
    }
}
export default new GymManagersService();