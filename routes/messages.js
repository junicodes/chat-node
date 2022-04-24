const { addMessage, getMessages, addMessageFile } = require("../controllers/messageController");
const router = require("express").Router();
const multer  = require('multer')
const upload = multer({
    dest: "uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post('/file', upload.single('file'), addMessageFile)

module.exports = router;
