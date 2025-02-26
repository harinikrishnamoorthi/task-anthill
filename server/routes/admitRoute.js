import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import admitmiddleware from '../middleware/adminMiddleware.js';
import { addBus, busRoute, updateBus } from '../controllers/admitController.js';
import Bus from '../models/busModel.js';



const router = express.Router();



router.post("/buses",protectRoute,admitmiddleware,addBus)
router.post("/buses/:id",protectRoute,admitmiddleware,updateBus)
router.post("/routes/:id",protectRoute,admitmiddleware,busRoute)
router.get("/allbuses",protectRoute,admitmiddleware,async(req,res)=>{
    try {
        const allbuses = await Bus.find();
        return res.status(200).json(allbuses);
    } catch (error) {
        return res.status(500).json({message:"internal server error"});
    }
})


export default router;