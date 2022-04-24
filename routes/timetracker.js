const { addTimedMessage, getTimedMessage } = require("../controllers/timeTrackerController");
const router = require("express").Router();

router.post("/store/range", addTimedMessage);
router.get("/", getTimedMessage);

module.exports = router;
