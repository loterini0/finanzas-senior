// backend/src/routes/assistant.routes.js
const express = require("express");
const { askAssistant } = require("../controllers/assistant.controller");
const auth = require("../middleware/auth"); // middleware JWT
const router = express.Router();

router.post("/query", auth, askAssistant);

module.exports = router;
