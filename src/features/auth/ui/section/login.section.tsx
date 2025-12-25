import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@refinedev/core";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { PATHS } from "~/paths";
import type { LoginRequest } from "../../types/login-request.type";
import { loginSchema } from "../../types/login-request.type";

export default function LoginSection() {
	const { mutateAsync: login } = useLogin();

	const [isShowPassword, setIsShowPassword] = useState(false);

	const formLogin = useForm<LoginRequest>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
	});

	const handleSubmit = async (data: LoginRequest) => {
		await login(data);
	};

	return (
		<Card className="w-full">
			<CardHeader className="space-y-1">
				<CardTitle className="text-center text-2xl">Masuk</CardTitle>
				<CardDescription className="text-center">
					Masuk ke akun Anda untuk melanjutkan
				</CardDescription>
			</CardHeader>
			<Form {...formLogin}>
				<form onSubmit={formLogin.handleSubmit(handleSubmit)}>
					<CardContent className="space-y-4">
						<FormField
							control={formLogin.control}
							name="email"
							render={() => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											id="email"
											type="email"
											placeholder="nama@example.com"
											{...formLogin.register("email")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={formLogin.control}
							name="password"
							render={() => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												id="password"
												type={isShowPassword ? "text" : "password"}
												placeholder="Masukkan password"
												{...formLogin.register("password")}
											/>
											<button
												type="button"
												onClick={() => setIsShowPassword(!isShowPassword)}
												className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground text-sm hover:text-foreground"
												aria-label={
													isShowPassword
														? "Sembunyikan password"
														: "Tampilkan password"
												}
											>
												{isShowPassword ? (
													<Eye className="h-4 w-4" />
												) : (
													<EyeOff className="h-4 w-4" />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Checkbox id="remember" />
								<Label htmlFor="remember" className="text-sm">
									Ingat saya
								</Label>
							</div>
							<Link
								to="/auth/forgot-password"
								className="text-primary text-sm hover:underline"
							>
								Lupa password?
							</Link>
						</div>
					</CardContent>
					<CardFooter className="mt-4 flex flex-col space-y-4">
						<Button
							type="submit"
							className="w-full"
							disabled={formLogin.formState.isSubmitting}
						>
							{formLogin.formState.isSubmitting ? "Memuat..." : "Masuk"}
						</Button>
						<div className="text-center text-sm">
							Belum punya akun?{" "}
							<Link
								to={PATHS.auth.register}
								className="text-primary hover:underline"
							>
								Daftar sekarang
							</Link>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
