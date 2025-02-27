import React, { useState, useEffect } from "react";
import { signInWithGoogle, logOut, auth } from "./firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import CarsList from "./CarsList";
import SaveImage from "./SaveImage";
import { useHistory } from "react-router-dom";
import UploadCar from "./UploadCar";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser && currentUser.email === "admin@example.com") {
        setIsAdmin(true);  
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logOut();
    history.push("/");
  };

  return (
    <div
      style={{
        backgroundImage: user
          ? `url("https://www.hdwallpaperspulse.com/wp-content/uploads/2016/03/06/grey-car-background.jpeg")`
          : `url("https://d.newsweek.com/en/full/1611295/istock-dealership.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        textAlign: "center",
        padding: "20px",
        fontFamily: "cursive",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header
            style={{
              width: "100%",
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ color: "white", fontSize: "24px" }}>Second-Hand Car App</div>
            <nav style={{ display: "flex", alignItems: "center" }}>
              {/* User Icon with Text */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                USER
              </div>

              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#ff4757",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Log Out
              </button>

              <button
                onClick={() => history.push("/profile")}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                {isAdmin ? "Admin Dashboard" : "User Profile"}
              </button>
            </nav>
          </header>

          <main style={{ width: "80%", maxWidth: "700px", marginTop: "50px" }}>
            <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
              Welcome, {user?.displayName || user?.email.split("@")[0]}
            </h1>

            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Upload a Car</h2>
            <SaveImage />

            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Listed Cars</h2>
            <CarsList />
          </main>
        </>
      )}
    </div>
  );
};

export default HomePage;
