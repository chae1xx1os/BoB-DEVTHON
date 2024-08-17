import { CodeSubmission } from "@/components/CodeSubmission";

export default function CodeReviewPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit Your Code for Review</h1>
      <CodeSubmission />
    </div>
  );
}
