import { Router } from "express";

const propertyController = Router();

propertyController.get("/create", (req, res) => {
    res.render("properties/create");
})

propertyController.post("/create", async (req, res) => {
    const data = req.body;

    console.log(data)

    res.redirect("/");
})

export default propertyController;