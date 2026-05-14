import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
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
  descrip: {
    type: String,
    default: "No Description",
  },
});

export default new mongoose.model('Test', TestSchema)