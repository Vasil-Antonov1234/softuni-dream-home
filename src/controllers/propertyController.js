import { Router } from "express";
import { createPropertySchema } from "../schemas/propertySchema.js";
import propertyService from "../services/propertyService.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const propertyController = Router();

propertyController.get("/create", (req, res) => {
    res.render("properties/create");
})

propertyController.post("/create", async (req, res) => {
    const data = req.body;

    try {
        const parsedData = await createPropertySchema.parseAsync(data);
        
        const property = await propertyService.createOne(parsedData);

        res.status(200).redirect("/");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("properties/create", { error: errorMessage });
    };
})

export default propertyController;