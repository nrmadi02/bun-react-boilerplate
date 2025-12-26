import { layout, type RouteConfig, route } from "@react-router/dev/routes";
import { PATHS } from "./paths";

export default [
	route(PATHS.root, "routes/home.tsx"),

	layout("routes/auth/auth.layout.tsx", [
		route(PATHS.auth.login, "routes/auth/login.page.tsx"),
		route(PATHS.auth.register, "routes/auth/register.page.tsx"),
	]),
	route(
		PATHS.dashboard.verify,
		"routes/email-verification/email-verification.page.tsx",
	),
	layout("routes/dashboard/dashboard.layout.tsx", [
		route(PATHS.dashboard.home, "routes/dashboard/home/home.page.tsx"),
		route(PATHS.dashboard.users, "routes/dashboard/users/users.page.tsx"),
	]),
] satisfies RouteConfig;
