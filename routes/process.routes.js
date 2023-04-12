import express from "express";
import {
  createProcess,
  getAllProcesses,
  getProcessbyID,
  updateProcess,
} from "../controllers/Process/process.controller.js";

const router = express.Router();

router.route("/create").post(createProcess);
router.route("/update/:id").put(updateProcess);
router.route("/get/:id").get(getProcessbyID);
router.route("/get").get(getAllProcesses);
export default router;
