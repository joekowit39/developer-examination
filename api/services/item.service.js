const { BSON } = require("mongodb");
const connectDB = require("../configs/dbConn");
const itemModel = require("../models/response.model");

exports.findItem = async () => {
  await connectDB.connect();
  const res = await connectDB
    .db("developer_exam")
    .collection("item_data")
    .find({})
    .toArray();
  await connectDB.close();
  return res;
};

exports.findItemById = async (id) => {
  const objId = new BSON.ObjectId(id);
  await connectDB.connect();
  const res = await connectDB
    .db("developer_exam")
    .collection("item_data")
    .findOne({ _id: objId });
  await connectDB.close();
  return res;
};

exports.addItem = async (data) => {
  await connectDB.connect();
  itemModel.name = data.name;
  itemModel.price = data.price;
  itemModel.quantity = data.quantity;
  itemModel.description = data.description;
  const res = await connectDB
    .db("developer_exam")
    .collection("item_data")
    .insertOne(itemModel);
  await connectDB.close();
  return res;
};

exports.editItem = async (data) => {
  const objId = new BSON.ObjectId(data.id);
  await connectDB.connect();
  itemModel.name = data.name;
  itemModel.price = data.price;
  itemModel.quantity = data.quantity;
  itemModel.description = data.description;
  const res = await connectDB.db('developer_exam').collection('item_data').updateOne({_id: objId}, {"$set": itemModel});
  await connectDB.close();
  return res;
};
