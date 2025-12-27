import type { AuthProvider } from "@refinedev/core";
import type { IUser } from "~/features/dashboard/users/types/users.type";
import { api } from "~/lib/api/axios-instance";
import type { ILoginResponse } from "../types/auth.type";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
	login: async ({ email, password }) => {
		if (email && password) {
			try {
				const res = await api.post<ILoginResponse>("/auth/login", {
					email,
					password,
				});

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
				const err = error as { response?: { data?: { message?: string } } };
				return {
					success: false,
					error: {
						name: "LoginError",
						message: err.response?.data?.message ?? "Login failed",
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
				const res = await api.post<true>("/auth/register", {
					fullName,
					username,
					email,
					password,
				});

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
				const err = error as { response?: { data?: { message?: string } } };

				return {
					success: false,
					error: {
						name: "RegisterError",
						message: err.response?.data?.message ?? "Registration failed",
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
				const res = await api.get<{ user: IUser }>("/auth/me");
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
