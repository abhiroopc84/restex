import { z } from "zod";

const BulletSchema = z.object({
    bullet: z.string(),
})

export default BulletSchema;