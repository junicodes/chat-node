const mongoose = require("mongoose");

const TimeTrackerSchema = mongoose.Schema(
  {
    startTime: { type : Date, default: Date.now, required: true },
    endTime: { type : Date, default: Date.now, required: true },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TimeTrackers", TimeTrackerSchema);
