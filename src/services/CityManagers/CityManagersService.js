import http from "../../../http-common";
class CityManagersService {
    config = {
        headers: {
            'Content-Type': "multipart/form-data",
            // 'Authorization': "Bearer " + this.token,
            // 'Accept': "application/json",
        },
    };
    getAll() {
        return http.get("/citymanagers");
    }
    get(id) {
        return http.get(`/citymanagers/${id}`);
    }
    create(data) {
        // console.log(data)
        return http.post("/citymanagers", data, this.config);
    }
    update(id, data) {
        return http.post(`/citymanagers/${id}/update`, data, this.config);
    }
    delete(id) {
        return http.delete(`/citymanagers/${id}`);
    }
}
export default new CityManagersService();