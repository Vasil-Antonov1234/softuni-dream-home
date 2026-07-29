import { Router } from "express";

const propertyController = Router();

propertyController.get("/create", async (req, res) => {
    res.render("properties/create");
})

export default propertyController;