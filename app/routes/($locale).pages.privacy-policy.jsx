import PrivacyPolicyPage from '~/components/PrivacyPolicyPage';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Privacy Policy | Plushies & More'}];
};

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicyPage />;
}
