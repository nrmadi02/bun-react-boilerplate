import { useGetIdentity, useLogout, useNotification } from "@refinedev/core";
import type { AxiosError } from "axios";
import { LogOut, Mail, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useResendEmailVerification } from "~/features/auth/hooks/auth-service.hook";
import type { IUser } from "~/features/dashboard/users/types/users.type";
import { PATHS } from "~/paths";

export function meta() {
	return [
		{ title: "Verifikasi Email" },
		{
			property: "og:title",
			content: "Verifikasi Email",
		},
		{
			name: "description",
			content:
				"Verifikasi email untuk mengakses fitur-fitur aplikasi dengan aman",
		},
	];
}

export default function EmailVerificationPage() {
	const { mutate: logout } = useLogout();
	const { data, isLoading } = useGetIdentity<IUser>({
		queryOptions: {
			refetchInterval: 3000,
			refetchOnWindowFocus: true,
		},
	});
	const navigate = useNavigate();
	const { open } = useNotification();

	const { mutateEmailVerification } = useResendEmailVerification({
		email: data?.email ?? "",
	});

	const handleResend = async () => {
		try {
			await mutateEmailVerification.mutateAsync();
			open?.({
				message: "Email verifikasi berhasil dikirim",
				type: "success",
			});
		} catch (error) {
			const err = error as AxiosError<{ message: string }>;
			open?.({
				message: err.response?.data.message ?? "Terjadi kesalahan",
				type: "error",
			});
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		if (data?.emailVerified) {
			navigate(PATHS.dashboard.home);
		}
	}, [data?.emailVerified]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		if (!data && !isLoading) {
			navigate(PATHS.auth.login);
		}
	}, [data, isLoading]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
				<div className="space-y-4 text-center">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
						<Mail className="h-8 w-8 text-blue-600" />
					</div>
					<h1 className="font-semibold text-2xl text-gray-900">
						Verifikasi Email Anda
					</h1>
					<p className="text-gray-600">
						Kami telah mengirimkan link verifikasi ke alamat email Anda. Silakan
						periksa inbox dan klik link untuk melanjutkan.
					</p>
				</div>

				<div className="space-y-3">
					<Button
						onClick={handleResend}
						disabled={mutateEmailVerification.isPending}
						variant="outline"
						className="w-full"
					>
						{mutateEmailVerification.isPending ? (
							<>
								<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
								Mengirim...
							</>
						) : (
							<>
								<RefreshCw className="mr-2 h-4 w-4" />
								Kirim Ulang Email Verifikasi
							</>
						)}
					</Button>

					<Button
						onClick={() => logout()}
						variant="destructive"
						className="w-full"
					>
						<LogOut className="mr-2 h-4 w-4" />
						Keluar
					</Button>
				</div>

				<p className="text-center text-gray-500 text-xs">
					Tidak menerima email? Periksa folder spam atau minta email verifikasi
					baru.
				</p>
			</div>
		</div>
	);
}
