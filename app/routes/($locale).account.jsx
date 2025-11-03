import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export function shouldRevalidate() {
  return true;
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData({customer: data.customer});
}

export default function AccountLayout() {
  /** @type {LoaderReturnData} */
  const {customer} = useLoaderData();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <div className="account pt-28 md:pt-36 pb-16 md:pb-20">
      <div className="mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[1600px]">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
            {heading}
          </h1>
          <div className="border-b border-gray-200 pb-4">
            <AccountMenu />
          </div>
        </div>
        <div className="mt-8">
          <Outlet context={{customer}} />
        </div>
      </div>
    </div>
  );
}

function AccountMenu() {
  function linkClassName({isActive, isPending}) {
    return [
      'inline-flex items-center px-4 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'text-gray-900 border-b-2 border-gray-900'
        : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent',
      isPending ? 'opacity-70' : '',
    ].join(' ');
  }

  return (
    <nav role="navigation" className="flex flex-wrap items-center gap-4 md:gap-6">
      <NavLink to="/account/orders" className={linkClassName}>
        Orders
      </NavLink>
      <NavLink to="/account/profile" className={linkClassName}>
        Profile
      </NavLink>
      <NavLink to="/account/addresses" className={linkClassName}>
        Addresses
      </NavLink>
      <div className="ml-auto">
        <Logout />
      </div>
    </nav>
  );
}

function Logout() {
  return (
    <Form method="POST" action="/account/logout" className="account-logout">
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
      >
        Sign out
      </button>
    </Form>
  );
}

/** @typedef {import('./+types/account').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
