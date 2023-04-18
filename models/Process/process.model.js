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
          _id: false,
        },
      ],
    },
  ],
  approvals: [
    {
      name: String,
      type_of_approval: {
        type: String,
        enum: ["input", "approval", "create"],
      },
      users: [String],
      hidden_fields: [String],
      read_only_field: [String],
      status: String,
      access_to_all: Boolean,
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
