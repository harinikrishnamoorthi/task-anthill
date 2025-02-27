import { useState } from "react";

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview image before upload
    }
  };

  return (
    <div>
      <h2>Upload Image Locally</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <div>
          <img src={preview} alt="Preview" style={{ width: "200px", marginTop: "10px" }} />
        </div>
      )}
      <button onClick={() => alert("Store this file manually in 'public/uploads/'")}>
        Upload
      </button>
    </div>
  );
};

export default ImageUploadComponent;
