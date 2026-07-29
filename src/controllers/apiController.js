import { Router } from "express";
import propertyService from "../services/propertyService.js";

const apiController = Router();

apiController.get("/report/properties/latest", async (req, res) => {
    const latestProperties = await propertyService.getLatest();

    latestProperties.map((x) => x.contact = String(x.contact));

    res.json(latestProperties);
})

export default apiController;