import Bus from "../models/busModel.js";
import router from "../routes/authRoute.js";

export const addBus = async(req,res)=>{
    try {
        const { name, source, destination, departureTime, arrivalTime, totalSeats, price } = req.body;
        const newBus = new Bus({ name, source, destination, departureTime, arrivalTime, totalSeats, availableSeats: totalSeats, price });
        await newBus.save();
        res.status(201).json({ message: "Bus added successfully", bus: newBus });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


export const updateBus = async(req,res)=>{
    try {
        const id = req.params.id;
        const updatedBus = await Bus.findByIdAndUpdate(id,req.body, { new: true });

        if (!updatedBus) return res.status(404).json({ message: "Bus not found" });
        res.json({ message: "Bus updated successfully", bus: updatedBus });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}



export const busRoute = async(req,res)=>{
    try {
        const { source, destination } = req.body;
        const bus = await Bus.findById(req.params.id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });
    
        bus.source = source;
        bus.destination = destination;
        await bus.save();
    
        res.json({ message: "Bus route updated", bus });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

export default router;