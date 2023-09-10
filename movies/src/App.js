import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShowTimes from "./components/ShowTimes/ShowTimes";
import { adminActions, userActions } from "./store";
import Bookings from "./Bookings/Bookings";
import Profile from "./components/Profile/Profile";
import BuyTicket from "./Bookings/BuyTicket";
import Payment from "./Bookings/Payment";
import Manager from "./components/Manager/Manager";
import AddMovie from "./components/Manager/AddMovie";
import AddTheatre from "./components/Manager/AddTheatre";
import Theatres from "./components/Manager/Theatres";
import EditTheatre from "./components/Manager/EditTheatre";
import TheatreMovieDetails from "./components/Manager/TheatreMovieDetails";
import TheatreMovies from "./components/Manager/TheatreMovies";
import AddShowTimes from "./components/Manager/AddShowTimes";

function App() {
  const [value,setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [view, setView] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [booking, setBooking] = useState(null);

  const [bookingResponse, setBookingResponse] = useState(null);

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('adminId')){
      dispatch(adminActions.login());
    }
    else if(localStorage.getItem('userId')){
      dispatch(userActions.login());
    }
  }
  ,[])

  return (
    <div>
      <Header 
        value={value} 
        setValue={setValue} 
        prevValue={prevValue} 
        setPrevValue={setPrevValue} 
        setView={setView}
        message={message}
        setMessage={setMessage}
      />
      <section>
        <Routes>

          <Route path="/" element={<HomePage 
                                      setValue={setValue} 
                                      view={view}
                                      setView={setView}
                                    />}/>

          <Route path="/movies" element={<Movies/>}/>

          <Route path="/theatres" element={<Theatres/>}/>

          <Route path="/theatres/:id/showtimes" element={<AddShowTimes setTabValue={setValue}/>}/>

          <Route path="/theatres/:id" element={<EditTheatre setTabValue={setValue}/>}/>

          <Route path="/theatres/:id/movies" element={<TheatreMovies setTabValue={setValue}/>}/>

          <Route path="/theatres/:t_id/movies/:id/stats" element={<TheatreMovieDetails setTabValue={setValue}/>}/>

          <Route path="/admin" element={<Admin 
                                          setValue={setValue} 
                                          prevValue={prevValue} 
                                          isAdmin={isAdmin} 
                                          setIsAdmin={setIsAdmin}
                                          isAdminLoggedIn={isAdminLoggedIn}
                                          isUserLoggedIn={isUserLoggedIn}
                                          success={success}
                                          message={message}
                                          setSuccess={setSuccess}
                                          setMessage={setMessage}
                                        />}/>
          <Route path="/auth" element={<Auth 
                                          setValue={setValue} 
                                          prevValue={prevValue} 
                                          isAdmin={isAdmin} 
                                          setIsAdmin={setIsAdmin}
                                          isAdminLoggedIn={isAdminLoggedIn}
                                          isUserLoggedIn={isUserLoggedIn}
                                          success={success}
                                          message={message}
                                          setSuccess={setSuccess}
                                          setMessage={setMessage}
                                      />}/>

          <Route path="/showtimes" element={<ShowTimes/>}/>

          <Route path="/bookings/:id" element={<Bookings/>}/>

          <Route path="/profile" element={<Profile setTabValue={setValue}/>}/>

          <Route path="/manager" element={<Manager setTabValue={setValue}/>}/>

          <Route path="/addmovie" element={<AddMovie setTabValue={setValue}/>}/>

          <Route path="/addtheatre" element={<AddTheatre setTabValue={setValue}/>}/>

          <Route path="/buyticket/:id" element={<BuyTicket
                                                    booking={booking}
                                                    setBooking={setBooking}
                                                />}/>

          <Route path="/payment" element={<Payment
                                              booking={booking}
                                              setBooking={setBooking}
                                          />}/>

        </Routes>
      </section>
    </div>
  );
}

export default App;
