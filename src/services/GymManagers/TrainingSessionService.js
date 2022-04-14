/* eslint-disable prettier/prettier */
import http from "../../../http-common";

class TrainingSessionService {
    getAll() {
        return http.get("/sessions");
    }
    
    get(id) {
        return http.get(`/sessions/${id}`);
    }
    
    create(data) {
        console.log(data);
        console.log(data.coaches);
        return http.post("/sessions", data);
    }
    
    update(id, data) {
        return http.post(`/sessions/${id}/update`, data);
    }
    
    delete(id) {
        return http.delete(`/sessions/${id}`);
    }
}
export default new TrainingSessionService();