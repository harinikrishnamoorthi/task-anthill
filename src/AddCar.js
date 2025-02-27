import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddCar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!title || !description || !price || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    setUploading(true);

    const storage = getStorage();
    const storageRef = ref(storage, `cars/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Uploading: ", (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.error("Upload failed: ", error);
        setUploading(false);
      },
      async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

        await addDoc(collection(db, "cars"), {
          title,
          description,
          price,
          imageUrl,
          createdAt: new Date(),
        });

        alert("Car uploaded successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
        setUploading(false);
      }
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Upload a Car</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "50%",
          margin: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Car Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "none",
            height: "60px",
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input type="file" onChange={handleFileChange} style={{ padding: "5px" }} />
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            background: "#28a745",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Upload Car"}
        </button>
      </div>
    </div>
  );
};

export default AddCar;
