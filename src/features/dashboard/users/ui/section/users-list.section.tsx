import { MoreHorizontal, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { useUserList } from "../../hooks/user-service.hook";

const users = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "Active",
		avatar: "https://github.com/shadcn.png",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "User",
		status: "Active",
		avatar: "https://github.com/vercel.png",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "User",
		status: "Inactive",
		avatar: "",
	},
];

export default function UsersListSection() {
	const { queryUserList } = useUserList({
		limit: 10,
		page: 1,
	});

	console.log(queryUserList.data?.data.data);
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="font-bold text-2xl tracking-tight">Users</h2>
					<p className="text-muted-foreground">
						Manage your application users.
					</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add User
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>All Users</CardTitle>
					<CardDescription>
						A list of all users in your application.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{users.map((user) => (
							<div
								key={user.id}
								className="flex items-center justify-between rounded-lg border p-4"
							>
								<div className="flex items-center space-x-4">
									<Avatar>
										<AvatarImage src={user.avatar} />
										<AvatarFallback>
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium text-sm leading-none">
											{user.name}
										</p>
										<p className="text-muted-foreground text-sm">
											{user.email}
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Badge
										variant={user.status === "Active" ? "default" : "secondary"}
									>
										{user.status}
									</Badge>
									<Badge variant="outline">{user.role}</Badge>
									<Button variant="ghost" size="sm">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
