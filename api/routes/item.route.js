const router = require("express").Router();
const itemController = require("../controllers/item.controller");

router.get("/get_item", itemController.getItem);
router.get("/get_item_by_id/:id", itemController.getItemById);
router.post("/insert_item", itemController.insertItem);
router.post("/update_item", itemController.updateItem);

module.exports = router;
