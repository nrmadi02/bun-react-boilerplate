import { useGetIdentity } from "@refinedev/core";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { PageLoading } from "~/components/ui/page-loading";
import type { IUser } from "~/features/dashboard/users/types/users.type";
import { PATHS } from "~/paths";

export default function EmailProtectedLayout(props: { children: ReactNode }) {
	const { data, isLoading } = useGetIdentity<IUser>();

	if (isLoading) return <PageLoading />;

	if (!data?.emailVerified) {
		return <Navigate to={PATHS.dashboard.verify} replace />;
	}

	return props.children;
}
