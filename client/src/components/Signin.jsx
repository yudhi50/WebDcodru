import { useState } from "react";
import "../styles/Signin.css";
import { NavLink } from "react-router-dom";
import signin from "../assets/signin.png";
import c3 from "../assets/c3.png";
import Muialert from "./Muialert";
import { Lock, Person } from "@mui/icons-material";
import { TextField, Button, InputAdornment } from "@mui/material";
import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook-color.svg";
import MicrosoftIcon from "../assets/microsoft.svg";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to store alert message
  const navigate = useNavigate();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { username, password } = value;

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const jsonresponse = await res.json();
    console.log("hkjdhfjhdjf", jsonresponse.token);
    if (res.ok) {
      localStorage.setItem("Token", jsonresponse.token);
      localStorage.setItem("Photo", jsonresponse.photo);
      localStorage.setItem("Username", jsonresponse.username);
      localStorage.setItem("Name", jsonresponse.name);
      navigate("/");
    } else {
      // Handle error response
      console.error("Failed to Sign In");
      // Set alert message based on error response
      setAlertMessage(jsonresponse.error || "Failed to Sign In");
      // Display alert
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="signindiv">
      <div className="signindiv1">
        <div className="img">
          <div className="logo2">
            <img className="img1" src={c3} alt="SignIn" />
          </div>

          <img className="image" src={signin} alt="SignIn" />
        </div>

        <div className="signindiv2">
          <h2 className="signin">Sign In</h2>

          <div className="username-input">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Username"
              name="username"
              value={value.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="password-input">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              name="password"
              type="password"
              value={value.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="signinnormal"
            onClick={PostData}
          >
            Sign in
          </Button>

          <div className="donothave">
            <p>
              Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </p>
            <p>
              Forgotten Password <NavLink to="/Forgot">Forget Password</NavLink>
            </p>
          </div>

          <div className="donothave">
            <p>------ or Try! ------</p>
          </div>

          <div className="external">
            <div
              className="icon-wrapper"
              onClick={() => console.log("Continue with Google")}
            >
              <img src={GoogleIcon} alt="Google" className="icon" />
            </div>
            <span className="separator">|</span>
            <div
              className="icon-wrapper"
              onClick={() => console.log("Continue with Facebook")}
            >
              <img src={FacebookIcon} alt="Facebook" className="icon" />
            </div>
            <span className="separator">|</span>
            <div
              className="icon-wrapper"
              onClick={() => console.log("Continue with Microsoft")}
            >
              <img src={MicrosoftIcon} alt="Microsoft" className="icon" />
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <Muialert
          message={alertMessage}
          severity="error"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default Signin;
