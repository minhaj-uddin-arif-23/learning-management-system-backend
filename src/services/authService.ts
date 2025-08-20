import bcrypt from "bcryptjs";
import  User from "../models/User";
import jwt from "jsonwebtoken";
import { ValidationError } from "../utils/customError";
import z from "zod";

const authSchema = z.object({
  username: z.string().min(3, "username at least 3 characters"),
  password: z.string().min(6, "Password at least 6 characters"),
  role: z.enum(["admin", "user"]).optional().default("user"),
});
// user register 
 export const registerUser = async (data: {
  username: string;
  password: string;
  role?: string;
}) => {
  const parsed = authSchema.safeParse(data);
  if (!parsed.success) throw new ValidationError(parsed.error.message);

  // sequre  password
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);

  const user = new User(data);
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return {
    user: { id: user._id, username: user.username, role: user.role },
    token,
  };
};

// user login
export const loginUser = async (data: { username: string; password: string }) => {
  const parsed = authSchema.omit({ role: true }).safeParse(data);
  if (!parsed.success) throw new ValidationError(parsed.error.message);

  // find user

  const user = await User.findOne({ username: data.username });
  if (!user) throw new ValidationError("Invalid Creadentials");

  // match password

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) throw new ValidationError("Password not matched");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return {
    user: { id: user._id, username: user.username, role: user.role },
    token,
  };
};




