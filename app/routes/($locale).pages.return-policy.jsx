import ReturnPolicyPage from '~/components/ReturnPolicyPage';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Return Policy | Plushies & More'}];
};

export default function ReturnPolicyRoute() {
  return <ReturnPolicyPage />;
}
