import type { PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

export default function AuthContainer({ children }: PropsWithChildren) {
	return (
		<div className={cn("flex min-h-screen")}>
			{/* Left side - Form */}
			<div className={cn("flex flex-1 items-center justify-center p-8")}>
				<div className={cn("w-full max-w-md")}>{children}</div>
			</div>

			{/* Right side - Hero */}
			<div className="hidden flex-1 items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 p-8 lg:flex">
				<div className="max-w-lg text-center text-white">
					<h1 className="mb-6 font-bold text-4xl">Selamat Datang</h1>
					<p className="mb-8 text-lg text-slate-300">
						Bergabunglah dengan kami dan nikmati pengalaman terbaik dalam
						mengelola tugas dan proyek Anda.
					</p>
					<div className="flex h-64 w-full items-center justify-center rounded-lg bg-slate-700/50">
						<p className="text-slate-400">Placeholder Image</p>
					</div>
				</div>
			</div>
		</div>
	);
}
