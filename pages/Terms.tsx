
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-playful font-bold mb-12">Terms & Conditions</h1>
        
        <div className="prose prose-pink prose-lg max-w-none space-y-10 text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. General</h2>
            <p>Welcome to Wafflewala. By visiting our stall or using this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Wafflewala’s relationship with you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. Menu & Pricing</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prices listed on the website and menu boards are subject to change without prior notice.</li>
              <li>Images displayed on the website are for illustration purposes only. The actual product may vary slightly in appearance due to hand-crafted preparation.</li>
              <li>Offers and discounts cannot be combined unless explicitly stated.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Allergens & Health</h2>
            <p>Our food may contain nuts, dairy, gluten, and soy. While we take utmost care, cross-contamination is possible. Please inform our stall staff of any severe allergies before placing an order. Wafflewala is not liable for any allergic reactions that may occur.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Payments</h2>
            <p>We currently accept Cash and UPI payments at our stall. We do not support online payments through this website as it is for informational purposes only.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Limitation of Liability</h2>
            <p>Wafflewala shall not be responsible for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
          </section>

          <section className="pt-8 border-t border-gray-100">
            <p className="text-sm">Last Updated: October 2024</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
