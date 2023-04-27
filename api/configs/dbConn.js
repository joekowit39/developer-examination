const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://api_recruit:As4TapTe768DOS68@recruitment.mos8yva.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
client.connect().then(() => {
  console.log("Successfully connected to database");
});

module.exports = client;
