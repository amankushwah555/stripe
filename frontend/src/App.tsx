import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { User } from "./components/User";

import Checkout from "./components/Checkout";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path={"/signup"} element={<Signup />} />
    //     <Route path={"/signin"} element={<Signin />} />
    //     <Route path={"/user"} element={<User />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <Checkout />
    </div>
  );
}

export default App;
