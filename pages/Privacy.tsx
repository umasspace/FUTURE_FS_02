
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-playful font-bold mb-12">Privacy Policy</h1>
        
        <div className="prose prose-pink prose-lg max-w-none space-y-10 text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Information We Collect</h2>
            <p>At Wafflewala, we value your privacy. We do not collect personal data on this website as there is no account creation, login, or cart functionality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Cookies</h2>
            <p>We may use cookies for basic site analytics (like Google Analytics) to improve user experience. These cookies do not store personally identifiable information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Third-Party Services</h2>
            <p>We use Google Maps API to provide location services. By using our location section, you are also bound by Google’s Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Social Media</h2>
            <p>Our website links to social media platforms. Interactions on those platforms are governed by the respective platform's privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
            <p>If you have any questions about this privacy policy, you can contact us at hello@wafflewala.in.</p>
          </section>

          <section className="pt-8 border-t border-gray-100">
            <p className="text-sm">Last Updated: October 2024</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
