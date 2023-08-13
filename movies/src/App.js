import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const [value,setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  // const isAdminLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const isUserLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  // console.log("isAdminLoggedIn", isAdminLoggedIn);
  // console.log("isUserLoggedIn", isUserLoggedIn);

  return (
    <div>
      <Header value={value} setValue={setValue} prevValue={prevValue} setPrevValue={setPrevValue}/>
      <section>
        <Routes>
          <Route path="/" element={<HomePage setValue={setValue}/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/admin" element={<Admin setValue={setValue} prevValue={prevValue}/>}/>
          <Route path="/auth" element={<Auth setValue={setValue} prevValue={prevValue}/>}/>
        </Routes>
      </section>
    </div>
  );
}

export default App;
