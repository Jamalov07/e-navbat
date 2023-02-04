const Spec_working_day = require("../controllers/spec_working_day.controller");

const router = require("express").Router();

router.get("/", Spec_working_day.getSpec_Working_Days);
router.get("/:id", Spec_working_day.getSpec_Working_Day);
router.post("/", Spec_working_day.addSpec_Working_Day);
router.put("/:id", Spec_working_day.updateSpec_Working_Day);
router.delete("/:id", Spec_working_day.deleteSpec_Working_Day);

module.exports = router;