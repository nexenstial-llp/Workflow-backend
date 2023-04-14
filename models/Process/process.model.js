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
      title: String,
      description: String,
      fields: [
        {
          title: String,
          type: String,
          required: Boolean,
          options: [String],
          placeholder: String,
        },
      ],
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
