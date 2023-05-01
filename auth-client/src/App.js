import { useState, createContext } from "react";
import Login from "./components/Login";
import OTPInput from "./components/OTPInput";
import Reset from "./components/Reset";
import "./App.css";

export const RecoveryContext = createContext();
export default function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  function NavigateComponents() {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
  }
  return (
    <div className="App-header"> 
     <RecoveryContext.Provider
        value={{ page, setPage, otp, setOTP, email, setEmail }}>
        <div>
          <NavigateComponents />
        </div>
     </RecoveryContext.Provider>
    </div>
  );
}


