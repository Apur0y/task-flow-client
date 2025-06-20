"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something Went Wrong
      </h1>
      <p className="text-gray-600 mb-6">
        An error occurred while processing your request. Please try again or
        contact support.
      </p>
      <Link href="/">
        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
