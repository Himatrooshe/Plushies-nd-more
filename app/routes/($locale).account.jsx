import {
  data as remixData,
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export function shouldRevalidate() {
  return true;
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({request, context}) {
  const {customerAccount} = context;
  const url = new URL(request.url);
  
  // Check if user is logged in first
  const isLoggedIn = await customerAccount.isLoggedIn();
  
  if (!isLoggedIn) {
    // Redirect to login with return_to parameter
    const returnTo = url.pathname + url.search;
    return redirect(`/account/login?return_to=${encodeURIComponent(returnTo)}`);
  }
  
  // Query customer details
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
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
    <div className="account pt-28 md:pt-36">
      <div className="relative rounded-3xl bg-pink-50/70 p-6 md:p-10 shadow-sm ring-1 ring-pink-100">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-700 flex items-center gap-3">
          <span>✨</span>
          <span>{heading}</span>
        </h1>
        <div className="mt-4">
          <AccountMenu />
        </div>
      </div>
      <div className="mt-8">
        <Outlet context={{customer}} />
      </div>
    </div>
  );
}

function AccountMenu() {
  function linkClassName({isActive, isPending}) {
    return [
      'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors',
      isActive ? 'bg-pink-500 text-white shadow' : 'bg-white text-pink-700 hover:bg-pink-100',
      isPending ? 'opacity-70' : '',
    ].join(' ');
  }

  return (
    <nav role="navigation" className="flex flex-wrap items-center gap-2 md:gap-3">
      <Link to="/cart" className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors bg-white text-pink-700 hover:bg-pink-100">
        Orders
      </Link>
      <NavLink to="/account/profile" className={linkClassName}>
        Profile
      </NavLink>
      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-rose-600 hover:bg-rose-50 border border-rose-200 shadow-sm transition-colors"
      >
        Sign out
      </button>
    </Form>
  );
}

/** @typedef {import('./+types/account').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
