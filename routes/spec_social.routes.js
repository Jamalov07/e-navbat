const Spec_social = require("../controllers/spec_social.controller");

const router = require("express").Router();

router.get("/", Spec_social.getSpec_Socials);
router.get("/:id", Spec_social.getSpec_Social);
router.post("/", Spec_social.addSpec_Social);
router.put("/:id", Spec_social.updateSpec_Social);
router.delete("/:id", Spec_social.deleteSpec_Social);

module.exports = router;