import heroBg from '~/assets/hero-bg.svg?url';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Pink Banner */}
      <div className="relative bg-[#FFE5E5] pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-48 md:pb-24 overflow-hidden">
        {/* Background with SVG */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
          <img
            src={heroBg}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90">
            Privacy Policy for Plushies Paradise
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-12 sm:pt-16 md:pt-20">
        {/* Effective Date */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Effective Date: October 15, 2025
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            This Privacy Policy describes how Plushies Paradise collects, uses, and discloses your
            personal information when you visit or make a purchase from our online store.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            We collect information from you when you:
          </p>
          <ul className="space-y-2 ml-6 list-disc mb-6">
            <li className="text-base sm:text-lg text-gray-700">
              Make a purchase or attempt to make a purchase through the Site, at which point we
              collect certain information from you, including your name, billing address, shipping
              address, payment information (including credit card numbers), email address, and
              phone number.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Create an account with us.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Sign up for our newsletter or email list.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Contact us or provide us with feedback.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Browse our Site. Certain information is automatically collected about your visit to the
              Site, such as your browser type, operating system, IP address, the time you access the
              Site, and the page from which you came. This information is collectively called "Device
              Information."
            </li>
          </ul>
          <p className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            Device Information Collection Methods:
          </p>
          <ul className="space-y-2 ml-6 list-disc">
            <li className="text-base sm:text-lg text-gray-700">
              Cookies — data files placed on your device, often including an anonymous unique
              identifier. For more information about cookies and how to disable cookies, visit{' '}
              <a href="http://www.allaboutcookies.org" className="text-[#c0424e] underline">
                http://www.allaboutcookies.org
              </a>
              .
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Log files — track actions on the Site, collect data including your IP address,
              browser type, Internet service provider, referring/exit pages, and date/time stamps.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Web beacons, tags, and pixels — electronic files used to record information on how you
              browse the Site.
            </li>
          </ul>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="space-y-2 ml-6 list-disc">
            <li className="text-base sm:text-lg text-gray-700">
              Fulfill your orders and process your transactions.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Communicate with you about your orders, products, services, and promotional offers.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Personalize your experience on our Site and to deliver content and product offerings
              relevant to your interests.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Improve our Site, products, and services.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Prevent fraudulent transactions, monitor against theft, and protect against criminal
              activity.
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Comply with legal obligations or to protect our legal rights.
            </li>
          </ul>
        </section>

        {/* Section 3: Sharing Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            3. Sharing Your Personal Information
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            We share your Personal Information with third parties to help us use your Personal
            Information, as described above. For example:
          </p>
          <ul className="space-y-2 ml-6 list-disc">
            <li className="text-base sm:text-lg text-gray-700">
              We use Shopify to power our online store. You can read more about how Shopify uses your
              Personal Information here:{' '}
              <a href="https://www.shopify.com/legal/privacy" className="text-[#c0424e] underline">
                https://www.shopify.com/legal/privacy
              </a>
              .
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              We also use Google Analytics to help us understand how our customers use the Site. You
              can read more about how Google uses your Personal Information here:{' '}
              <a href="https://www.google.com/intl/en/policies/privacy/" className="text-[#c0424e] underline">
                https://www.google.com/intl/en/policies/privacy/
              </a>
              . You can also opt-out of Google Analytics here:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#c0424e] underline">
                https://tools.google.com/dlpage/gaoptout
              </a>
              .
            </li>
            <li className="text-base sm:text-lg text-gray-700">
              Finally, we may also share your Personal Information to comply with applicable laws and
              regulations, to respond to a subpoena, search warrant, or other lawful request for
              information we receive, or to otherwise protect our rights.
            </li>
          </ul>
        </section>

        {/* Section 4: Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            4. Your Rights
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            If you are a European resident, you have the right to access personal information we hold
            about you and to ask that your personal information be corrected, updated, or deleted. If
            you would like to exercise this right, please contact us through the contact information
            below.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Additionally, if you are a European resident we note that we are processing your
            information in order to fulfill contracts we might have with you (for example if you make
            an order through the Site), or otherwise to pursue our legitimate business interests
            listed above. Additionally, please note that your information will be transferred outside
            of Europe, including to Canada and the United States.
          </p>
        </section>

        {/* Section 5: Data Retention */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            5. Data Retention
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            When you place an order through the Site, we will maintain your Order Information for our
            records unless and until you ask us to delete this information. However, we may be
            required to retain certain information for legal and regulatory purposes.
          </p>
        </section>

        {/* Section 6: Changes */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            6. Changes to This Privacy Policy
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            We may update this privacy policy from time to time in order to reflect, for example,
            changes to our practices or for other operational, legal, or regulatory reasons.
          </p>
        </section>

        {/* Section 7: Contact */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            7. Contact Us
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            For more information about our privacy practices, if you have questions, or if you would
            like to make a complaint, please contact us by e-mail at [Insert email address] or by mail
            using the details provided below: [Insert physical address, if applicable]
          </p>
        </section>
      </div>
    </div>
  );
}
