const Queue = require("../controllers/queue.controller");

const router = require("express").Router();

router.get("/", Queue.getQueues);
router.get("/:id", Queue.getQueue);
router.post("/", Queue.addQueue);
router.put("/:id", Queue.updateQueue);
router.delete("/:id", Queue.deleteQueue);

module.exports = router;
