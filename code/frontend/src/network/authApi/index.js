import api from "@/network";

const AuthApi = {}


AuthApi.signIn = function({username, password, role}) {
    return api.post("api/auth/signin", {
        username : username,
        password : password,
        roles : role
    });
}

AuthApi.signUp = function({username, password, role, email}) {
    return api.post("/api/auth/signup", {
        username : username,
        password : password,
        roles : role,
        email : email
    });
}


export default AuthApi;