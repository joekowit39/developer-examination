const router = require("express").Router();

router.use("/", require("./item.route"));

module.exports = router;
