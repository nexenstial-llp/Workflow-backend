import bigPromise from "../../middlewares/bigPromise.js";
import Request from "../../models/Requests/requests.model.js";
export const createRequests = bigPromise(async (req, res) => {
  const { process_id, status, Fields, Approvals } = req.body;
  const newDocument = new Request({
    process_id: process_id,
    Fields: Fields,
    Approvals: Approvals,
    status: status,
  });

  newDocument
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export const updateRequests = bigPromise(async (req, res) => {
  const { id } = req.params;
  const { process_id, status, Fields, Approvals } = req.body;
  await Request.findByIdAndUpdate(id, {
    $set: {
      process_id: process_id,
      status: status,
      Fields: Fields,
      Approvals: Approvals,
    },
  })
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export const getRequestsbyId = bigPromise(async (req, res) => {
  const { id } = req.params;
  await Request.findById(id)
    .then((data) => {
      res.status(201).json({
        message: "Successfully sent all details",
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        message: "Something Error",
      });
    });
});

export const getAllrequests = bigPromise(async (req, res) => {
  await Request.find({})
    .then((data) => {
      res.status(201).json({
        message: "Successfully sent all details",
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        message: "Something Error",
      });
    });
});
