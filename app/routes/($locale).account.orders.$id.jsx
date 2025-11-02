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

  const lineItems = order.lineItems.nodes;
  const discountApplications = order.discountApplications.nodes;
  const fulfillmentStatus = order.fulfillments.nodes[0]?.status ?? 'N/A';

  const firstDiscount = discountApplications[0]?.value;
  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' ? firstDiscount : null;
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
      <h2>Order {order.name}</h2>
      <p>Placed on {new Date(order.processedAt).toLocaleDateString()}</p>
      {order.confirmationNumber && (
        <p>Confirmation: {order.confirmationNumber}</p>
      )}

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((lineItem, lineItemIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
          ))}
        </tbody>
        <tfoot>
          {((discountValue && discountValue.amount) || discountPercentage) && (
            <tr>
              <th colSpan={3}>Discounts</th>
              <td>
                {discountPercentage ? (
                  <span>-{discountPercentage}% OFF</span>
                ) : (
                  discountValue && <Money data={discountValue} />
                )}
              </td>
            </tr>
          )}
          <tr>
            <th colSpan={3}>Subtotal</th>
            <td>
              <Money data={order.subtotal} />
            </td>
          </tr>
          <tr>
            <th colSpan={3}>Tax</th>
            <td>
              <Money data={order.totalTax} />
            </td>
          </tr>
          <tr>
            <th colSpan={3}>Total</th>
            <td>
              <Money data={order.totalPrice} />
            </td>
          </tr>
        </tfoot>
      </table>

      <div>
        <h3>Shipping Address</h3>
        {order?.shippingAddress ? (
          <address>
            <p>{order.shippingAddress.name}</p>
            {order.shippingAddress.formatted && (
              <p>{order.shippingAddress.formatted}</p>
            )}
            {order.shippingAddress.formattedArea && (
              <p>{order.shippingAddress.formattedArea}</p>
            )}
          </address>
        ) : (
          <p>No shipping address defined</p>
        )}
      </div>

      <div>
        <h3>Status</h3>
        <span>{fulfillmentStatus}</span>
      </div>

      {order.statusPageUrl && (
        <a target="_blank" href={order.statusPageUrl} rel="noreferrer">
          View Order Status
        </a>
      )}
    </div>
  );
}

/**
 * @param {{lineItem: OrderLineItemFullFragment}}
 */
function OrderLineRow({lineItem}) {
  const priceAmount = parseFloat(lineItem.price?.amount || '0');
  const discountAmount = parseFloat(lineItem.totalDiscount?.amount || '0');
  const lineTotal = (priceAmount * lineItem.quantity) - discountAmount;
  const lineTotalMoney = {
    amount: String(lineTotal.toFixed(2)),
    currencyCode: lineItem.price?.currencyCode || 'USD',
  };

  return (
    <tr key={lineItem.id}>
      <td>
        {lineItem?.image && <Image data={lineItem.image} width={80} height={80} />}
        <p>{lineItem.title}</p>
        {lineItem.variantTitle && <small>{lineItem.variantTitle}</small>}
      </td>
      <td>
        <Money data={lineItem.price} />
      </td>
      <td>{lineItem.quantity}</td>
      <td>
        <Money data={lineTotalMoney} />
      </td>
    </tr>
  );
}

/** @typedef {import('./+types/account.orders.$id').Route} Route */
/** @typedef {import('customer-accountapi.generated').OrderLineItemFullFragment} OrderLineItemFullFragment */
/** @typedef {import('customer-accountapi.generated').OrderQuery} OrderQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
