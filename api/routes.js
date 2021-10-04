const express = require("express");
const router = express.Router();

const cSliders = require("./controllers/sliderController");
router.get("/api/slides", cSliders.get);
router.post("/api/slides", cSliders.post);
router.put("/api/slides", cSliders.put);
router.delete("/api/slides/:id", cSliders.delete);

module.exports = router;