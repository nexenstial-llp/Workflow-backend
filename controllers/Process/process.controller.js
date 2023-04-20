import bigPromise from "../../middlewares/bigPromise.js";
import Process from "../../models/Process/process.model.js";

export const createProcess = bigPromise(async (req, res) => {
  const { name, description, section, approvals } = req.body;
  console.log(name,description);
  const newDocument = new Process({
    name: name,
    description: description,
    section: section,
    approvals: approvals,
    status: "ACTIVE",
  });

  newDocument
    .save()
    .then((doc) => {
      res.status(201).json({
        success: true,
        data: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export const updateProcess = bigPromise(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, section, approvals } = req.body;
  console.log(id, approvals);
  await Process.findByIdAndUpdate(id, {
    $set: {
      name: title,
      description: description,
      status: status,
      section: section,
      approvals: approvals,
    },
  })
    .then((doc) => {
      res.status(201).json({
        success: true,
        data: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

export const getProcessbyID = bigPromise(async (req, res) => {
  const { id } = req.params;
  await Process.findById(id)
    .then((data) => {
      res.status(201).json({
        success: true,
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
        success: true,
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

export const getAllCreateProcess = bigPromise(async (req, res) => {
  const { id } = req.user;
  console.log("id", id);

  await Process.find({
    $and: [
      { status: "ACTIVE" },
      {
        approvals: {
          $elemMatch: {
            type_of_approval: "create",
            $or: [{ access_to_all: true }, { users: id }],
          },
        },
      },
    ],
  })
    .then((data) => {
      res.status(201).json({
        success:true,
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
