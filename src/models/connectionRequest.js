const mongoose = require("mongoose");
// const User = require("../models/user");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not correct status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send the connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
