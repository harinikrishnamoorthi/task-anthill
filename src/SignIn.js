import React, { useState } from "react";
import { auth, signInWithGoogle, signUpWithEmail, signInWithEmail } from "./firebaseAuth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      navigate("/home"); // Redirect after login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      navigate("/home"); // Redirect after sign up
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://gomechanic.in/blog/wp-content/uploads/2020/07/10-best-second-hand-used-cars-under-50000-01.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "30px",
          borderRadius: "10px",
          color: "white",
          textAlign: "center",
          width: "350px",
        }}
      >
        <h2>Login / Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
        />
        
        <button onClick={handleSignIn} style={buttonStyle}>
          Login
        </button>
        <button onClick={handleSignUp} style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}>
          Sign Up
        </button>
        <button onClick={handleGoogleSignIn} style={{ ...buttonStyle, backgroundColor: "#4285F4" }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  backgroundColor: "#ff4757",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default SignIn;
