import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-deep-cobalt mb-6">About Muricka Enterprises</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-deep-cobalt mb-3">Who We Are</h2>
        <p className="text-gray-700 mb-4">
          We are a Sierra Leonean owned business that specializes in premier procurement and supply chain management dedicated to delivering exceptional services tailored to meet the unique needs of businesses across various industries.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-deep-cobalt mb-3">What We Specialize In</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Strategic Sourcing:</strong> Providing high-quality products and services from reputable suppliers worldwide.</li>
          <li><strong>Supply Chain Optimization:</strong> Ensuring cost-effective and timely delivery of goods.</li>
          <li><strong>Vendor Management:</strong> Building and maintaining strong relationships with suppliers to ensure reliability and excellence.</li>
          <li><strong>Customized Procurement:</strong> Tailored strategies to align your organization's goals and objectives.</li>
          <li><strong>Software Development:</strong> With the aid of our partners, we also develop fully functional software tailored to meet business requirements with comprehensive testing and quality assurance.</li>
          <li><strong>Enterprise-Grade CCTV Installation & Maintenance:</strong> High-definition video surveillance systems that provide live and recorded visibility across your entire operation.</li>
          <li><strong>Access Control Systems (RFID, Card and Biometric based):</strong> Secure and intelligent entry management.</li>
          <li><strong>Intrusion Detection & Motion-Based Alert Systems:</strong> Creates a protective shield around your premises after hours.</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-deep-cobalt mb-3">Our Mission</h2>
        <p className="text-gray-700">
          To provide reliable, cost-effective, and sustainable procurement solutions that optimize supply chains, ensure quality, and drive value for our clients. We are committed to ethical sourcing, innovation, and excellence in every transaction.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-deep-cobalt mb-3">Our Values</h2>
        <p className="text-gray-700">
          We provide transparent, efficient, and high-quality procurement solutions, ensuring our clients know exactly what they are receiving. We are committed to integrity, accountability, and delivering value through ethical sourcing and strategic supplier partnerships.
        </p>
        <p className="text-gray-700 italic mt-2">"Our approach to work begins with our attitude towards client's ideas."</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-deep-cobalt mb-3">Experience & Clients</h2>
        <p className="text-gray-700 mb-2">
          With over 20 years of expertise, a highly skilled team, and a commitment to excellence, we pride ourselves on our ability to provide seamless procurement solutions.
        </p>
        <p className="text-gray-700">
          We have successfully supported both Public and Private sector including: Office of the Vice President, Save The Children, Rokel Clearing and Forwarding, Bank of Sierra Leone, and many more.
        </p>
      </div>

      {/* New Contact Information Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-deep-cobalt mb-4">Contact Information</h2>
        <div className="space-y-3 text-gray-700">
          <p className="flex items-start gap-3">
            <span className="font-semibold min-w-[100px]">📍 Address:</span>
            <span>10 Upper Winchester Street, Regent, Freetown, Sierra Leone</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="font-semibold min-w-[100px]">📞 Phone:</span>
            <span>+23288759808/+23278004940</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="font-semibold min-w-[100px]">📧 Email:</span>
            <span>info@murickaenterprises.com</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="font-semibold min-w-[100px]">🕒 Hours:</span>
            <span>Monday – Friday: 9:00 AM – 6:00 PM<br />Saturday: 10:00 AM – 2:00 PM<br />Sunday: Closed</span>
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            For enquiries, please use the <strong>General Enquiry</strong> button on our website, or email us directly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;