import z from "zod";

export const resendEmailVerificationRequest = z.object({
	email: z.email("Email is invalid").nonempty("Email is required"),
});

export type ResendEmailVerificationRequest = z.infer<
	typeof resendEmailVerificationRequest
>;
