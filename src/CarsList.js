import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const carCollection = collection(db, "cars");
      const carSnapshot = await getDocs(carCollection);
      const carList = carSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(carList);
    };

    fetchCars();
  }, []);

  // 🔍 Filter cars based on search query
  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Available Cars</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search cars..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
              <img src={car.imageUrl} alt={car.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h3>{car.title}</h3>
              <p>{car.description}</p>
              <p><b>Price:</b> ₹{car.price}</p>
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
