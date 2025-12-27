import { useGetIdentity, useLogout } from "@refinedev/core";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { SidebarTrigger } from "~/components/ui/sidebar";
import type { IUser } from "~/features/dashboard/users/types/users.type";

export function Header() {
	const navigate = useNavigate();
	const { mutateAsync: logout } = useLogout();
	const { data } = useGetIdentity<IUser>();

	const handleLogout = () => {
		// Handle logout logic here
		// Clear auth token, user data, etc.
		logout();
	};

	return (
		<header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="-ml-1" />
			</div>

			<Popover>
				<PopoverTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>SC</AvatarFallback>
						</Avatar>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-56 p-2" align="end">
					<div className="flex items-center gap-2 p-2">
						<Avatar className="h-8 w-8">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>SC</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<p className="font-medium text-sm">{data?.fullName}</p>
							<p className="text-muted-foreground text-xs">{data?.email}</p>
						</div>
					</div>
					<div className="my-2 h-px bg-border" />
					<div className="grid gap-1">
						<Button
							variant="ghost"
							size="sm"
							className="justify-start gap-2"
							onClick={() => navigate("/dashboard/profile")}
						>
							<User className="h-4 w-4" />
							Profile
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="justify-start gap-2"
							onClick={() => navigate("/dashboard/settings")}
						>
							<Settings className="h-4 w-4" />
							Settings
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="justify-start gap-2 text-destructive hover:text-destructive"
							onClick={handleLogout}
						>
							<LogOut className="h-4 w-4" />
							Logout
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</header>
	);
}
