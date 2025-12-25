import LoginSection from "~/features/auth/ui/section/login.section";

export function meta() {
	return [
		{ title: "Login" },
		{
			property: "og:title",
			content: "Login",
		},
		{
			name: "description",
			content:
				"Login ke akun Anda untuk mengakses fitur-fitur aplikasi dengan aman",
		},
	];
}

export default function LoginPage() {
	return <LoginSection />;
}
