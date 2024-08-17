import Link from 'next/link';
import { CodeSubmission } from "@/components/CodeSubmission";
import { MountainIcon } from "@/components/icons/mountain-icon";

export default function CodeReviewPage() {
  return (
    <div className="relative">
      <header className="bg-background border-b flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" passHref>
            <MountainIcon className="w-8 h-8 cursor-pointer" />
          </Link>
          <span className="text-2xl font-semibold">Code Review</span>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-6">Submit Your Code for Review</h1>
        <CodeSubmission />
      </div>
    </div>
  );
}
