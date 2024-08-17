"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from 'react';
import { Component } from '@/components/component';
import { LoginComponent } from '@/components/login-component';

export default function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => setLoginOpen(!isLoginOpen);

  return (
    <div className="relative">
      <Component />
      <button
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded"
        onClick={toggleLogin}
      >
        로그인
      </button>
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <LoginComponent />
          <button
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
            onClick={toggleLogin}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
