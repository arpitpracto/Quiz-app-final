import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./userContext";
import "react-toastify/dist/ReactToastify.css";
import "./style/Login.css";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));

      console.log(response.data);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found");
        } else if (error.response.status === 401) {
          toast.error("Incorrect password");
        } else {
          console.error("Login error:", error.response.data);
          toast.error(
            "An error occurred during login. Please try again later."
          );
        }
      }
    }
  };

  return (
    <>
      <div className="parent">
        <div className="left">
          <div className="column-1">
            <span className="span">
              <div className="Paragraphs">
                <p className="div-2">
                  You can <Link to="/register">Register here!</Link>
                </p>
              </div>
            </span>
          </div>
          <div className="column-2">

          </div>
        </div>
        <div className="right">
          <h1 className="div-3">Sign in</h1>
          <input
            type="text"
            className="username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="pass"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login" onClick={handleLogin}>
            Login
          </button>

          <button >
                      Register
                    </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Login;
