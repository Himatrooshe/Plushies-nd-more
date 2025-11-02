import {redirect, useLoaderData} from 'react-router';
import {Money, Image} from '@shopify/hydrogen';
import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Order ${data?.order?.name}`}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({params, context}) {
  const {customerAccount} = context;
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const {data, errors} = await customerAccount.query(CUSTOMER_ORDER_QUERY, {
    variables: {
      orderId,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const {order} = data;

  // Extract line items directly from nodes array
  const lineItems = order.lineItems.nodes;

  // Extract discount applications directly from nodes array
  const discountApplications = order.discountApplications.nodes;

  // Get fulfillment status from first fulfillment node
  const fulfillmentStatus = order.fulfillments.nodes[0]?.status ?? 'N/A';

  // Get first discount value with proper type checking
  const firstDiscount = discountApplications[0]?.value;

  // Type guard for MoneyV2 discount
  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' ? firstDiscount : null;

  // Type guard for percentage discount
  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue'
      ? firstDiscount.percentage
      : null;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

export default function OrderRoute() {
  /** @type {LoaderReturnData} */
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData();
  return (
    <div className="account-order">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        {/* Order Header */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Order {order.name}
          </h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Placed on {new Date(order.processedAt).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</p>
            {order.confirmationNumber && (
              <p>Confirmation: {order.confirmationNumber}</p>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th scope="col" className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Product</th>
                <th scope="col" className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Price</th>
                <th scope="col" className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Quantity</th>
                <th scope="col" className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((lineItem, lineItemIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
              ))}
            </tbody>
            <tfoot className="border-t-2 border-gray-300">
              {((discountValue && discountValue.amount) ||
                discountPercentage) && (
                <tr className="border-b border-gray-100">
                  <th scope="row" colSpan={3} className="text-right py-4 px-4 text-sm font-medium text-gray-700">
                    Discounts
                  </th>
                  <td className="text-right py-4 px-4 text-sm font-medium text-gray-900">
                    {discountPercentage ? (
                      <span>-{discountPercentage}% OFF</span>
                    ) : (
                      discountValue && <Money data={discountValue} />
                    )}
                  </td>
                </tr>
              )}
              <tr className="border-b border-gray-100">
                <th scope="row" colSpan={3} className="text-right py-4 px-4 text-sm font-medium text-gray-700">
                  Subtotal
                </th>
                <td className="text-right py-4 px-4 text-sm font-semibold text-gray-900">
                  <Money data={order.subtotal} />
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <th scope="row" colSpan={3} className="text-right py-4 px-4 text-sm font-medium text-gray-700">
                  Tax
                </th>
                <td className="text-right py-4 px-4 text-sm font-semibold text-gray-900">
                  <Money data={order.totalTax} />
                </td>
              </tr>
              <tr>
                <th scope="row" colSpan={3} className="text-right py-4 px-4 text-base font-semibold text-gray-900">
                  Total
                </th>
                <td className="text-right py-4 px-4 text-base font-semibold text-gray-900">
                  <Money data={order.totalPrice} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Shipping Address and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Shipping Address</h3>
            {order?.shippingAddress ? (
              <address className="not-italic text-sm text-gray-700 space-y-1">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                {order.shippingAddress.formatted && (
                  <p>{order.shippingAddress.formatted}</p>
                )}
                {order.shippingAddress.formattedArea && (
                  <p>{order.shippingAddress.formattedArea}</p>
                )}
              </address>
            ) : (
              <p className="text-sm text-gray-500">No shipping address defined</p>
            )}
          </div>

          {/* Status */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Status</h3>
            <div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700">
                {fulfillmentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* View Order Status Link */}
        <div className="pt-6 border-t border-gray-200">
          <a 
            target="_blank" 
            href={order.statusPageUrl} 
            rel="noreferrer"
            className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            View Order Status →
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{lineItem: OrderLineItemFullFragment}}
 */
function OrderLineRow({lineItem}) {
  // Calculate line total: price * quantity - discount
  const priceAmount = parseFloat(lineItem.price?.amount || '0');
  const discountAmount = parseFloat(lineItem.totalDiscount?.amount || '0');
  const lineTotal = (priceAmount * lineItem.quantity) - discountAmount;
  const lineTotalMoney = {
    amount: String(lineTotal.toFixed(2)),
    currencyCode: lineItem.price?.currencyCode || 'USD',
  };

  return (
    <tr key={lineItem.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          {lineItem?.image && (
            <div className="flex-shrink-0">
              <Image 
                data={lineItem.image} 
                width={80} 
                height={80}
                className="rounded-md object-cover border border-gray-200"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 mb-1">{lineItem.title}</p>
            {lineItem.variantTitle && (
              <small className="text-xs text-gray-500">{lineItem.variantTitle}</small>
            )}
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-right text-sm text-gray-700">
        <Money data={lineItem.price} />
      </td>
      <td className="py-4 px-4 text-center text-sm text-gray-700">
        {lineItem.quantity}
      </td>
      <td className="py-4 px-4 text-right text-sm font-medium text-gray-900">
        <Money data={lineTotalMoney} />
      </td>
    </tr>
  );
}

/** @typedef {import('./+types/account.orders.$id').Route} Route */
/** @typedef {import('customer-accountapi.generated').OrderLineItemFullFragment} OrderLineItemFullFragment */
/** @typedef {import('customer-accountapi.generated').OrderQuery} OrderQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
