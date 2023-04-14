import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  section: [
    {
      name: String,
      _id: false,
      description: String,
      fields: [
        {
          name: String,
          type: String,
          required: Boolean,
          _id: false,
          options: [String],
          placeholder: String,
        }]
      },
  ],
  approvals: [
    {
      name: String,
      Type: {
        type: String,
        enum: ["input", "approval"],
      },
      user_id: Number,
      Hidden_fields: [String],
      Read_Only_field: [String],
      status: {
        type: String,
      },
      _id: false,
    },
  ],
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
});

const Process = mongoose.model("Process", processSchema);
export default Process;
