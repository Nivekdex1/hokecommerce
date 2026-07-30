"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h2 className="text-3xl md:text-4xl text-[#1E120A] font-playfair mb-6">Something went wrong</h2>
      <p className="text-lg text-[#6B6B6B] mb-10 max-w-md mx-auto">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <Button
        onClick={() => reset()}
        className="bg-[#5C3D2E] hover:bg-[#1E120A] text-white rounded-none px-8 py-6 text-lg"
      >
        Try again
      </Button>
    </div>
  );
}
