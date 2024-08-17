// src/components/icons/file-icon.tsx
import React from 'react';

const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h6l7 7v11H3V3z"
    />
  </svg>
);

export { FileIcon };