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

export const getUpcoming = async() => {
    let res;

    try{
         res = await axios.get(`/movie/date/upcoming`)
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

export const getTop = async() => {
    let res;

    try{
         res = await axios.get(`/movie/top`)
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
        gender: signup? data.gender : "",
        mobile: signup? data.mobile : ""
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

export const search = async(filter, query) => {
    let res;

    try{
         res = await axios
         .post(`/search/${filter}`,{
            [filter]: query
         })
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

export const addMovie = async(inputs) => {
    let res;

    try{
         res = await axios
        .post(`/movie`,{
            name: inputs.directorName,
            country: inputs.country,
            dob: inputs.dob,
            manager_id: inputs.manager_id,
            title: inputs.title,
            release_date: inputs.releaseDate,
            duration: inputs.duration,
            synopsis: inputs.synopsis,
            poster_url: inputs.posterUrl,
            back_poster_url: inputs.backPosterUrl,
            genres: inputs.genres
        })
    }catch(err){
        console.log(err);
    }

    // console.log(res.data) ;

    return res;
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

    // if(!res.data.success){
    //     return console.log(res.data.message);
    // }

    const data = res.data ;

    return data;
}

export const addTheatreInfo = async(inputs) => {
    let res;

    try{
         res = await axios
        .post(`/theatre`,{
            name: inputs.name,
            manager_id: inputs.manager_id,
            building: inputs.building,
            road: inputs.road,
            city: inputs.city,
            count: inputs.count
        })
    }catch(err){console.log(err);}

    console.log(inputs)

    console.log(res.data);

    const response = res.data;
    return response;
}

export const addGalleryInfo = async(inputs) => {
    let res;

    try{
         res = await axios
        .post(`/theatre/gallery`,{
            g_id: inputs.g_id,
            t_id: inputs.t_id,
            name: inputs.name,
            tiers: inputs.tiers,
            columns: inputs.columns,
            price: inputs.price
        })
    }catch(err){console.log(err);}

    console.log(res.data);

    const response = res.data;
    return response;
}

export const addCategoryInfo = async(inputs) => {
    let res;

    try{
         res = await axios
        .patch(`/theatre/gallery`,{
            g_id: inputs.g_id,
            seats: inputs.seats,
            price: inputs.price
        })
    }catch(err){console.log(err);}

    console.log(res.data);

    const response = res.data;
    return response;
}

export const addRating = async(rating, u_id, m_id) => {
    let res

    try{
        res = await axios
        .post(`/movie/rating/${m_id}`,{
            rating: rating,
            u_id: u_id
        })
    }catch(err){console.log(err);}

    console.log(res.data);

    const response = res.data;
    return response;
}

export const getManagerTheatres = async(id) => {
    let res;

    try{
         res = await axios.get(`/manager/theatre/${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;

}

export const getTheatreDetails = async(id) => {
    let res;

    try{
         res = await axios.get(`/theatre/details/${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const editTheatreDetails = async(inputs) => {
    let res;

    try{
         res = await axios
        .patch(`/theatre`,{
            name: inputs.name,
            building: inputs.building,
            road: inputs.road,
            city: inputs.city,
            t_id: inputs.t_id
        })
    }catch(err){console.log(err);}

    console.log(res.data);

    const response = res.data;
    return response;
}

export const deleteTheatre = async(id) => {
    let res;

    try{
         res = await axios.delete(`/theatre?t_id=${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const movieStats = async(t_id, m_id) => {
    let res;

    console.log(t_id, m_id);

    try{
         res = await axios.get(`/theatre/stats?t_id=${t_id}&m_id=${m_id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const getTheatreMovies = async(id) => {
    let res;

    try{
         res = await axios.get(`/theatre/movies/${id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const deleteTheatreMovie = async(t_id, m_id) => {
    let res;

    try{
         res = await axios.delete(`/theatre/add-movie?m_id=${m_id}&t_id=${t_id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const getMovieByTitle = async(name) => {
    let res;

    try{
         res = await axios.post(`/search/title/all`,{
            title: name
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const addMovieToTheatre = async(t, m) => {
    let res;

    console.log(t, m);

    try{
         res = await axios.post(`/theatre/add-movie`,{            
            m_id: m,
            t_id: t
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const getReviews = async(m_id) => {
    let res;

    try{
         res = await axios.get(`/movie/review/${m_id}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const addReview = async(review, u_id, id) => {
    let res;

    try{
         res = await axios.post(`/movie/review/${id}`,{
            review: review,
            u_id: u_id,
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const deleteReview = async(id, rev) => {
    let res;

    console.log(id, rev)

    try{
         res = await axios.delete(`/movie/review/${id}`, {
            data: { rev_id: rev }
        })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const editReview = async(review, id, m_id) => {
    let res;

    console.log(review, id, m_id);

    try{
         res = await axios.patch(`/movie/review/${m_id}`,{
            rev_id: id,
            review: review,
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}

export const getAllTheatres = async(city) => {
    let res;

    try{
         res = await axios.get(`/theatre?city=${city}`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;

    const response = res.data;
    return response;
}