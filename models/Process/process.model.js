import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  Fields: [
    {
      name: String,
      type_of_field: String,
      required: Boolean,
      key: String,
      _id: false,
    },
  ],
  Approvals: [
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
