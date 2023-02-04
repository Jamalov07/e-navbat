const Token = require("../controllers/token.controller");

const router = require("express").Router();

router.get("/", Token.getTokens);
router.get("/:id", Token.getToken);
router.post("/", Token.addToken);
router.put("/:id", Token.updateToken);
router.delete("/:id", Token.deleteToken);

module.exports = router;