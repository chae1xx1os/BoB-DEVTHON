// src/components/register-component.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RegisterComponent({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <p className="text-muted-foreground mb-4">Enter your details to create a new account.</p>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="Your username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          onClick={onLogin}
          className="font-medium text-primary hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}