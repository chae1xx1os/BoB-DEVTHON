import { useState } from "react";

const languages = [
  "Python",
  "JavaScript",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "Rust",
  // 추가하고 싶은 언어들
];

export function CodeSubmission() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [code, setCode] = useState("");

  return (
    <div className="p-6">
      <div className="mb-4">
        <label className="block text-xl font-bold mb-2">Select Language</label>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">-- Select a Language --</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {selectedLanguage && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedLanguage}</h2>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-md"
            placeholder={`Write your ${selectedLanguage} code here...`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
}
