const OTP = require("../controllers/otp.controller");
const Validator = require("../middlewares/validator");
const router = require("express").Router();

// router.get("/", OTP.getOTPs);
// router.get("/:id", OTP.getOTP);
// router.post("/", OTP.addOTP);
// router.put("/:id", OTP.updateOTP);
// router.delete("/:id", OTP.deleteOTP);

router.post("/newotp", OTP.newOTP);
router.post("/verify", OTP.verifyOTP);
router.delete("/delete", OTP.deleteOTP);
router.get("/:id", OTP.getOTP);
router.get("/", OTP.getOTPs);


module.exports = router;