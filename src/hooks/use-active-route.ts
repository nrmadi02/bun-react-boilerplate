import { useLocation } from "react-router";

export function useActiveRoute() {
	const location = useLocation();

	const isActive = (path: string) => {
		if (path === "/dashboard" && location.pathname === "/dashboard") {
			return true;
		}
		return location.pathname.startsWith(path);
	};

	return { isActive, pathname: location.pathname };
}
