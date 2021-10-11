const express = require("express");
const router = express.Router();

const cSliders = require("./controllers/sliderController");
router.get("/api/slides", cSliders.get);
router.post("/api/slides", cSliders.post);
router.put("/api/slides", cSliders.put);
router.delete("/api/slides/:id", cSliders.delete);

const cPortfolio = require("./controllers/portfolioController");
router.get("/api/portfolio", cPortfolio.get);
router.post("/api/portfolio", cPortfolio.post);
router.put("/api/portfolio", cPortfolio.put);
router.delete("/api/portfolio/:id", cPortfolio.delete);

const cTag = require("./controllers/tagController");
router.post("/api/tag", cTag.post);
router.get("/api/tag", cTag.get);
router.delete("/api/tag/:tagId/:portfolioId", cTag.delete);

const cFile = require("./controllers/fileController");
router.post("/api/file/:portfolioId", cFile.post);
router.get("/api/file", cFile.get);
router.delete("/api/file/:fileId/:portfolioId", cFile.delete);

module.exports = router;