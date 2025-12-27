import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const buildQueryString = (query: string | object) => {
	let queryString: string;

	if (typeof query === "string") {
		queryString = query;
	} else {
		const buildQueryString = new URLSearchParams();

		for (const [key, value] of Object.entries(query)) {
			if (value) {
				buildQueryString.append(key, value);
			}
		}

		queryString = buildQueryString.toString();
	}

	return queryString ? `?${queryString}` : "";
};
