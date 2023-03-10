const router = require("express").Router();
const clientRoutes = require("./client.routes");
const adminRoutes = require("./admin.routes");
const responseRoutes = require("./responses.routes");
const otpRoutes = require("./otp.routes");
const queueRoutes = require("./queue.routes");
const serviceRoutes = require("./service.routes");
const socialRoutes = require("./social.routes");
const spec_serviceRoutes = require("./spec_service.routes");
const spec_socialRoutes = require("./spec_social.routes");
const spec_working_dayRoutes = require("./spec_working_day.routes");
const specialistRoutes = require("./specialist.routes");
const tokenRoutes = require("./token.routes");

router.use(responseRoutes);
router.use("/client", clientRoutes);
router.use("/admin", adminRoutes);
router.use("/otp", otpRoutes);
router.use("/queue", queueRoutes);
router.use("/service", serviceRoutes);
router.use("/social", socialRoutes);
router.use("/spec_service", spec_serviceRoutes);
router.use("/spec_social", spec_socialRoutes);
router.use("/spec_working_day", spec_working_dayRoutes);
router.use("/specialist", specialistRoutes);
router.use("/token", tokenRoutes);
module.exports = router;
