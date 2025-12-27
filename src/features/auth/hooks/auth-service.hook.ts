import { useMutation } from "@tanstack/react-query";
import { api } from "~/lib/api/axios-instance";
import type {
	ILoginResponse,
	IResendEmailVerificationResponse,
} from "../types/auth.type";
import type {
	LoginRequest,
	RegisterRequest,
	ResendEmailVerificationRequest,
} from "../types/auth-request.type";

export const authService = {
	login: (data: LoginRequest) => api.post<ILoginResponse>("/auth/login", data),
	register: (data: RegisterRequest) => api.post<true>("/auth/register", data),
	resendEmailVerification: (data: ResendEmailVerificationRequest) =>
		api.post<IResendEmailVerificationResponse>(
			"/auth/resend-verification",
			data,
		),
};

export const useLogin = (data: LoginRequest) => {
	const mutateLogin = useMutation({
		mutationFn: async () => {
			return authService.login(data);
		},
	});

	return {
		mutateLogin,
	};
};

export const useRegister = (data: RegisterRequest) => {
	const mutateRegister = useMutation({
		mutationFn: async () => {
			return authService.register(data);
		},
	});

	return {
		mutateRegister,
	};
};

export const useResendEmailVerification = (
	data: ResendEmailVerificationRequest,
) => {
	const mutateEmailVerification = useMutation({
		mutationFn: async () => {
			return authService.resendEmailVerification(data);
		},
	});

	return {
		mutateEmailVerification,
	};
};
