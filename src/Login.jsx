import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css"; // Import CSS file

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill in all details");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 400) toast.error("Fill in all details");
      else if (response.status === 200) {
        const { message, firstname } = response.data;
        toast.success(`${message}. Welcome, ${firstname}!`);
        localStorage.setItem("firstname", response.data.firstname);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("taskid", response.data.uniqueObjid);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else if (response.status === 401) toast.error("Invalid Credentials");
      else if (response.status === 404) {
        toast.error("User Not Found");
      }
      if (response.status === 500) toast.error("Internal Server Error");
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <BeatLoader color={"#4caf50"} loading={loading} />
          <p className="loading-text">Loading...</p>
        </div>
      ) : (
        <div className="form-container">
          <form>
            <div className="form-header">
              <h2>Welcome to Mediscan</h2>
              <p>Please Sign-In to your account and start</p>
            </div>
            <div className="form-fields">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <p className="forgot-password">
                <Link to={"/forgetpassword"}>Forgot Password?</Link>
              </p>
              <div className="form-group">
                <button type="submit" onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <div className="signup-link">
                <span>Don't have an Account?</span>
                <Link to={"/register"}>SignUp</Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
