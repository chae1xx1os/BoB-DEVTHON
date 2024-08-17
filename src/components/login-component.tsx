import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LoginComponent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
      <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
      <p className="text-muted-foreground mb-4">Enter your credentials to access your account.</p>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
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
        <Link href="#" className="font-medium text-primary hover:underline" prefetch={false}>
          Register
        </Link>
      </p>
    </div>
  );
}
