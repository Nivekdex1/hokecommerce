import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description: "Learn about our returns, refunds, and exchange policies.",
};

export default function ReturnsPolicy() {
  return (
    <main className="bg-hok-linen min-h-screen py-16 md:py-24">
      <div className="container-narrow max-w-4xl bg-white border border-hok-mist rounded-md p-8 md:p-12 lg:p-16">
        <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold mb-8">Returns & Refunds Policy</h1>
        
        <div className="prose prose-hok max-w-none font-manrope text-hok-stone leading-relaxed">
          <p className="lead text-lg font-medium text-hok-espresso mb-8">
            At Home of Korean Beauty, we take pride in the quality and authenticity of our products. Due to the nature of skincare and hygiene concerns, our return policy is strict.
          </p>
          
          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">1. General Returns</h2>
          <p>
            <strong>All sales are final.</strong> We do not accept returns, exchanges, or issue refunds for any products once they have been delivered, except in the case of damaged or defective items.
          </p>
          <p>
            This policy is in place to ensure the integrity, hygiene, and safety of our skincare products for all our customers.
          </p>
          
          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">2. Damaged or Defective Items</h2>
          <p>
            If you receive a product that is damaged during transit or defective, please contact us within <strong>24 hours</strong> of receiving your order.
          </p>
          <p>To process a claim for a damaged item, you must provide:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Your order number</li>
            <li>Clear photographs of the damaged item and packaging</li>
            <li>A description of the issue</li>
          </ul>
          <p>
            Please send this information to <a href="mailto:shop@homeofkoreanbeauty.com" className="text-hok-walnut hover:underline">shop@homeofkoreanbeauty.com</a> or reach out to us via WhatsApp.
          </p>

          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">3. Refunds for Defective Items</h2>
          <p>
            Once your claim is received and inspected, we will notify you of the approval or rejection of your refund or replacement.
          </p>
          <p>
            If approved, we will either replace the damaged item or initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
          </p>

          <h2 className="font-playfair text-2xl text-hok-espresso font-medium mt-10 mb-4">4. Cancellations</h2>
          <p>
            Orders can only be cancelled if they have not yet been processed or dispatched. Once an order is dispatched, it cannot be cancelled.
          </p>
        </div>
      </div>
    </main>
  );
}
