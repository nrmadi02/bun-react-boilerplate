import z from "zod";

export const loginRequest = z.object({
	email: z.email("Email is invalid").nonempty("Email is required"),
	password: z.string().min(1, "Password is required"),
});

export const registerRequest = z.object({
	fullName: z.string().min(1, "Full name is required"),
	username: z.string().min(1, "Username is required"),
	email: z.email("Email is invalid").nonempty("Email is required"),
	password: z.string().min(1, "Password is required"),
});

export const resendEmailVerificationRequest = z.object({
	email: z.email("Email is invalid").nonempty("Email is required"),
});

export type LoginRequest = z.infer<typeof loginRequest>;
export type RegisterRequest = z.infer<typeof registerRequest>;
export type ResendEmailVerificationRequest = z.infer<
	typeof resendEmailVerificationRequest
>;
