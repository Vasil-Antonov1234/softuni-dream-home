import * as z from "zod";
import bcrypt from "bcrypt";

export const createUserSchema = z.object({
    email: z.email({ error: "Invalid email address" })
        .min(10, { error: "The email should be at least 10 characters long" }),
    password: z.string()
        .min(4, { error: "The password should be at least 4 characters long" }),
    rePassword: z.string()
        .min(4, { error: "The repeat password should be at least 4 characters long" })
}).refine((data => data.password === data.rePassword), { error: "Passwords missmatch", path: ["password"] })
    .transform(async ({ rePassword, ...data }) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return { ...data, password: hashedPassword }
    })