import {useState} from 'react';
import heroBg from '~/assets/hero-bg.svg?url';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('general');

  const contactInfo = {
    general: [
      {
        icon: '📧',
        title: 'Email',
        content: 'info@plusieandmore.com',
      },
      {
        icon: '📞',
        title: 'Phone',
        content: '+1 (555) 123-4567',
      },
      {
        icon: '📅',
        title: 'Available',
        content: 'Monday - Friday, 9:00 AM - 5:00 PM EST',
      },
      {
        icon: '📍',
        title: 'Mailing Address',
        content: 'Plusie and More / 123 Main Street / Anytown, USA 12345',
      },
    ],
    support: [
      {
        icon: '📧',
        title: 'Email',
        content: 'support@plusieandmore.com',
      },
      {
        icon: '📞',
        title: 'Phone',
        content: '+1 (555) 123-4568',
      },
      {
        icon: '💬',
        title: 'Live Chat',
        content: 'Available 24/7',
      },
    ],
    sales: [
      {
        icon: '📧',
        title: 'Email',
        content: 'sales@plusieandmore.com',
      },
      {
        icon: '📞',
        title: 'Phone',
        content: '+1 (555) 123-4569',
      },
    ],
    media: [
      {
        icon: '📧',
        title: 'Email',
        content: 'media@plusieandmore.com',
      },
      {
        icon: '📞',
        title: 'Phone',
        content: '+1 (555) 123-4570',
      },
    ],
    social: [
      {
        icon: '📘',
        title: 'Facebook',
        content: '@plushiesandmore',
      },
      {
        icon: '📷',
        title: 'Instagram',
        content: '@plushiesandmore',
      },
      {
        icon: '🐦',
        title: 'Twitter',
        content: '@plushiesandmore',
      },
    ],
  };

  const tabNames = {
    general: 'General Inquiries',
    support: 'Customer Support',
    sales: 'Sales Inquiries',
    media: 'Media and Press',
    social: 'Social Media',
  };

  const descriptions = {
    general: 'For General Questions, Feedback, Or Information About Our Products And Services, Please Reach Out To Us Through The Following Channels:',
    support: 'Need help with your order? Our customer support team is here to assist you with any questions or concerns.',
    sales: 'Interested in wholesale or bulk orders? Contact our sales team for special pricing and opportunities.',
    media: 'Press inquiries, collaboration opportunities, or media requests? We\'d love to hear from you.',
    social: 'Follow us on social media for the latest updates, new arrivals, and exclusive offers!',
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Cute Floating Bubbles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-white/20 rounded-full blur-xl animate-float-bubble-1"></div>
        <div className="absolute top-[20%] right-[10%] w-40 h-40 bg-white/15 rounded-full blur-xl animate-float-bubble-2"></div>
        <div className="absolute top-[50%] left-[15%] w-28 h-28 bg-white/25 rounded-full blur-xl animate-float-bubble-3"></div>
        <div className="absolute bottom-[20%] right-[20%] w-36 h-36 bg-white/20 rounded-full blur-xl animate-float-bubble-4"></div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-pink-300 py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Background with SVG */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
          <img
            src={heroBg}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl sm:text-2xl text-white/90">
            We'd Love To Hear From You! 💖
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Contact us Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 text-center mb-8 sm:mb-12">
          Contact us
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {Object.entries(tabNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === key
                  ? 'text-gray-900 shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-pink-50 border-2 border-pink-200'
              }`}
              style={activeTab === key ? {backgroundColor: '#FFBDC2'} : {}}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border-2 border-pink-100">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            {tabNames[activeTab]}
          </h3>
          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            {descriptions[activeTab]}
          </p>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {contactInfo[activeTab].map((info, index) => (
              <div
                key={index}
                className="from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{info.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {info.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
