import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../App";
import "./global.component.css";

export default function Login () {
  const { setPage, setOTP, setEmail } = useContext(RecoveryContext);
  const [userEmail, setUserEmail] = useState(""); 

  function sendOtp() {
    if (userEmail) {
      axios.get(`http://localhost:5000/check_email?email=${userEmail}`).then((response) => {
        if (response.status === 200) {
              const OTP = Math.floor(Math.random() * 9000 + 1000);
              console.log(OTP);
              setOTP(OTP);
              setEmail(userEmail);

              axios.post("http://localhost:5000/send_email", {
                OTP,
                recipient_email: userEmail,
              })
              .then(() => setPage("otp"))
              .catch(console.log);
          } else {
            alert("User with this email does not exist!");
            console.log(response.data.message);
          }
        })
        .catch(console.log);
    } else {
      alert("Please enter your email");
    }
  }

  return (
    <div className="container">
     <h2>Login </h2>
      <form className="form">
        <label /> Email: 
           <input type="email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} /> 
        <label /> Password: 
            <input type="password" />  
        <button type="submit"> login </button>
      </form>
      <a href="#" className="forgot-password" onClick={() => sendOtp()}>
        Forgot Password
      </a>
    </div>
  );
}
