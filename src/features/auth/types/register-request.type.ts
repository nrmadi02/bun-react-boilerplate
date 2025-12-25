import z from "zod";

export const registerSchema = z
	.object({
		fullName: z.string().min(3, "Nama minimal 3 karakter"),
		username: z.string().min(3, "Username minimal 3 karakter"),
		email: z.email("Email tidak valid").nonempty("Email wajib diisi"),
		password: z.string().min(8, "Password minimal 8 karakter"),
		passwordConfirmation: z.string().min(8, "Password minimal 8 karakter"),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Password konfirmasi tidak cocok",
		path: ["passwordConfirmation"],
	});

export type RegisterRequest = z.infer<typeof registerSchema>;
