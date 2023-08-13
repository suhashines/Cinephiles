import axios from "axios";
export const getAllMovies = async() => {
    const res = await axios
    .get("http://localhost:5000/movie")
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Error while fetching data");
    }

    const data = await res.data;
    return data;
};

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios;
    axios.post(`/user/${signup ? "signup" : "login"}`,{
        email: data.email,
        password: data.password,
        name: signup ? data.name : "",
    })
    .catch((err) => console.log(err));
    
    if(res.status !== 200 && res.status !== 201){
        return console.log("Error while fetching data");
    }

    const resData = await res.data;
    return resData;
};

export const sendAdminAuthRequest = async(data) => {
    const res = await axios
    .post("/admin/login", {
        email: data.email,
        password: data.password,
    })
    .catch((err) => console.log(err));

    if(res.status != 200){
        return console.log("Error while fetching data");
    }

    const resData = await res.data;
    return resData;
};