// src/app/page.tsx

"use client";

import { useState } from 'react';
import { Component } from '@/components/component';
import { LoginComponent } from '@/components/login-component';
import { RegisterComponent } from '@/components/register-component';
import Link from 'next/link';
import { MountainIcon } from "@/components/icons/mountain-icon";

export default function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
    if (isRegisterOpen) setRegisterOpen(false);
  };

  const toggleRegister = () => {
    setRegisterOpen(!isRegisterOpen);
    if (isLoginOpen) setLoginOpen(false);
  };
  const onLoginSuccess = () => {
    if (isLoginOpen) setLoginOpen(false);
    setIsLogined(true);

  }
  const onRegisterSuccess = () => {
    if (isRegisterOpen) setRegisterOpen(false);

  }

  const logOutBtnClicked = () => {
    // if (!isLogined) {
    //   // 로그인 상태 체크
    //   return;
    // }

    //로그인상태일시
    // 
    console.log('ddddddddddd')
    setIsLogined(false);

  }
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
        {isLogined ? (
      <button
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={logOutBtnClicked}
      >
        로그아웃
      </button>
    ) : (
      <>
      <div className='justify-left gap-[12px]'>

        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={toggleLogin}
        >
          로그인
        </button>
        <button
          className="ml-8 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={toggleRegister}
        >
          회원가입
        </button>
      </div>
      </>
    )}
      </header>

      <main className="flex-grow container mx-auto p-6">
        <Component />
      </main>

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
            <LoginComponent onRegister={toggleRegister} onUpdateValue={onLoginSuccess} />
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
            <RegisterComponent onLogin={toggleLogin} onUpdateValue={onRegisterSuccess} />
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
