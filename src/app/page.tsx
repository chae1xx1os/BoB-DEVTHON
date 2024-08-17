"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from 'react';
import { Component } from '@/components/component';
import { LoginComponent } from '@/components/login-component';
import Link from 'next/link';  // Link 컴포넌트 추가

export default function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => setLoginOpen(!isLoginOpen);

  return (
    <div className="relative">
      {/* 상단 Task Board와 Code Review 링크 추가 */}
      <header className="bg-background border-b flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="text-2xl font-semibold">Task Board</span>
          </Link>
          <Link href="/code-review" className="text-lg text-muted-foreground hover:text-foreground" prefetch={false}>
            Code Review
          </Link>
        </div>
        {/* 기존 로그인 버튼 유지 */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={toggleLogin}
          >
            로그인
          </button>
        </div>
      </header>

      {/* 기존 컴포넌트 렌더링 */}
      <Component />

      {/* 로그인 모달 */}
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
