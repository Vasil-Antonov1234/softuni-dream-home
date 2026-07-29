import { Router } from "express";
import propertyService from "../services/propertyService.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    
    try {
        const properties = await propertyService.getLatest()
    
        res.render("home", { properties });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("/", { error: errorMessage });
    };
    
});

export default homeController;