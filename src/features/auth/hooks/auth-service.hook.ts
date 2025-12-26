import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "~/lib/constan";
import type { IBaseResponse } from "~/types/base-response.type";
import { TOKEN_KEY } from "../providers/auth.provider";
import type { IResendEmailVerificationResponse } from "../types/auth.type";
import type { ResendEmailVerificationRequest } from "../types/auth-request.type";

const token = localStorage.getItem(TOKEN_KEY);

export const useResendEmailVerification = (
	data: ResendEmailVerificationRequest,
) => {
	const mutateEmailVerification = useMutation({
		mutationFn: async () => {
			return axios.post<IBaseResponse<IResendEmailVerificationResponse>>(
				`${BASE_API_URL}/auth/resend-verification`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
		},
	});

	return {
		mutateEmailVerification,
	};
};
