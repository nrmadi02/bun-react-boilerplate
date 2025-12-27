import {
	BarChart3,
	Calendar,
	FileText,
	Home,
	Settings,
	Users,
} from "lucide-react";
import { Link } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";
import { useActiveRoute } from "~/hooks/use-active-route";
import { PATHS } from "~/paths";

const navigation = [
	{
		title: "Dashboard",
		icon: Home,
		href: PATHS.dashboard.home,
	},
	{
		title: "Users",
		icon: Users,
		href: PATHS.dashboard.users,
	},
	{
		title: "Reports",
		icon: FileText,
		href: "/dashboard/reports",
	},
	{
		title: "Analytics",
		icon: BarChart3,
		href: "/dashboard/analytics",
	},
	{
		title: "Calendar",
		icon: Calendar,
		href: "/dashboard/calendar",
	},
	{
		title: "Settings",
		icon: Settings,
		href: "/dashboard/settings",
	},
];

export function AppSidebar() {
	const { isActive } = useActiveRoute();

	return (
		<Sidebar>
			<SidebarHeader className="border-b">
				<div className="flex items-center gap-2 p-4">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<span className="font-bold text-sm">D</span>
					</div>
					<span className="font-semibold text-lg">Dashboard</span>
				</div>
			</SidebarHeader>
			<SidebarContent className="px-4 py-5">
				<SidebarMenu>
					{navigation.map((item) => (
						<SidebarMenuItem key={item.href}>
							<SidebarMenuButton asChild isActive={isActive(item.href)}>
								<Link to={item.href}>
									<item.icon className="h-4 w-4" />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="border-t">
				<div className="p-4">
					<p className="text-muted-foreground text-xs">Version 1.0.0</p>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
