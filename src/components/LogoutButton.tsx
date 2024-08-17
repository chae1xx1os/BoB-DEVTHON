import React from 'react';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // 로그인 페이지로 리디렉션
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
