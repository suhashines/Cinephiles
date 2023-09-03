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
         res = await axios.get(`/movie/find/${id}`)
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

export const getCurrent = async() => {
    let res;

    try{
         res = await axios.get(`/movie/date/current`)
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

export const getCitiesByMovieId = async(id) => {
    let res;

    try{
        res = await axios.get(`/movie/find?m_id=${id}`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data) ;

    // if(!res.cities.success){
    //     return console.log(res.cities.message);
    // }

    const data = res.data ;

    return data;
}

export const getTheatresByCity = async(id, city) => {
    let res;

    try{
         res = await axios.get(`/movie/find?m_id=${id}&city=${city}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const data = res.data ;

    return data;
}

export const getMovieShowdates = async(id, t_id) => {
    let res;

    try{
         res = await axios.get(`/theatre/showtimes?t_id=${t_id}&m_id=${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const data = res.data ;

    return data;
}

export const getMovieShowtimes = async(t_id, id, date) => {
    let res;

    try{
         res = await axios.get(`/theatre/showtimes?t_id=${t_id}&m_id=${id}&date=${date}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const data = res.data ;

    return data;
}

export const getCitiesAndTheatres = async() => {
    let res;

    try{
         res = await axios.get(`/movie/find`)
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


export const getAllCities = async() => {
    let res;

    try{
         res = await axios.get(`/theatre/cities`)
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

// export const getTheatreByCity = async(city) => {
//     let res;

//     try{
//          res = await axios.get(`/theatre/find?city=${city}`)
//     }catch(err){
//         console.log(err);
//     }

//     console.log(res.data) ;

//     if(!res.data.success){
//         return console.log(res.data.message);
//     }

//     const data = res.data ;

//     return data;
// }

// export const getMovieShowtimes = async(id) => {
//     let res;

//     try{
//          res = await axios.get(`/showtime/movie/${id}`)
//     }catch(err){
//         console.log(err);
//     }

//     console.log(res.data) ;

//     if(!res.data.success){
//         return console.log(res.data.message);
//     }

//     const data = res.data ;

//     return data;
// }

// export const getGalleries = async(data) => {
//     let res;

//     try{
//          res = await axios.post(`/gallery`,data)
//     }catch(err){
//         console.log(err);
//     }

//     console.log(res.data) ;

//     if(!res.data.success){
//         return console.log(res.data.message);
//     }

//     const data = res.data ;

//     return data;
// }

// export const getGallerySeats = async(data) => {
//     let res;

//     try{
//          res = await axios.post(`/gallery/seats`,data)
//     }catch(err){
//         console.log(err);
//     }

//     console.log(res.data) ;

//     if(!res.data.success){
//         return console.log(res.data.message);
//     }

//     const data = res.data ;

//     return data;
// }



