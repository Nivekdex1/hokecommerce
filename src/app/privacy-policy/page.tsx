import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Home of Korean Beauty protects and handles your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-hok-linen min-h-screen py-16 md:py-24">
      <div className="container-narrow max-w-4xl bg-white border border-hok-mist rounded-md p-8 md:p-12 lg:p-16">
        <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-hok max-w-none font-manrope text-hok-stone leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">1. Introduction</h2>
          <p>
            Welcome to Home of Korean Beauty ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">2. The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data</strong> includes bank account and payment card details (processed securely by our payment gateways; we do not store full card details).</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          </ul>

          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling an order).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">5. Contact Details</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:shop@homeofkoreanbeauty.com" className="text-hok-walnut hover:underline">shop@homeofkoreanbeauty.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
