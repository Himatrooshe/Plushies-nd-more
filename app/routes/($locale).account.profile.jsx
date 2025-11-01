import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Profile'}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  // Check authentication status - this will redirect to login if not authenticated
  context.customerAccount.handleAuthStatus();

  return {};
}

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  const {customerAccount} = context;

  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
    // Check if user is logged in
    const isLoggedIn = await customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return data(
        {error: 'You must be logged in to update your profile.', customer: null},
        {
          status: 401,
        },
      );
    }

    const customer = {};
    
    // Get form values
    const firstName = form.get('firstName');
    const lastName = form.get('lastName');

    // Validate required fields
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
      return data(
        {error: 'First name must be at least 2 characters.', customer: null},
        {
          status: 400,
        },
      );
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
      return data(
        {error: 'Last name must be at least 2 characters.', customer: null},
        {
          status: 400,
        },
      );
    }

    // Build customer object
    customer.firstName = firstName.trim();
    customer.lastName = lastName.trim();

    // Update customer
    const {data, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
          language: customerAccount.i18n.language,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    // Check for user errors from Shopify
    if (data?.customerUpdate?.userErrors?.length) {
      throw new Error(data.customerUpdate.userErrors[0].message);
    }

    return data({
      error: null,
      customer: data?.customerUpdate?.customer,
    });
  } catch (error) {
    return data(
      {error: error.message || 'An error occurred while updating your profile.', customer: null},
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  const account = useOutletContext();
  const {state} = useNavigation();
  /** @type {ActionReturnData} */
  const action = useActionData();
  const customer = action?.customer ?? account?.customer;
  const isSuccess = action?.customer && !action?.error;
  const isSubmitting = state === 'submitting' || state === 'loading';

  return (
    <div className="account-profile">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-pink-100">
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-pink-100/70 blur-2xl" />
        <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-rose-100/70 blur-xl" />
        <div className="relative p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🐻</span>
            <h2 className="text-xl md:text-2xl font-semibold text-pink-700">My profile</h2>
          </div>
          <Form method="PUT" className="space-y-6">
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm font-medium text-pink-700 mb-1">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First name"
                  aria-label="First name"
                  defaultValue={customer.firstName ?? ''}
                  minLength={2}
                  required
                  className="rounded-2xl border border-pink-200 bg-pink-50/50 px-4 py-3 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm font-medium text-pink-700 mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last name"
                  aria-label="Last name"
                  defaultValue={customer.lastName ?? ''}
                  minLength={2}
                  required
                  className="rounded-2xl border border-pink-200 bg-pink-50/50 px-4 py-3 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                />
              </div>
            </fieldset>
            {action?.error ? (
              <div className="rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm flex items-center gap-2">
                <span>❌</span>
                <span>{action.error}</span>
              </div>
            ) : isSuccess ? (
              <div className="rounded-2xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm flex items-center gap-2">
                <span>✅</span>
                <span>Profile updated successfully! 🎉</span>
              </div>
            ) : null}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 text-white px-6 py-3 font-medium shadow hover:bg-pink-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <span>{isSubmitting ? 'Saving...' : 'Save changes'}</span>
                <span className="text-lg">{isSubmitting ? '⏳' : '💖'}</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

/**
 * @typedef {{
 *   error: string | null;
 *   customer: CustomerFragment | null;
 * }} ActionResponse
 */

/** @typedef {import('customer-accountapi.generated').CustomerFragment} CustomerFragment */
/** @typedef {import('@shopify/hydrogen/customer-account-api-types').CustomerUpdateInput} CustomerUpdateInput */
/** @typedef {import('./+types/account.profile').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
