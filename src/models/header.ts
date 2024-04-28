import { z } from "zod";

const social_networks = z.object({
    network: z.string(),
    username: z.string(),
});

const HeaderSchema = z.object({
    name: z.string(),
    location: z.string(),
    email: z.string().email(),
    phone: z.coerce.string().regex(/^(\+*\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,{ message: "Invalid phone" }).optional(),
    website: z.string().url().optional(),
    social_networks: z.array(social_networks).optional(),
});

export default HeaderSchema;
