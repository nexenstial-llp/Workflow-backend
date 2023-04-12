import mongoose, { mongo } from "mongoose";

const requestSchema = new mongoose.Schema({
  process_id: {
    type: String,
  },
  Fields: [
    {
      name: String,
      type_of_field: String,
      required: Boolean,
      key: String,
      Filled_by: String,
      Value: String,
      _id : false
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
      status: {
        type: String,
      },
      _id : false
    },
  ],
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
});

const Request = mongoose.model("Request",requestSchema);
export default Request;