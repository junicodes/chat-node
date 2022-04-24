const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        id: msg._id,
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        type: msg.type,
        filePath: msg.file ? msg.file.path  : null
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, type, message } = req.body;

    const data = await Messages.create({
      type: 'text',
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessageFile = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    console.log(req.body)

    console.log(from, to)
    console.log(req.file)

    const data = await Messages.create({
      message: { text: `File Upload: ${req.file.originalname}` },
      type: 'file',
      filePath: req.file.path,
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "File added successfully.", data });
    else return res.json({ msg: "Failed to add message to the database" });

  } catch (ex) {
    next(ex);
  }
};

