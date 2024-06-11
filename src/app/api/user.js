
import Api from "../utils/axios/axios";

export const userLogin = async (email, password) => {
    try {
        return await Api.post(
            "/user/login",
            {
                email,
                password,
            }
        ).then(response => {
            return response;
        })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.log(error);
    }
}
