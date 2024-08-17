"use client";

import { useState } from "react";

const languages = [
  "Python",
  "JavaScript",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
];

export function CodeSubmission() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <div className="space-y-6"> {/* 요소 간 여백 추가 */}
      <h1 className="text-2xl font-bold mb-4">Code Submission</h1>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <div className="space-y-4"> {/* 요소 간 여백 추가 */}
        <h2 className="text-xl font-semibold mb-2">Selected Language: {selectedLanguage}</h2>
        <textarea
          className="w-full h-64 p-2 border border-gray-300 rounded"
          placeholder={`Write your ${selectedLanguage} code here...`}
        />
      </div>
    </div>
  );
}
