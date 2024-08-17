"use client";

import { useState } from "react";

const languages = [
  "Python",
  "C",
  "JavaScript",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "Rust",
];

export function CodeSubmission() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleClearCode = () => {
    setCode("");
  };

  const handleSubmit = () => {
    // 여기에 코드 제출 로직을 추가합니다.
    console.log("Code submitted:", code);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Code Submission</h1>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Selected Language: {selectedLanguage}</h2>
        <textarea
          className="w-full h-64 p-2 border border-gray-300 rounded"
          placeholder={`Write your ${selectedLanguage} code here...`}
          value={code}
          onChange={handleCodeChange}
        />
        <div className="flex space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleClearCode}
          >
            Clear Code
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
