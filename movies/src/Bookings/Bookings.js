import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../api-helpers/api-helpers';

const Bookings = () => {
    const [movie, setMovie] = useState();
    const id = useParams().id;
    console.log(id);

    useEffect(()=>{
        getMovieById(id)
        .then((res) => setMovie(res.movie))
        .catch((err) => console.log(err));
    },[id]);
    console.log(movie);

  return (    
    <div>Bookings</div>
  )
}

export default Bookings