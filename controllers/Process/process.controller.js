import bigPromise from "../../middlewares/bigPromise.js";
import Process from "../../models/Process/process.model.js";

export const createProcess = bigPromise(async (req, res) => {
  const { name, description, status, Fields, Approvals } = req.body;

  console.log(Fields, Approvals);

  const newDocument = new Process({
    name: name,
    description: description,
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

export const updateProcess = bigPromise(async (req, res) => {
  const { id } = req.params;
  const { name, description, status, Fields, Approvals } = req.body;
  await Process.findByIdAndUpdate(id, {
    $set: {
      name: name,
      description: description,
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

export const getProcessbyID = bigPromise(async (req, res) => {
  const { id } = req.params;
  await Process.findById(id)
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

export const getAllProcesses = bigPromise(async (req, res) => {
  await Process.find({})
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
