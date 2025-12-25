import type { AuthProvider } from "@refinedev/core";
import axios, { type AxiosError } from "axios";
import type { IUser } from "~/features/dashboard/users/types/users.type";
import { BASE_API_URL } from "~/lib/constan";
import type { IBaseResponse } from "~/types/base-response.type";
import type { ILoginResponse } from "../types/auth.type";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
	login: async ({ email, password }) => {
		if (email && password) {
			try {
				const res = await axios.post<IBaseResponse<ILoginResponse>>(
					`${BASE_API_URL}/auth/login`,
					{
						email,
						password,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					},
				);

				const data = res.data;

				if (data.success) {
					localStorage.setItem(TOKEN_KEY, data.data.token);
					return {
						success: true,
						redirectTo: "/home",
					};
				}

				return {
					success: false,
					error: {
						name: "LoginError",
						message: "Invalid email or password",
					},
				};
			} catch (error) {
				const err = error as AxiosError<{ message: string }>;
				return {
					success: false,
					error: {
						name: "LoginError",
						message: err.response?.data.message ?? "",
					},
				};
			}
		}

		return {
			success: false,
			error: {
				name: "LoginError",
				message: "Invalid email or password",
			},
		};
	},
	register: async ({ fullName, username, email, password }) => {
		if (fullName && username && email && password) {
			try {
				const res = await axios.post<IBaseResponse<true>>(
					`${BASE_API_URL}/auth/register`,
					{
						fullName,
						username,
						email,
						password,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					},
				);

				if (res.data.success) {
					return {
						success: true,
						redirectTo: "/login",
					};
				}

				return {
					success: false,
					error: {
						name: "RegisterError",
						message: "Invalid data",
					},
				};
			} catch (error) {
				const err = error as AxiosError<{ message: string }>;

				return {
					success: false,
					error: {
						name: "RegisterError",
						message: err.response?.data.message ?? "",
					},
				};
			}
		}
		return {
			success: false,
			error: {
				name: "RegisterError",
				message: "Invalid data",
			},
		};
	},
	logout: async () => {
		localStorage.removeItem(TOKEN_KEY);
		return {
			success: true,
			redirectTo: "/login",
		};
	},
	check: async () => {
		const token = localStorage.getItem(TOKEN_KEY);
		if (token) {
			return {
				authenticated: true,
			};
		}

		return {
			authenticated: false,
			redirectTo: "/login",
		};
	},
	getPermissions: async () => null,
	getIdentity: async () => {
		const token = localStorage.getItem(TOKEN_KEY);

		try {
			if (token) {
				const res = await axios.get<
					IBaseResponse<{
						user: IUser;
					}>
				>(`${BASE_API_URL}/auth/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				return {
					...res.data.data.user,
				};
			}
			return null;
		} catch {
			return null;
		}
	},
	onError: async (error) => {
		console.error(error);
		return { error };
	},
};
