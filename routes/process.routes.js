import express from "express";
import {
  createProcess,
  getAllCreateProcess,
  getAllProcesses,
  getProcessbyID,
  updateProcess,
} from "../controllers/Process/process.controller.js";
import { isLoggedIn } from "../middlewares/userMiddlewares.js";

const router = express.Router();

router.route("/create").post(createProcess);
router.route("/update/:id").put(updateProcess);
router.route("/get/:id").get(getProcessbyID);
router.route("/get").get(getAllProcesses);
router.route("/create/all").get(isLoggedIn, getAllCreateProcess);


export default router;
