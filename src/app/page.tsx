"use client";

import { useState } from 'react';
import { Component } from '@/components/component'; // 상단 헤더가 포함되어 있다면 수정이 필요
import { LoginComponent } from '@/components/login-component';
import { RegisterComponent } from '@/components/register-component'; // RegisterComponent 임포트
import Link from 'next/link';
import { MountainIcon } from "@/components/icons/mountain-icon";

export default function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
    if (isRegisterOpen) setRegisterOpen(false); // 회원가입 모달이 열려 있으면 닫기
  };

  const toggleRegister = () => {
    setRegisterOpen(!isRegisterOpen);
    if (isLoginOpen) setLoginOpen(false); // 로그인 모달이 열려 있으면 닫기
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="bg-background border-b flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" passHref>
            <MountainIcon className="w-8 h-8 cursor-pointer" />
          </Link>
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
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={toggleLogin}
          >
            로그인
          </button>
          <button
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={toggleRegister}
          >
            회원가입
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <Component />
      </main>

      {/* 추가된 섹션 */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">We are ready for your contribution.</h2>
        <p className="text-lg text-gray-600 mb-6">Join us in shaping the future. Your input is invaluable!</p>
        <Link href="#" className="text-blue-500 hover:underline">Learn More</Link>
      </section>

      <footer className="bg-background border-t py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; 2024 해와달. All rights reserved.
        </p>
      </footer>

      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <LoginComponent />
            <button
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
              onClick={toggleLogin}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <RegisterComponent />
            <button
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
              onClick={toggleRegister}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
