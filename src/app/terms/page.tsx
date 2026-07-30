import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using the Home of Korean Beauty website and services.",
};

export default function TermsAndConditions() {
  return (
    <main className="bg-hok-linen min-h-screen py-16 md:py-24">
      <div className="container-narrow max-w-4xl bg-white border border-hok-mist rounded-md p-8 md:p-12 lg:p-16">
        <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-hok max-w-none font-manrope text-hok-stone leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using the Home of Korean Beauty website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
          
          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Home of Korean Beauty's website for personal, non-commercial transitory viewing only.
          </p>
          
          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">3. Products and Pricing</h2>
          <p>
            All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
          </p>

          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">4. Accuracy of Billing and Account Information</h2>
          <p>
            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.
          </p>

          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">5. Disclaimer</h2>
          <p>
            The materials on Home of Korean Beauty's website are provided on an 'as is' basis. Home of Korean Beauty makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          
          <p className="mt-8">
            <strong>Note on Skincare:</strong> Results may vary from person to person. We recommend patch-testing all new skincare products before full application. We are not liable for any allergic reactions or breakouts resulting from product use.
          </p>
        </div>
      </div>
    </main>
  );
}
