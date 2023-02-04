const Admin = require("../controllers/admin.controller");
const router = require("express").Router();
const express = require("express");
const Validator = require("../middlewares/validator");

express.application.prefix = express.Router.prefix = function (
    path,
    configure
  ) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
  };



router.get("/", Admin.getAdmins);
router.get("/:id", Admin.getAdmin);
router.post("/", Admin.addAdmin);
router.put("/:id", Admin.updateAdmin);
router.delete("/:id", Admin.deleteAdmin);




module.exports = router;