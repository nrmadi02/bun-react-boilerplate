import { z } from "zod";

export const loginSchema = z.object({
	email: z.email("Email tidak valid").nonempty("Email wajib diisi"),
	password: z.string().min(8, "Password minimal 8 karakter"),
});

export type LoginRequest = z.infer<typeof loginSchema>;
