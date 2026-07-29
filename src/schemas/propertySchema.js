import * as z from "zod";

export const createPropertySchema = z.object({
    type: z.string()
        .min(4, { error: "Type should be at least 4 characters" }),
    location: z.string()
        .min(3, { error: "Location should be at least 3 characters" }),
    area: z.coerce.number()
        .min(2, { error: "Area should be at least 2 digits" }),
    image: z.httpUrl({ error: "Invalid URL address" }),
    price: z.string()
        .min(1, { error: "Price should be at least 1" })
        .max(10, { error: "Price should be at most 10 characters long" })
        .regex(/^\d+$/, { error: "Price must contain only digits" })
        .transform((x) => Number(x)),
    contact: z.string()
        .length(10, { error: "Contact should be at least 10 characters long" })
        .regex(/^\d+$/, { error: "Contact must contain only digits" })
        .transform((x) => Number(x)),
    description: z.string()
        .min(10, { error: "Descriptiom must be at least 10 characters long" })
})