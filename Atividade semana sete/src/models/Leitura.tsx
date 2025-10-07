

const mongoose = require("mongoose"); 
const leituraSchema = new mongoose.Schema({ cidade: String, sensor: String, valor: Number, data: { type: Date, default: Date.now } });
 
module.exports = mongoose.model("Leitura", leituraSchema);


