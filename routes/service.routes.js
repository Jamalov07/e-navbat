const Service = require("../controllers/service.controller");
const Validator = require("../middlewares/validator");

const router = require("express").Router();

router.get("/", Service.getServices);
router.get("/:id", Service.getService);
router.post("/",Validator("service"), Service.addService);
router.put("/:id", Service.updateService);
router.delete("/:id", Service.deleteService);

module.exports = router;