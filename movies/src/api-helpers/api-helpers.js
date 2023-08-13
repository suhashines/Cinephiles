import axios from "axios";


export const getAllMovies = async() => {

    let res;

    try{
         res = await axios.get("http://localhost:3000/movie")
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    if(!res.data.success){
        return console.log(res.data.message);
    }

    const data = res.data ;

    return data;
};

export const sendUserAuthRequest = async (data, signup) => {

    // const res = await axios.post(`http://localhost:3000/user/${signup ? "signup" : "login"}`,{
    const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`,{
        email: data.email,
        password: data.password,
        name: signup ? data.name : "",
    })
    .catch((err) => console.log(err));
    
    if(!res.data.success){
        return console.log(res.data.message);
    }

    const resData =  res.data;

    return resData;
};

export const sendAdminAuthRequest = async(data) => {
    const res = await axios
    .post("/admin/login", {
        email: data.email,
        password: data.password,
    })
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Error while fetching data");
    }

    const resData = await res.data;
    return resData;
};