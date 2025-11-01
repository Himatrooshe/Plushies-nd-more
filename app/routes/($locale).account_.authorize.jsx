/**
 * @param {Route.LoaderArgs}
 */
export async function loader({request, context}) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('return_to') || '/account/profile';
  
  // Hydrogen will automatically use PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID and
  // PUBLIC_CUSTOMER_ACCOUNT_API_URL from your .env file
  // This route handles the OAuth callback from Shopify
  return context.customerAccount.authorize({
    returnTo: returnTo,
  });
}

/** @typedef {import('./+types/account_.authorize').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
