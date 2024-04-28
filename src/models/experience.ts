import dateParser from "@/helpers/date-parser";
import { z } from "zod";

const ExperienceSchema = z.object({
    company: z.string(),
    location: z.string(),
    position: z.string(),
    start_date: z.string().regex(/\b\d{4}-(?:0[1-9]|1[0-2])(-(?:0[1-9]|[1-2][0-9]|3[01])){0,1}\b/,{ message: "Invalid date" }).transform((val)=>{
        return dateParser(val);
    }),
    end_date: z.string().regex(/\b\d{4}-(?:0[1-9]|1[0-2])(-(?:0[1-9]|[1-2][0-9]|3[01])){0,1}\b/,{ message: "Invalid date" }).transform((val)=>{
        return dateParser(val);
    }).optional(),
    current: z.boolean(),
    highlights: z.array(z.string()).optional(),
})

export default ExperienceSchema;