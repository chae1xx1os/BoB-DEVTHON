import { CodeSubmission } from "@/components/CodeSubmission";

export default function CodeReviewPage() {
  return (
    <div className="container mx-auto p-6 space-y-8"> {/* 상단 여백 추가 */}
      <h1 className="text-3xl font-bold mb-6">Submit Your Code for Review</h1>
      <CodeSubmission />
    </div>
  );
}
