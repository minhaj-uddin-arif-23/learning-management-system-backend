import mongoose from "mongoose";
import { tr } from "zod/locales/index.cjs";

const moduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  number: { type: Number, required: true },
});

export default mongoose.model("Module", moduleSchema);
