import { Authenticated } from "@refinedev/core";
import { Navigate, Outlet } from "react-router";
import AuthContainer from "~/features/auth/ui/auth.container";
import { PATHS } from "~/paths";

export default function AuthLayout() {
	return (
		<Authenticated
			key="authenticated-outer"
			fallback={
				<AuthContainer>
					<Outlet />
				</AuthContainer>
			}
		>
			<Navigate to={PATHS.dashboard.home} replace />
		</Authenticated>
	);
}
