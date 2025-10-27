import ShippingPolicyPage from '~/components/ShippingPolicyPage';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Shipping Policy | Plushies & More'}];
};

export default function ShippingPolicyRoute() {
  return <ShippingPolicyPage />;
}

