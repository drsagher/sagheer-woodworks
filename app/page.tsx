import LoginForm from "@/app/login/form";
export const revalidate = 10
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100  ">
        <LoginForm />
    </main>
  );
}
