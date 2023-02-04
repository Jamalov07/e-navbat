const Specialist = require("../controllers/specialist.controller");

const router = require("express").Router();

router.get("/", Specialist.getSpecialists);
router.get("/:id", Specialist.getSpecialist);
router.post("/", Specialist.addSpecialist);
router.put("/:id", Specialist.updateSpecialist);
router.delete("/:id", Specialist.deleteSpecialist);

module.exports = router;