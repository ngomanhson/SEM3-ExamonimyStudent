// import axios from "axios";
// import url from "./url";

// export default axios.create({
//     baseURL: url.BASE_URL,
// });

import axios from "axios";
import url from "./url";

// Hàm để lấy token từ local storage
const getJWT = () => {
    let state = localStorage.getItem("accessToken");
    state = JSON.parse(state);
    if (state) return state.token;
    return "";
};

const apiWithAuth = axios.create({
    baseURL: url.BASE_URL,
    // headers: {
    //     Authorization: `Bearer ${getJWT()}`,
    // },
});

export default apiWithAuth;
