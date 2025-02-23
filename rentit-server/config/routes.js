const router = require("express").Router();

router.use("/api/v1/users", require("../controller/UserController"));

module.exports = router;

