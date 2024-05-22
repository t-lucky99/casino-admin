import * as z from "zod";

export const GameSchema = z.object({
    name: z.string().min(6, {
        message: "Minimum of 6 characters"
    }),
    image: z.string(),
    typeId: z.string().min(1, 'Required field'),
    providerId: z.string().min(1, 'Required field'),
    releaseDate: z.date(),
    createDate: z.date(),
    updateDate: z.date()
})