import { BarChart3, FileText, TrendingUp, Users } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export default function HomePage() {
	return (
		<div className="space-y-4">
			<div>
				<h2 className="font-bold text-2xl tracking-tight">Dashboard</h2>
				<p className="text-muted-foreground">
					Here's an overview of your application.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Total Revenue</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">$45,231.89</div>
						<p className="text-muted-foreground text-xs">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Active Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">2,350</div>
						<p className="text-muted-foreground text-xs">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Reports</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">12</div>
						<p className="text-muted-foreground text-xs">
							+19% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Analytics</CardTitle>
						<BarChart3 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">89.2%</div>
						<p className="text-muted-foreground text-xs">+5% from last month</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<div className="flex h-[300px] items-center justify-center text-muted-foreground">
							Chart placeholder
						</div>
					</CardContent>
				</Card>

				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>Latest activities from your team.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<div className="h-2 w-2 rounded-full bg-blue-500" />
								<div className="flex-1 space-y-1">
									<p className="font-medium text-sm leading-none">
										New user registered
									</p>
									<p className="text-muted-foreground text-sm">2 minutes ago</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="h-2 w-2 rounded-full bg-green-500" />
								<div className="flex-1 space-y-1">
									<p className="font-medium text-sm leading-none">
										Report generated
									</p>
									<p className="text-muted-foreground text-sm">1 hour ago</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="h-2 w-2 rounded-full bg-yellow-500" />
								<div className="flex-1 space-y-1">
									<p className="font-medium text-sm leading-none">
										System update completed
									</p>
									<p className="text-muted-foreground text-sm">3 hours ago</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
