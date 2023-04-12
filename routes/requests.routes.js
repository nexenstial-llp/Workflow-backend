import express from "express";
import {
  createRequests,
  getAllrequests,
  getRequestsbyId,
  updateRequests,
} from "../controllers/Requests/requests.controller.js";

const router = express.Router();

router.route("/create").post(createRequests);

router.route("/update/:id").put(updateRequests);

router.route("/get/:id").get(getRequestsbyId);

router.route("/get").get(getAllrequests);
export default router;
