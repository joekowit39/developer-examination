const itemService = require("../services/item.service");

exports.getItem = async (req, res) => {
  const result = await itemService.findItem();
  if (result == null) res.status(404).json({});

  console.log(result);
  return res.status(200).json({
    status: 200,
    message: "OK",
    data: result,
  });
};

exports.getItemById = async (req, res) => {
  const result = await itemService.findItemById(req.params.id);
  if (result == null) res.status(404).json({});

  console.log(result);
  return res.status(200).json({
    status: 200,
    message: "OK",
    data: result,
  });
};

exports.insertItem = async (req, res) => {
  const result = await itemService.addItem(req.body);
  if (result == null) res.status(404).json({});

  console.log(result);
  return res.status(200).json({
    status: 200,
    message: "OK",
  });
};

exports.updateItem = async (req, res) => {
  const result = await itemService.editItem(req.body);
  if (result == null) res.status(404).json({});

  console.log(result);
  return res.status(200).json({
    status: 200,
    message: "OK",
  });
};
