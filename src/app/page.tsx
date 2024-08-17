"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from 'react';
import { Component } from '@/components/component'; // 이 컴포넌트에 상단 헤더가 포함되어 있다면 수정이 필요
import { LoginComponent } from '@/components/login-component';
import Link from 'next/link';
import { MountainIcon } from "@/components/icons/mountain-icon";

export default function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => setLoginOpen(!isLoginOpen);

  return (
    <div className="relative">
      {/* 헤더 구성 */}
      <header className="bg-background border-b flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <MountainIcon className="w-8 h-8" />
          <span className="text-2xl font-semibold">해와달</span>

          <Link href="#" className="text-lg text-muted-foreground hover:text-foreground" prefetch={false}>
            Task Board
          </Link>

          <Link href="/code-review" className="text-lg text-muted-foreground hover:text-foreground" prefetch={false}>
            Code Review
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={toggleLogin}
          >
            로그인
          </button>
        </div>
      </header>

      {/* 아래의 Component가 중복된 헤더를 렌더링하는지 확인 필요 */}
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
