import mongoose from "mongoose";

const progresSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
  lastUnlockLecture: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  progress: [progresSchema],
});

export default mongoose.model("User", userSchema);
