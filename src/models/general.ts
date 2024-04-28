import { z } from "zod";
import dateParser from "@/helpers/date-parser";

const GeneralSchema = z.object({
    name: z.string(),
    location: z.string().optional(),
    institution: z.string().optional(),
    date: z.string().regex(/\b\d{4}-(?:0[1-9]|1[0-2])(-(?:0[1-9]|[1-2][0-9]|3[01])){0,1}\b/,{ message: "Invalid date" }).transform((val)=>{
        return dateParser(val);
    }),
    highlights: z.array(z.string()).optional(),
})

export default GeneralSchema;