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

export const getCurrent = async() => {
    let res;

    try{
         res = await axios.get(`/movie/date/current`)
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

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`,{
        email: data.email,
        password: data.password,
        confirmPassword: signup? data.confirmPassword : "",
        name: signup ? data.name : "",
    })
    .catch((err) => console.log(err));
    
    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const resData =  res.data;
    return resData;
};

export const sendUserSignOutRequest = async () => {
    const res = await axios
    .get(`/user/signout`)
    .catch((err) => console.log(err));
    
    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const resData =  res.data;
    console.log(resData.success);
    return resData;
}

export const sendAdminAuthRequest = async(data, signup) => {
    const res = await axios
    .post(`/manager/${signup ? "signup" : "login"}`, {
        email: data.email,
        password: data.password,
        confirmPassword: signup? data.confirmPassword : "",
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

export const getUserDetails = async (id) => {

    try {
      const response = await axios.get(`/user/details/${id}`); //halts at this line

      console.log(response.data);
      const res = response.data.result; // Access the response data directly
  
      console.log(res); // Log the response data
  
      return res; // Return the data object
    } 
    
    catch (err) {
      console.log(err);
      throw err; // Re-throw the error if needed
    }

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

export const getGalleriesAndShowTimes = async(t_id, m_id, date) => {
    let res;

    try{
         res = await axios.get(`/theatre/showtimes/?t_id=${t_id}&m_id=${m_id}&date=${date}`)
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

export const getSeatPrice = async(t_id) => {
    let res;

    try{
         res = await axios.get(`/booking/galleries/${t_id}`)
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

export const getSeats = async(g_id, show_id, category) => {
    let res;

    try{
         res = await axios.get(`/booking/galleries?g_id=${g_id}&show_id=${show_id}&category=${category}`)
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

export const getTotalCost = async(seat, id) => {
    let res;

    try{
         res = await axios
         .post(`/booking/seats`, 
         {
             seats: seat,
             g_id: id,
         })
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

export const confirmBooking = async(seat, id, s_id, tk) => {
    let res;

    console.log(seat);
    console.log(id);
    console.log(s_id);

    try{
         res = await axios
         .post("/booking/confirm", 
         {
            seats: seat,
            g_id: id,
            show_id: s_id,
            token: tk
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const response = res.data ;
    console.log(response);
    return response;
}

export const cancelBooking = async(id) => {
    let res;

    try{
         res = await axios
         .delete(`/booking/find/${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data ;
    return response;
}

export const search = async(query) => {
    let res;

    try{
         res = await axios
         .get(`/movie/search?query=${query}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data ;
    return response;
}

export const changePassword = async(inputs) => {

    let res;

    console.log(inputs);

    try{
         res = await axios
         .post(`/user/changePassword/${inputs.u_id}`, 
         {
             u_id: inputs.u_id,
             oldPassword: inputs.oldPassword,
             newPassword: inputs.newPassword,
             confirmPassword: inputs.confirmPassword
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const response = res.data;
    console.log(response);
    return response;

}

export const editProfile = async(inputs) => {
    let res;

    console.log(inputs);

    try{
        res = await axios
        .patch(`/user/details/${inputs.u_id}`,{
            name: inputs.name,
            email: inputs.email,
            gender: inputs.gender,
            mobile: inputs.mobile        
        })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const getBookings = async(id) => {
    let res;

    try{
         res = await axios.get(`/booking/all?token=${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data.movies;
    return response;
}

export const getCitiesAndTheatres = async() => {
    let res;

    try{
         res = await axios.get(`/movie/find`)
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





