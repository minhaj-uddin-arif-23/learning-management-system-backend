import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  title: { type: String, required: true },
  videoURL: { type: String },
  notes: [{ type: String }],
});


export default mongoose.model('lecture',lectureSchema);