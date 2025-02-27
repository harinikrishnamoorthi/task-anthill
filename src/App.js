import React, { useState, useEffect } from "react";
import { signInWithGoogle, logOut, auth, signUpWithEmail, signInWithEmail } from "./firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";



import AddCar from './AddCar';


const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [cars, setCars] = useState([]);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch cars from Firestore
  const fetchCars = async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    setCars(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container(user)}>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div style={styles.content}>
          <div style={styles.profileSection}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="User Profile" style={styles.profileImage} />
            ) : (
              <div style={styles.defaultAvatar}>{user.displayName ? user.displayName[0] : "?"}</div>
            )}
            <button onClick={logOut} style={styles.logoutButton}>Log Out</button>
          </div>

          <h1 style={styles.welcomeText}>Welcome, {user.displayName || user.email.split("@")[0]}</h1>

          {/* Add Car Section */}
         
          <AddCar refreshCars={fetchCars} />

          {/* Car Listings */}
          <h1 style={styles.appTitle}>✨ ＣａｒＮｏｖａ ✨</h1>
          <div style={styles.carGrid}>
            {cars.map((car) => (
              <div key={car.id} style={styles.carCard}>
                <h3>{car.title}</h3>
                <p>{car.description}</p>
                <p><strong>Price:</strong> ₹{car.price}</p>
                {car.imageUrl && <img src={car.imageUrl} alt={car.title} style={styles.carImage} />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={styles.authBox}>
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
  Second Hand Car App
</h1>

          <h2 style={{ color: "white" }}>{isSignUp ? "Sign Up" : "Login"}</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          <button onClick={handleAuth} style={styles.authButton(isSignUp)}>{isSignUp ? "Sign Up" : "Login"}</button>
          <p style={styles.toggleText} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </p>
          <button onClick={signInWithGoogle} style={styles.googleButton}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
};

// Styling Object
const styles = {
  container: (user) => ({
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
  }),
  content: { width: "100%", maxWidth: "850px", position: "relative" },
  profileSection: { position: "absolute", top: "20px", right: "20px", textAlign: "center" },
  profileImage: { width: "50px", height: "50px", borderRadius: "50%", border: "2px solid black", display: "block", marginBottom: "5px" },
  defaultAvatar: {
    width: "50px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  logoutButton: { marginTop: "10px", padding: "8px 15px", backgroundColor: "#ff4757", color: "white", border: "none", borderRadius: "5px", fontSize: "14px", cursor: "pointer" },
  welcomeText: { fontSize: "36px", fontWeight: "bold" },
  sectionTitle: { fontSize: "22px", fontWeight: "bold", marginBottom: "10px" },
  appTitle: { marginBottom: "20px", fontSize: "28px" },
  carGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", padding: "20px" },
  carCard: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  carImage: { width: "100%", borderRadius: "10px", objectFit: "cover", maxHeight: "220px" },
  authBox: { backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "20px", borderRadius: "10px", width: "80%", maxWidth: "400px" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "none" },
  authButton: (isSignUp) => ({ width: "100%", padding: "10px", backgroundColor: isSignUp ? "#4CAF50" : "#4285F4", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }),
  toggleText: { cursor: "pointer", marginTop: "10px", color: "white" },
  googleButton: { width: "100%", padding: "10px", backgroundColor: "#DB4437", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", marginTop: "10px" },
};

export default App;
