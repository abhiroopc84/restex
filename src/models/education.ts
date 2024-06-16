import dateParser from "@/helpers/date-parser";
import { z } from "zod";

const EducationSchema = z.object({
    institution: z.string(),
    location: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    start_date: z.string().regex(/\b\d{4}-(?:0[1-9]|1[0-2])(-(?:0[1-9]|[1-2][0-9]|3[01])){0,1}\b/,{ message: "Invalid date" }).transform((val)=>{
        return dateParser(val);
    }),
    end_date: z.string().regex(/\b\d{4}-(?:0[1-9]|1[0-2])(-(?:0[1-9]|[1-2][0-9]|3[01])){0,1}\b/,{ message: "Invalid date" }).transform((val)=>{
        return dateParser(val);
    }),
    current: z.boolean(),
    GPA: z.string().optional(),
    highlights: z.array(z.string()).optional(),
})

const EducationGuiSchema = z.object({
    institution: z.string(),
    location: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    start_date: z.date(),
    end_date: z.date().optional(),
    current: z.boolean(),
    GPA: z.string().optional(),
    highlights: z.array(z.string()).optional(),
})

export default { EducationSchema, EducationGuiSchema };