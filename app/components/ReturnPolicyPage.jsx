import heroBg from '~/assets/hero-bg.svg?url';

export default function ReturnPolicyPage() {
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
            Return Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            At Plushies And More, We Strive To Ensure Your Satisfaction With Every Purchase.
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
            Plushies & More operates under a dropshipping model, where products are fulfilled and
            shipped directly by our suppliers. This means our return policy is closely tied to our
            suppliers' return policies. This page outlines what you can expect regarding returns,
            refunds, and exchanges.
          </p>
        </section>

        {/* General Return Conditions Section */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            General Return Conditions:
          </h2>
          <ul className="space-y-4 list-none">
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Eligibility Window:</span> Returns are generally accepted within 15-30 days of delivery. The exact timeframe may vary depending on the specific product and supplier policy.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Product Condition:</span> Items must be returned in their original condition, unused, unwashed, with all tags attached, and in their original packaging. We reserve the right to refuse a return if the product does not meet these criteria.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Proof of Purchase:</span> A valid order number or proof of purchase is required for all returns.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Non-Returnable Items:</span> Certain items, such as personalized items, intimate apparel, perishable goods, digital products, and gift cards, may not be eligible for return. This will be clearly stated on the product page.
              </p>
            </li>
          </ul>
        </section>

        {/* Specific Guidelines Section */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Plushies & More-Specific Return Guidelines:
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
            Because Plushies & More acts as a bridge between you and our suppliers, the return process
            works differently than a traditional store. Here's what to expect:
          </p>

          <div className="space-y-6">
            {/* Damaged or Defective Products */}
            <div className=" from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Damaged or Defective Products
              </h3>
              <ul className="space-y-2 list-disc pl-6">
                <li className="text-gray-700">
                  Contact us within 3-7 days of receiving your order with photographic evidence of the damage or defect.
                </li>
                <li className="text-gray-700">
                  Plushies & More will work with the supplier to arrange a replacement or full refund.
                </li>
                <li className="text-gray-700">
                  If the item is damaged beyond repair, you may not be required to return the damaged item.
                </li>
              </ul>
            </div>

            {/* Wrong Item Received */}
            <div className=" from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Wrong Item Received
              </h3>
              <ul className="space-y-2 list-disc pl-6">
                <li className="text-gray-700">
                  Contact us within 3-7 days of receiving your order with photographic evidence showing the wrong item.
                </li>
                <li className="text-gray-700">
                  We will work with the supplier to send you the correct item or arrange a full refund.
                </li>
                <li className="text-gray-700">
                  Whether you need to return the incorrect item depends on the supplier's policy.
                </li>
              </ul>
            </div>

            {/* Buyer's Remorse */}
            <div className=" from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Buyer's Remorse/Unwanted Item
              </h3>
              <ul className="space-y-2 list-disc pl-6">
                <li className="text-gray-700">
                  You are responsible for the cost of return shipping.
                </li>
                <li className="text-gray-700">
                  A restocking fee (typically 10-25% of the item's value) may apply, depending on the supplier's policy.
                </li>
                <li className="text-gray-700">
                  Refunds will be issued after we receive and inspect the returned item. Original shipping costs are non-refundable.
                </li>
              </ul>
            </div>

            {/* Lost Packages */}
            <div className=" from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4. Lost Packages
              </h3>
              <ul className="space-y-2 list-disc pl-6">
                <li className="text-gray-700">
                  If your package appears to be lost in transit, please notify us as soon as possible.
                </li>
                <li className="text-gray-700">
                  We will investigate the issue with the shipping carrier.
                </li>
                <li className="text-gray-700">
                  Based on the investigation, we will either arrange for a replacement or issue a full refund.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notes Section */}
        <section className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 bg-[#FFE5E5] py-2 px-4 inline-block">
            Important Notes
          </h2>
          <ul className="space-y-4 list-none mt-4">
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Communication is Key:</span> All returns must be authorized by our customer service team. Unauthorized returns may not be accepted or refunded.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Shipping Costs:</span> Unless the return is due to a damaged, defective, or incorrect item, original shipping fees are non-refundable, and the customer is responsible for return shipping costs.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Supplier Discretion:</span> Final decisions regarding returns and refunds ultimately rest with our suppliers via Plushies & More's policies. We will always advocate on your behalf to ensure a fair resolution.
              </p>
            </li>
          </ul>
        </section>

        {/* Closing Remarks */}
        <section className="mb-12">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            By making a purchase through Plushies & More, you agree to this Return Policy. We appreciate
            your understanding of the complexities involved in dropshipping and our commitment to working
            with suppliers to provide you with the best service possible.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            If you have any questions or concerns about returns, please don't hesitate to contact our
            customer service team. We're here to help!
          </p>
        </section>
      </div>
    </div>
  );
}
