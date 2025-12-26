import { Authenticated } from "@refinedev/core";
import { Navigate, Outlet } from "react-router";
import { PageLoading } from "~/components/ui/page-loading";
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
			loading={<PageLoading />}
		>
			<Navigate to={PATHS.dashboard.home} replace />
		</Authenticated>
	);
}
