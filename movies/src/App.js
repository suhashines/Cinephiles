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

function App() {
  const [value,setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [view, setView] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

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
                                      view={view} s
                                      etView={setView}
                                    />}/>

          <Route path="/movies" element={<Movies/>}/>

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

          <Route path="/profile" element={<Profile/>}/>

          <Route path="/buyticket/:id" element={<BuyTicket/>}/>

        </Routes>
      </section>
    </div>
  );
}

export default App;
