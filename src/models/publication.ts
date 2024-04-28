import dateParser from "@/helpers/date-parser";
import { z } from "zod";

const PublicationSchema = z.object({
    title: z.string(),
    authors: z.array(z.string()),
    date: z.string().regex(/\b\d{4}-(?:0[1-9]|1[0-2])(-(?:0[1-9]|[1-2][0-9]|3[01])){0,1}\b/,{ message: "Invalid date" }).transform((val)=>{
        return dateParser(val);
    }),
    journal: z.string(),
    doi: z.string().regex(/^(10\.\d{4,5}\/[\S]+[^;,.\s])$/,{ message: "Invalid doi" }),
})

export default PublicationSchema;