const Spec_service = require("../controllers/spec_service.controller");

const router = require("express").Router();

router.get("/", Spec_service.getSpec_Services);
router.get("/:id", Spec_service.getSpec_Service);
router.post("/", Spec_service.addSpec_Service);
router.put("/:id", Spec_service.updateSpec_Service);
router.delete("/:id", Spec_service.deleteSpec_Service);

module.exports = router;