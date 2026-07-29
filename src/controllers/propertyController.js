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
    const userId = req.user?.id;
    
    try {
        const property = await propertyService.getById(propertyId);

        const isOwner = property.ownerId === userId;
        const hasLiked = property.likeBy.find((x) => x.id === userId);

        res.status(200).render("properties/details", { property, isOwner, hasLiked });
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
});

propertyController.post("/:propertyId/edit", isAuthenticated, async (req, res) => {
    const propertyData = req.body
    const propertyId = Number(req.params.propertyId);
    const userId = Number(req.user.id);

    try {
        const parsedPropertyData = await createPropertySchema.parseAsync(propertyData);
        const property = await propertyService.update(parsedPropertyData, propertyId, userId);

        res.status(200).redirect(`/properties/${propertyId}/details`);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render(`properties/edit`, { property: propertyData, error: errorMessage });
    };
});

propertyController.get("/:propertyId/delete", isAuthenticated, async (req, res) => {
    const propertyId = Number(req.params.propertyId);
    const userId = Number(req.user.id);

    try {
        await propertyService.remove(propertyId, userId);

        res.status(204).redirect("/properties/dashboard");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(404).render("404", { error: errorMessage });
    };
});

propertyController.get("/:propertyId/like", isAuthenticated, async (req, res) => {
    const propertyId = Number(req.params.propertyId);
    const userId = Number(req.user.id);

    try {
        const property = await propertyService.getById(propertyId);

        const isOwner = property.ownerId === userId;

        if (isOwner) {
            return res.redirect("/", { error: "An owner cannot like their own posts"});
        };        

        await propertyService.like(propertyId, userId);
        res.status(200).redirect(`/properties/${propertyId}/details`)
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(404).render("404", { error: errorMessage });
    };
})

export default propertyController;