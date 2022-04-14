import http from "../../../http-common";
class CityManagersService {
    getAll() {
        return http.get("/cities");
    }
    get(id) {
        return http.get(`/cities/${id}`);
    }
    create(data) {
        console.log(data)
        return http.post("/cities", data);
    }
    update(id, data) {
        return http.post(`/cities/${id}/update`, data);
    }
    delete(id) {
        return http.delete(`/cities/${id}`);
    }
}
export default new CityManagersService();