import http from "../../../http-common";
class GymMemberService {
    getAll() {
        return http.get("/gym-members");
    }
    get(id) {
        return http.get(`/gym-members/${id}`);
    }
    create(data, config) {
        return http.post("/gym-members/store", data, config);
    }
    update(id, data, config) {
        return http.post(`/gym-members/${id}/update`, data, config);
    }
    delete(id) {
        return http.delete(`/gym-members/${id}/delete`);
    }
}
export default new GymMemberService();