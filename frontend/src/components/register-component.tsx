import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterComponent(
  { onLogin, onUpdateValue }: {
    onLogin: () => void, onUpdateValue: () => void

  }) {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,  // 백엔드 스키마에 맞게 수정
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful', data);
      onUpdateValue();
      setError('');
      onLogin();  // Registration successful, redirect to login
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to register');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <p className="text-muted-foreground mb-4">Enter your details to create a new account.</p>
      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="space-y-2">
          <Label htmlFor="userId">User ID</Label>
          <Input id="userId" type="text" placeholder="Your user ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <button onClick={onLogin} className="font-medium text-primary hover:underline">
          Login
        </button>
      </p>
    </div>
  );
}
