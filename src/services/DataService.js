import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/fp-app/user");
    }

    getAllPaging(params) {
        return http.get("/api/ureg/userlist", { params });
    }

    getAllSub() {
        return http.get("/fp-app/user/sub");
    }

    getAllSubByUsername(username) {
        return http.get(`/fp-app/user/sub/${username}`);
    }

    getSubByUsername(username) {
        return http.get(`/fp-app/user/currentSub/${username}`);
    }

    subDetail(subid) {
        return http.get(`/fp-app/paypal/sub/${subid}`);
    }

    cancelSubs(subid) {
        return http.get(`/fp-app/paypal/sub/${subid}/cancel`);
    }

    get(username) {
        return http.get(`/fp-app/user/${username}`);
    }

    getUserByID(id) {
        return http.get(`/fp-app/user/id/${id}`);
    }

    create(data) {
        return http.post("/fp-app/user", data);
    }

    getfts(username) {
        return http.get(`/fp-app/user/sub/${username}`);
    }

    updatesub(id, username, cursub, ppsubid, subamt, subtype) {
        return http.put(`/fp-app/user/sub/${id}&${username}&${cursub}&${ppsubid}&${subamt}&${subtype}`);
    }

    completefts(id, data) {
        return http.post(`/fp-app/user/fts/${id}`, data);
    }

    cPassword(username, data) {
        return http.post(`/fp-app/user/phash/${username}`, data);
    }

    update(id, data) {
        return http.put(`/fp-app/user/id/${id}`, data);
    }

    delete(username, id) {
        return http.delete(`/fp-app/user/id/${id}&${username}`);
    }

    findByUsername(func, ser) {
        return http.get(`/fp-app/user/ser/${func}&${ser}`);
    }
}

export default new DataService();