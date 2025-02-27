import React, { useState } from "react";
import { uploadCar } from "../firebase/uploadCar";  // Import function
import { auth } from "../firebase/firebaseConfig";  // Import Firebase Auth

const UploadCar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const user = auth.currentUser;  // Get current user

  const handleUpload = async () => {
    if (!user) {
      alert("Please log in first!");
      return;
    }

    await uploadCar(title, description, price, file, user);
  };

  return (
    <div>
      <h2>Upload a Car</h2>
      <input type="text" placeholder="Car Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Car</button>
    </div>
  );
};

export default UploadCar;
