const Client = require("../controllers/client.controller");

const router = require("express").Router();

router.get("/", Client.getClients);
router.get("/:id", Client.getClient);
router.post("/", Client.addClient);
router.put("/:id", Client.updateClient);
router.delete("/:id", Client.deleteClient);

module.exports = router;
