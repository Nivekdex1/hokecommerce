import React from "react";
import SkinQuiz from "../../components/ui/SkinQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skin Algorithm",
  description: "Find your perfect Korean skincare routine tailored to your unique skin type and concerns.",
};

const SkinAlgorithmPage = () => {
  return (
    <main className="bg-hok-linen min-h-screen pb-16">
      <div className="bg-hok-ivory border-b border-hok-mist py-10 md:py-16 text-center">
        <div className="container-narrow">
          <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold mb-4">The Skin Algorithm</h1>
          <p className="font-manrope text-hok-stone text-lg max-w-2xl mx-auto">
            Take our 2-minute personalized skin quiz to get expert Korean skincare recommendations tailored to your unique skin type and concerns.
          </p>
        </div>
      </div>
      
      <div className="container-narrow py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white border border-hok-mist rounded-md shadow-sm overflow-hidden">
          <SkinQuiz />
        </div>
      </div>

    </main>
  );
};

export default SkinAlgorithmPage;
