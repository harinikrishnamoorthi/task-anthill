import Booking from "../models/busBookmodel.js";
import Bus from "../models/busModel.js";

export const searchBus = async(req,res)=>{
    try {
        const { source, destination, date } = req.query;
        const buses = await Bus.find({ source, destination, departureTime: { $gte: new Date(date) } });
        res.json(buses);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }


}

export const bookBus = async(req,res)=>{
    try {
        if (req.user.role !== "user") {
          return res.status(403).json({ message: "Forbidden: Only users can book tickets" });
        }
    
        const { name, seats } = req.body;
        const bus = await Bus.findOne({name});
    
        if (!bus || bus.availableSeats < seats) {
          return res.status(400).json({ error: "Not enough available seats" });
        }
    
        bus.availableSeats -= seats;
        await bus.save();
    
        const booking = new Booking({ user: req.user.id, bus:bus._id, seatsBooked: seats });
        await booking.save();
    
        res.json({ message: "Booking confirmed", booking });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}