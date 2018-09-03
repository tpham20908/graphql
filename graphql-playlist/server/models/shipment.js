const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
  senderName: String,
  receiverName: String
});

module.exports = mongoose.model("Shipment", shipmentSchema);