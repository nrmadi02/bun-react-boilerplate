import RegisterSection from "~/features/auth/ui/section/register.section";

export function meta() {
	return [
		{ title: "Register" },
		{
			property: "og:title",
			content: "Register",
		},
		{
			name: "description",
			content:
				"Daftar akun baru untuk mengakses fitur-fitur aplikasi dengan aman",
		},
	];
}

export default function RegisterPage() {
	return <RegisterSection />;
}
