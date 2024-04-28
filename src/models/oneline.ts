import { z } from "zod";

const OnelineSchema = z.object({
    label: z.string(),
    details: z.string(),
});

export default OnelineSchema;