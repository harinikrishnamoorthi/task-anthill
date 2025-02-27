import { db } from "./firebase";  // ✅ Correct Import
import { collection, addDoc } from "firebase/firestore";

const saveImageToFirestore = async () => {
    const imageUrl = "https://i.ibb.co/DfrwPdcK/Honda-Civic-2018.jpg"; // Your ImgBB URL

    try {
        const docRef = await addDoc(collection(db, "images"), {
            url: imageUrl,
            createdAt: new Date(),
        });
        console.log("✅ Image saved in Firestore with ID:", docRef.id);
    } catch (error) {
        console.error("❌ Error saving image:", error);
    }
};

// Call the function when the button is clicked
const SaveImage = () => {
    return (
        <div>
            <h2>Save Image to Firestore</h2>
            <button onClick={saveImageToFirestore}>Upload Image</button>
        </div>
    );
};

export default SaveImage;
