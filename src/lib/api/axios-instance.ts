import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";
import { TOKEN_KEY } from "~/features/auth/providers/auth.provider";
import { BASE_API_URL } from "~/lib/constan";
import type {
	IBaseResponse,
	IBaseResponseList,
} from "~/types/base-response.type";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: BASE_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(TOKEN_KEY);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response: AxiosResponse<IBaseResponse<unknown>>) => {
		return response;
	},
	(error) => {
		// Handle common errors here (e.g., 401 unauthorized)
		if (error.response?.status === 401) {
			// Handle logout or token refresh
			localStorage.removeItem(TOKEN_KEY);
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

export const api = {
	get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
		axiosInstance.get<IBaseResponse<T>>(url, config),

	getList: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
		axiosInstance.get<IBaseResponseList<T>>(url, config),

	post: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => axiosInstance.post<IBaseResponse<T>>(url, data, config),

	put: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => axiosInstance.put<IBaseResponse<T>>(url, data, config),

	patch: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => axiosInstance.patch<IBaseResponse<T>>(url, data, config),

	delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
		axiosInstance.delete<IBaseResponse<T>>(url, config),
};

export default axiosInstance;
