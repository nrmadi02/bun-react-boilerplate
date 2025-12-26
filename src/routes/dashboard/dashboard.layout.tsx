import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router";
import { Outlet } from "react-router";
import { Header } from "~/components/layout/header";
import { AppSidebar } from "~/components/navigation/app-sidebar";
import { PageLoading } from "~/components/ui/page-loading";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import EmailProtectedLayout from "~/features/auth/components/email-protected.layout";
import { PATHS } from "~/paths";

export default function DashboardLayout() {
	return (
		<Authenticated
			key="authenticated-inner"
			fallback={<CatchAllNavigate to={PATHS.auth.login} />}
			loading={<PageLoading />}
		>
			<EmailProtectedLayout>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<Header />
						<main className="flex-1 space-y-4 p-4 pt-6">
							<Outlet />
						</main>
					</SidebarInset>
				</SidebarProvider>
			</EmailProtectedLayout>
		</Authenticated>
	);
}
