import { z } from "zod";

export const ExperienceSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
  company: z.string().min(3).max(50),
  time: z.string().min(3).max(50),
});
