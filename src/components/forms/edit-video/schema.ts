import z from "zod";

export const editVideoInfoSchema = z.object({
  title: z.string().min(5, { message: "Title must have more than 5 chars" }),
  description: z
    .string()
    .min(15, { message: "Desc must have more than 15 chars" }),
});
