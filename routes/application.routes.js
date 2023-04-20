import express from "express";
import {
    createApplication,
    updateApplication,
    getApplicationbyID,
    getAllApplications,
} from "../controllers/Application/application.controller.js";

import { isLoggedIn } from "../middlewares/userMiddlewares.js";

const router = express.Router();

router.route("/create").post(isLoggedIn, createApplication);
router.route("/update/:id").put(isLoggedIn, updateApplication);
router.route("/get/:id").get(isLoggedIn, getApplicationbyID);
router.route("/get").get(isLoggedIn, getAllApplications);


export default router;
