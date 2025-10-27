import heroBg from '~/assets/hero-bg.svg?url';

export default function ShippingPolicyPage() {
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
            Shipping Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90">
            Details From Plushies & More USA 🇺🇸
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-12 sm:pt-16 md:pt-20">
        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Overview
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Plushies & More offers various shipping options for products sourced from the USA,
            aiming to provide a balance between speed and cost-effectiveness for dropshippers.
            The specific shipping times and costs can vary significantly based on the product,
            the supplier, the destination country, and the chosen shipping method.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Key Features and Considerations:
          </h2>
          <ul className="space-y-4 list-none">
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Diverse Shipping Methods:</span> Plushies & More integrates with multiple carriers including USPS, FedEx, UPS, DHL, and others, offering standard, expedited, and express options.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Supplier-Dependent Shipping:</span> Shipping details are dictated by individual suppliers and their fulfillment times/partners.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Real-time Shipping Calculations:</span> Plushies & More provides real-time shipping costs and estimated delivery times at checkout.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Tracking Information:</span> Tracking information is typically included for orders shipped via USA suppliers, accessible within the Plushies & More dashboard.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Processing Times:</span> Orders typically take 1-5 business days to process before being handed over to the carrier.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Customs and Duties:</span> For international shipments, customers may be responsible for customs and import fees. Plushies & More's platform may not always account for these additional costs.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Returns and Refunds:</span> Return and refund policies depend on Plushies & More's and the supplier's return policies.
              </p>
            </li>
          </ul>
        </section>

        {/* Shipping Times Section */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            General Estimated Shipping Times (from USA to various destinations, subject to change):
          </h2>
          
          {/* Shipping Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-pink-100">
              <thead>
                <tr className=" from-pink-500 to-purple-500">
                  <th className="px-4 py-3 text-left text-white font-bold">Destination</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Standard Shipping</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Expedited Shipping</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Express Shipping</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-pink-100">
                  <td className="px-4 py-3 font-semibold text-gray-900">Within USA</td>
                  <td className="px-4 py-3 text-gray-700">3-7 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">2-4 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">1-2 Business Days</td>
                </tr>
                <tr className="border-b border-pink-100 bg-pink-50/30">
                  <td className="px-4 py-3 font-semibold text-gray-900">Canada</td>
                  <td className="px-4 py-3 text-gray-700">7-14 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">5-10 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">3-7 Business Days</td>
                </tr>
                <tr className="border-b border-pink-100">
                  <td className="px-4 py-3 font-semibold text-gray-900">Europe</td>
                  <td className="px-4 py-3 text-gray-700">10-20 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">7-15 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">5-10 Business Days</td>
                </tr>
                <tr className="border-b border-pink-100 bg-pink-50/30">
                  <td className="px-4 py-3 font-semibold text-gray-900">Australia/NZ</td>
                  <td className="px-4 py-3 text-gray-700">10-20 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">7-15 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">5-10 Business Days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-900">Rest of World</td>
                  <td className="px-4 py-3 text-gray-700">10-30 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">10-20 Business Days</td>
                  <td className="px-4 py-3 text-gray-700">7-15 Business Days</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Note */}
          <div className="mt-6 bg-[#FFE5E5] rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Note:</span> These are general estimates and actual shipping times can vary greatly. Always refer to the specific shipping information provided by Plushies & More for each product at the time of order.
            </p>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Recommendations for Dropshippers:
          </h2>
          <ul className="space-y-4 list-none">
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Communicate Clearly:</span> Clearly outline your shipping policy, estimated delivery times, potential delays, and customs fee responsibility on your website.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Monitor Tracking:</span> Regularly monitor tracking information provided by Plushies & More and proactively address any issues that arise.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Choose Reliable Suppliers:</span> When selecting products, prioritize suppliers on Plushies & More with a proven track record of timely fulfillment and shipping.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Offer Multiple Options:</span> If possible, offer customers a choice in shipping speeds to cater to different needs and budgets.
              </p>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
