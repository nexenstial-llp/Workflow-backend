import express from "express";
import {
    createApplication,
    updateApplication,
    getApplicationbyID,
    getAllApplications,
    getAllInputRequests,
    getAllApprovals,
} from "../controllers/Application/application.controller.js";

import { isLoggedIn } from "../middlewares/userMiddlewares.js";

const router = express.Router();

router.route("/create").post(isLoggedIn, createApplication);
router.route("/update/:id").put(isLoggedIn, updateApplication);
router.route("/get/:id").get(isLoggedIn, getApplicationbyID);
router.route("/get").get(isLoggedIn, getAllApplications);

router.route("/input").get(isLoggedIn, getAllInputRequests);
router.route("/approval").get(isLoggedIn, getAllApprovals);



export default router;
