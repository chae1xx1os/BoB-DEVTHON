// src/components/login-component.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LoginComponent({ onRegister }: { onRegister: () => void }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
      <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
      <p className="text-muted-foreground mb-4">Enter your credentials to access your account.</p>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="Your username" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
          onClick={onRegister}
          className="font-medium text-primary hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
}
