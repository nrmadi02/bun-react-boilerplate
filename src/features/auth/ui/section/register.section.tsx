import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@refinedev/core";
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
import {
	type RegisterRequest,
	registerSchema,
} from "../../types/register-request.type";

export default function RegisterSection() {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

	const { mutateAsync: register } = useRegister();

	const formRegister = useForm<RegisterRequest>({
		mode: "onChange",
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullName: "",
			username: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		},
	});

	const handleSubmit = async (data: RegisterRequest) => {
		await register(data);
	};

	return (
		<Card className="w-full">
			<CardHeader className="space-y-1">
				<CardTitle className="text-center text-2xl">Daftar</CardTitle>
				<CardDescription className="text-center">
					Buat akun baru untuk memulai
				</CardDescription>
			</CardHeader>
			<Form {...formRegister}>
				<form onSubmit={formRegister.handleSubmit(handleSubmit)}>
					<CardContent className="space-y-4">
						<FormField
							control={formRegister.control}
							name="fullName"
							render={() => (
								<FormItem>
									<FormLabel>Nama Lengkap</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Nama Lengkap"
											{...formRegister.register("fullName")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formRegister.control}
							name="username"
							render={() => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Username"
											{...formRegister.register("username")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={formRegister.control}
							name="email"
							render={() => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											id="email"
											type="email"
											placeholder="nama@example.com"
											{...formRegister.register("email")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={formRegister.control}
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
												{...formRegister.register("password")}
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
						<FormField
							control={formRegister.control}
							name="passwordConfirmation"
							render={() => (
								<FormItem>
									<FormLabel>Konfirmasi Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												id="passwordConfirmation"
												type={isShowConfirmPassword ? "text" : "password"}
												placeholder="Masukkan ulang password"
												{...formRegister.register("passwordConfirmation")}
											/>
											<button
												type="button"
												onClick={() =>
													setIsShowConfirmPassword(!isShowConfirmPassword)
												}
												className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground text-sm hover:text-foreground"
												aria-label={
													isShowConfirmPassword
														? "Sembunyikan password"
														: "Tampilkan password"
												}
											>
												{isShowConfirmPassword ? (
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
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" required />
							<Label htmlFor="terms" className="text-sm">
								Saya setuju dengan{" "}
								<Link to="/terms" className="text-primary hover:underline">
									syarat dan ketentuan
								</Link>
							</Label>
						</div>
					</CardContent>
					<CardFooter className="mt-4 flex flex-col space-y-4">
						<Button
							type="submit"
							className="w-full"
							disabled={formRegister.formState.isSubmitting}
						>
							{formRegister.formState.isSubmitting ? "Memuat..." : "Daftar"}
						</Button>
						<div className="text-center text-sm">
							Sudah punya akun?{" "}
							<Link
								to={PATHS.auth.login}
								className="text-primary hover:underline"
							>
								Masuk di sini
							</Link>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
