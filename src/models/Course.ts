import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  thumnail: { type: String },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
});


export default mongoose.model('Course',courseSchema)