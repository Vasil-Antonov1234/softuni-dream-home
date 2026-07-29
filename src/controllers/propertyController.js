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

        await propertyService.createOne(parsedData, userId);

        res.status(200).redirect("/");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("properties/create", { error: errorMessage, data });
    };
});

propertyController.get("/dashboard", async (req, res) => {

    try {
        const properties = await propertyService.getAll();

        res.render("properties/dashboard", { properties });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("properties/dashboard", { error: errorMessage });
    };
});

propertyController.get("/:propertyId/details", async (req, res) => {
    const propertyId = Number(req.params.propertyId);
    
    try {
        const property = await propertyService.getById(propertyId);

        res.status(200).render("properties/details", { property });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("404", { error: errorMessage });
    };
});

propertyController.get("/:propertyId/edit", isAuthenticated, async (req, res) => {
    const propertyId = Number(req.params.propertyId);
    const userId = Number(req.user.id);

    try {
        const property = await propertyService.getById(propertyId);

        res.status(200).render("properties/edit", { property })
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("404", { error: errorMessage });
    };
})

export default propertyController;