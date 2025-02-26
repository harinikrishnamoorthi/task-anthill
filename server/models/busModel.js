import mongoose from "mongoose";



const busSchema = mongoose.Schema({
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true }
},{timestamps:true})


const Bus = mongoose.model("Bus",busSchema);


export default Bus;