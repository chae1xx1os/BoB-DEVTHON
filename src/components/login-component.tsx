import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 대신 useRouter를 사용
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LoginComponent(
  { onRegister, onUpdateValue }: {
    onRegister: () => void, onUpdateValue: () => void

  }) {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: userid,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful', data);
      onUpdateValue();

      // 토큰 저장
      localStorage.setItem('token', data.access_token);
      setError('');

      // 로그인 성공 후 페이지 이동
      // router.push('/'); // 로그인 후 이동할 페이지를 지정합니다. 예: '/dashboard'

    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
      <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
      <p className="text-muted-foreground mb-4">Enter your credentials to access your account.</p>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Label htmlFor="userid">User ID</Label>
          <Input id="userid" type="text" placeholder="Your user ID" value={userid} onChange={(e) => setUserid(e.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4 text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button onClick={onRegister} className="font-medium text-primary hover:underline">
          Register
        </button>
      </p>
    </div>
  );
}
