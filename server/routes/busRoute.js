import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { bookBus, searchBus } from "../controllers/busController.js";

const router = express.Router();


router.get("/search",protectRoute,searchBus);
router.post("/book",protectRoute,bookBus);



export default router;
