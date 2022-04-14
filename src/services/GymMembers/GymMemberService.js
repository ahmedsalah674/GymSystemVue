import http from "../../../http-common";
class GymMemberService {
    getAll() {
        return http.get("/gym-members");
    }
    get(id) {
        return http.get(`/gym-members/${id}`);
    }
    create(data) {
        return http.post("/gym-members/store", data);
    }
    update(id, data) {
        return http.post(`/gym-members/${id}/update`, data);
    }
    delete(id) {
        return http.delete(`/gym-members/${id}/delete`);
    }
}
export default new GymMemberService();