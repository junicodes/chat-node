const Timer = require("../models/timeTrackerModel");
const User = require("../models/userModel");
const Messages = require("../models/messageModel");


module.exports.getTimedMessage = async (req, res, next) => {
  try {

    const timerTrack = Timer.inventory.find( { $and: [ { startTime: { $eq: req.params.startTime } }, { endTime: { $eq: req.params.endTime } } ] } )
    
    const projectedMessages = await Messages.find({ sender: { $eq: timerTrack.user.from } }).sort({ updatedAt: 1 });

    res.json([timerTrack, projectedMessages]);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addTimedMessage = async (req, res, next) => {
  try {
    const { from, to, startTime, endTime } = req.body;

    const data = await Timer.create({
     startTime: startTime,
     endTime: endTime,
     from: from,
     to: to
    });

    if (data) return res.json({ msg: "Timed added successfully." });
    else return res.json({ msg: "Failed to add session timed to the database" });
  } catch (ex) {
    next(ex);
  }
};
