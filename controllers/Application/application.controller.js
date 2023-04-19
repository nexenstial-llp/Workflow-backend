import bigPromise from "../../middlewares/bigPromise.js";
import Application from "../../models/Application/application.model.js";


export const createApplication = bigPromise(async (req, res) => {
  const { name, description, section, approvals, process_id } = req.body;

  if(!name || !description || !section || !approvals || !process_id){
    return res.status(400).json({
        success: false,
        message: "Bad Request",
    });
}


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
  const {  status, section, approvals } = req.body;

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


export const getAllApplications = bigPromise(async (req, res) => {
  await Application.find({})
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
