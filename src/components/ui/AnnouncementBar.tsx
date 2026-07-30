import React from "react";
import Link from "next/link";

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-hok-walnut text-white text-xs md:text-sm py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-center font-medium tracking-wide">
          <span className="hidden sm:inline">✨ Discover your perfect glow!</span> Free delivery on orders over ₦50,000.{" "}
          <Link href="/shop" className="underline underline-offset-2 hover:text-hok-champagne transition-colors ml-1 font-semibold">
            Shop Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
