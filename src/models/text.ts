import { z } from "zod";

const TextSchema = z.string().optional();

const TextGuiSchema = z.object({
    text: z.string().min(10, {
        message: "Text must be at least 10 characters.",
      })
      .max(500, {
        message: "Text must not be longer than 500 characters.",
      }),
});

export default { TextSchema, TextGuiSchema };
