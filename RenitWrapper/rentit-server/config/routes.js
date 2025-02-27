const router = require("express").Router();

router.use("/api/v1/users", require("../controller/UserController"));
router.use("/api/v1/auth", require("../controller/AuthController"));

module.exports = router;

