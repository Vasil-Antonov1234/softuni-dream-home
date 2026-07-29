import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import propertyController from "./controllers/propertyController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/auth", authController);
routes.use("/properties", propertyController);

export default routes;