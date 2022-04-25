/* eslint-disable prettier/prettier */
import http from "../../../http-common";

class PackgesService {
    getAll() {
        return http.get("/packages");
    }

    get(id) {
        return http.get(`/packages/${id}`);
    }

    create(data) {
        return http.post("/packages", data);
    }

    update(id, data) {
        return http.post(`/packages/${id}/update`, data);
    }

    delete(id) {
        return http.delete(`/packages/${id}`);
    }
}
export default new PackgesService();