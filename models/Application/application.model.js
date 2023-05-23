import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  section: [
   {
      id: Number,
      _id: false,
      title: String,
      description: String,
      fields: [
        {
          id:  Number,
          title: String,
          type_of_field: String,
          required: Boolean,
          options: [String],
          placeHolder: String,
          value: String,
          _id: false,
        },
      ],
    },
  ],
  approvals: [
    {
      _id: false,
      name: String,
      type_of_approval: {
        type: String,
        enum: ["input", "approval", "create"],
      },
      users: [String],
      hidden_fields: [String],
      read_only_field: [String],
      status: {
        type: String,
        enum: ["Completed", "Pending", "Rejected"],
        default: "Pending",
      },
      approval_by: {
        type: mongoose.ObjectId,
        ref: "User",
      },
      access_to_all: Boolean,
    },
  ],
  
  process_id: {
    type: mongoose.ObjectId,
    ref: "Process",
    },

  created_by: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "COMPLETED"],
    default: "ACTIVE",
  },

});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
