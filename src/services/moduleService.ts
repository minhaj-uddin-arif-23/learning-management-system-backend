import Module from "../models/Module";
import { NotFoundError, ValidationError } from "../utils/customError";
import z from "zod";

const moduleSchema = z.object({
  courseId: z.string(),
  title: z.string().min(3, "Title at least 3 character or above"),
});

const createModel = async (data: { courseId: string; title: string }) => {
  const parsed = moduleSchema.safeParse(data);

  if (!parsed.success) throw new ValidationError(parsed.error.message);
  const maxNum = await Module.findOne({ courseId: data.courseId }).sort({
    number: -1,
  });
  const number = (maxNum ? maxNum.number : 0) + 1;
  const module = new Module({ ...data, number });
  await module.save();
  return module;
};

const getModulesByCourse = async (courseId: string) =>
  await Module.find({ courseId }).sort("number");

const getModuleById = async (id: string) => {
  const module = await Module.findById(id);
  if (!module) throw new NotFoundError("Module not found");
  return module;
};

const updateModule = async (id: string, data: Partial<{ title: string }>) => {
  const parsed = moduleSchema.partial().safeParse(data);
  if (!parsed.success) throw new ValidationError(parsed.error.message);

  const module = await Module.findByIdAndUpdate(id, data, { new: true });
  if (!module) throw new NotFoundError("Module not found");
  return module;
};

const deleteModule = async (id: string) => {
  const module = await Module.findByIdAndDelete(id);
  if (!module) throw new NotFoundError("Module not found");
};

export const moduleService = {
  createModel,
  getModulesByCourse,
  getModuleById,
  updateModule,
  deleteModule,
};
