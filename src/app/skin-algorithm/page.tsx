import React from "react";
import SkinQuiz from "../../components/ui/SkinQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skin Algorithm",
  description: "Find your perfect Korean skincare routine tailored to your unique skin type and concerns.",
};

const SkinAlgorithmPage = () => {
  return (
    <main className="bg-hok-linen min-h-screen pb-16 relative">
      <div className="bg-hok-ivory border-b border-hok-mist py-16 md:py-24 text-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-hok-champagne/30 via-white/10 to-transparent blur-3xl rounded-full opacity-60 pointer-events-none" />
        
        <div className="container-narrow relative z-10">
          <span className="font-outfit text-xs font-bold tracking-[0.2em] text-hok-champagne uppercase mb-4 block">Personalized Care</span>
          <h1 className="font-fondamento text-5xl md:text-6xl text-hok-espresso font-normal mb-6">The Skin Algorithm</h1>
          <p className="font-outfit text-hok-stone text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Take our 2-minute personalized skin quiz to get expert Korean skincare recommendations tailored to your unique skin type and concerns.
          </p>
        </div>
      </div>
      
      <div className="container-narrow relative z-20 -mt-10 mb-12">
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(30,18,10,0.05)] overflow-hidden">
          <SkinQuiz />
        </div>
      </div>

    </main>
  );
};

export default SkinAlgorithmPage;
