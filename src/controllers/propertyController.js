import { Router } from "express";
import { createPropertySchema } from "../schemas/propertySchema.js";
import propertyService from "../services/propertyService.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const propertyController = Router();

propertyController.get("/create", (req, res) => {
    res.render("properties/create");
})

propertyController.post("/create", isAuthenticated, async (req, res) => {
    const data = req.body;
    const userId = Number(req.user.id);


    try {
        const parsedData = await createPropertySchema.parseAsync(data);
        
        const property = await propertyService.createOne(parsedData, userId);

        res.status(200).redirect("/");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("properties/create", { error: errorMessage, data });
    };
});

propertyController.get("/dashboard", async (req, res) => {
    res.render("properties/dashboard");
});

export default propertyController;