import { z } from "zod";
import Header from "./header";

const ResumeSchema = z.object({
    header: Header,
    sections: z.object({})
})

export default ResumeSchema;