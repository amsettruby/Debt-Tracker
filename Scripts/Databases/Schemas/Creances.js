import mongoose from "mongoose";

const CreanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  person: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 100,
  },
  state: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "No Description",
  },
});

export default new mongoose.model('Creance', CreanceSchema)