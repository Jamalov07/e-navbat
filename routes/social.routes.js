const Social = require("../controllers/social.controller");
const router = require("express").Router();

router.get("/", Social.getSocials);
router.get("/:id", Social.getSocial);
router.post("/", Social.addSocial);
router.put("/:id", Social.updateSocial);
router.delete("/:id", Social.deleteSocial);

module.exports = router;