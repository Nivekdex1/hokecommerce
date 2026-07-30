import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-8xl md:text-9xl text-[#1E120A] font-playfair font-bold mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl text-[#1E120A] font-playfair mb-6">Page Not Found</h2>
      <p className="text-lg text-[#6B6B6B] mb-10 max-w-md mx-auto">
        We couldn't find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place.
      </p>
      <div className="flex gap-4">
        <Button asChild className="bg-[#5C3D2E] hover:bg-[#1E120A] text-white rounded-none px-8 py-6 text-lg">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-[#5C3D2E] text-[#5C3D2E] hover:bg-[#FAF6EE] rounded-none px-8 py-6 text-lg">
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
}
