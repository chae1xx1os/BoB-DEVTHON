// src/pages/login.tsx

import { LoginComponent } from "@/components/login-component";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginComponent onRegister={handleRegisterRedirect} />
    </div>
  );
}
