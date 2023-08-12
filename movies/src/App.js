import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";

function App() {
  const isAdminLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  return (
    <div>
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </section>
    </div>
  );
}

export default App;
