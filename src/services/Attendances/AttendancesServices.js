import http from "../../../http-common";
class AttendancesServices {
    getAll() {
        return http.get("/attendances");
    }
    getAllFormat(search) {
        return http.get(`/attendancesformat`);
    }
    get(id) {
        return http.get(`/attendances/${id}`);
    }
    delete(id) {
        return http.delete(`/attendances/${id}`);
    }
}
export default new AttendancesServices();