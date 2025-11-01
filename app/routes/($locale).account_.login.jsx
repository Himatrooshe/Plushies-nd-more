import {useLoaderData} from 'react-router';

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({request, context}) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('return_to') || '/account/profile';
  
  // Check if already logged in
  const isLoggedIn = await context.customerAccount.isLoggedIn();
  if (isLoggedIn) {
    return {isLoggedIn: true, returnTo};
  }
  
  // Hydrogen will automatically use PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID and
  // PUBLIC_CUSTOMER_ACCOUNT_API_URL from your .env file
  // The redirect_uri will be constructed as: {origin}/account/authorize
  // This will redirect to Shopify's login page
  return context.customerAccount.login({
    countryCode: context.storefront.i18n.country,
    returnTo: returnTo,
  });
}

export default function Login() {
  const data = useLoaderData();
  
  // If already logged in, show message (shouldn't happen as loader redirects)
  if (data?.isLoggedIn) {
    return (
      <div className="account pt-28 md:pt-36 min-h-screen flex items-center justify-center">
        <p className="text-pink-600">You are already logged in. Redirecting...</p>
      </div>
    );
  }
  
  // This component should rarely render because login() redirects to Shopify
  // But if there's an error or if redirect fails, show login page
  return (
    <div className="account pt-28 md:pt-36 min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-pink-100">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-pink-100/70 blur-2xl" />
          <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-rose-100/70 blur-xl" />
          <div className="relative p-8 md:p-10">
            <div className="text-center mb-6">
              <span className="text-4xl mb-4 block">🐻</span>
              <h1 className="text-2xl md:text-3xl font-bold text-pink-700 mb-2">
                Welcome Back!
              </h1>
              <p className="text-pink-600">
                Sign in to access your account
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600">
                You should be redirected to Shopify's login page automatically.
              </p>
              <p className="text-center text-xs text-rose-600">
                If you see this page, there may be a configuration issue with the redirect URI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account_.login').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
