import bigPromise from "../../middlewares/bigPromise.js";
import Application from "../../models/Application/application.model.js";

export const createApplication = bigPromise(async (req, res) => {
  const { name, description, section, approvals, process_id } = req.body;

  if (!name || !description || !section || !approvals || !process_id) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }

  approvals.forEach((approval) => {
    if (approval.type_of_approval === "create") {
      approval.approval_by = req.user._id;
      approval.status = "Completed";
    }
  });

  const newDocument = new Application({
    name: name,
    description: description,
    section: section,
    approvals: approvals,
    process_id: process_id,
    created_by: req.user._id,
    status: "ACTIVE",
  });

  newDocument
    .save()
    .then((doc) => {
      res.status(201).json({
        success: true,
        message: "Successfully created",
        data: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export const updateApplication = bigPromise(async (req, res) => {
  const { id } = req.params;
  const { status, section, approvals } = req.body;

  await Application.findByIdAndUpdate(id, {
    $set: {
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

export const getApplicationbyID = bigPromise(async (req, res) => {
  const { id } = req.params;

  await Application.findById(id)
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

export const getAllApplications = bigPromise(async (req, res) => {
  await Application.find({})
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

export const getAllInputRequests = bigPromise(async (req, res) => {
  const { id } = req.user;

  await Application.find({
    $and: [
      { status: "ACTIVE" },
      {
        approvals: {
          $elemMatch: {
            type_of_approval: "input",
            $or: [{ access_to_all: true }, { users: id }],
            status: "Pending",
          },
        },
      },
    ],
  })
    .then((data) => {
      const newData = [];

      data.forEach((item) => {
        for (let i = 0; i < item.approvals.length; i++) {
          if (
            item.approvals[i].type_of_approval === "input" &&
            item.approvals[i].status === "Pending" &&
            (item.approvals[i].access_to_all ||
              item.approvals[i].users.includes(id))
          ) {
            if (item.approvals[i - 1].status == "Completed") {
              newData.push(item);
              return;
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        message: "Successfully sent all details",
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        sucess: false,
        message: "Something Went Wrong",
      });
    });
});

export const getAllApprovals = bigPromise(async (req, res) => {
  const { id } = req.user;

  await Application.find({
    $and: [
      { status: "ACTIVE" },
      {
        approvals: {
          $elemMatch: {
            type_of_approval: "approval",
            $or: [{ access_to_all: true }, { users: id }],
            status: "Pending",
          },
        },
      },
    ],
  })
    .then((data) => {
      const newData = [];

      data.forEach((item) => {
        for (let i = 0; i < item.approvals.length; i++) {
          if (
            item.approvals[i].type_of_approval === "approval" &&
            item.approvals[i].status === "Pending" &&
            (item.approvals[i].access_to_all ||
              item.approvals[i].users.includes(id))
          ) {
            if (item.approvals[i - 1].status == "Completed") {
              newData.push(item);
              return;
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        message: "Successfully sent all details",
        data: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        message: "Something Error",
      });
    });
});

export const getAllDashboardData = bigPromise(async (req, res) => {
  const id = req.user._id;
  const inputRequests = await Application.find({
    $and: [
      { status: "ACTIVE" },
      {
        approvals: {
          $elemMatch: {
            type_of_approval: "input",
            $or: [{ access_to_all: true }, { users: id }],
          },
        },
      },
    ],
  }).countDocuments();

  const approvals = await Application.find({
    $and: [
      { status: "ACTIVE" },
      {
        approvals: {
          $elemMatch: {
            type_of_approval: "approval",
            $or: [{ access_to_all: true }, { users: id }],
            status: "Pending",
          },
        },
      },
    ],
  }).countDocuments();

  const allApplications = await Application.find({}).countDocuments();

  res.status(201).json({
    success: true,
    message: "Successfully sent all details",
    data: {
      inputRequests,
      approvals,
      allApplications,
    },
  });
});
