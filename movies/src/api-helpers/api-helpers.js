import axios from "axios";


export const getAllMovies = async() => {

    let res;

    try{
         res = await axios.get(`/movie`)
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
    const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`,{
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: signup ? data.name : "",
    })
    .catch((err) => console.log(err));
    
    if(!res.data.success){
        return console.log(res.data.message);
    }

    const resData =  res.data;
    return resData;
};

export const sendAdminAuthRequest = async(data, signup) => {
    const res = await axios
    .post(`/manager/${signup ? "signup" : "login"}`, {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: signup ? data.name : "",
    })
    .catch((err) => console.log(err));

    if(!res.data.success){
        return console.log(res.data.message);
    }

    const resData =  res.data;
    return resData;
};

export const getMovieById = async(id) => {
    
    let res;

    try{
         res = await axios.get(`/movie/${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    if(!res.data.success){
        return console.log(res.data.message);
    }

    const data = res.data ;

    return data;
}

export const getUserDetails = async(id) => {
    let res;

    try{
         res = await axios.get(`/user/details`)
    }catch(err){
        console.log(err);
    }

    console.log(res.result) ;

    if(!res.result.success){
        return console.log(res.result.message);
    }

    const data = res.result ;

    return data;
}