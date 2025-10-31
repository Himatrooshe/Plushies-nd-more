import {Link, useNavigate} from 'react-router';
import {useState} from 'react';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

/**
 * @param {{
 *   productOptions: MappedProductOptions[];
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 * }}
 */
export function ProductForm({productOptions, selectedVariant}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((q) => Math.min(99, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options" key={option.name}>
            <h5 className="text-sm font-bold text-[#c0424e] mb-2">{option.name}</h5>
            <div className="product-options-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className={`product-options-item group inline-flex items-center justify-between w-full rounded-xl px-4 py-2.5 border transition-all duration-200 shadow-sm bg-white/90 hover:bg-white ${selected ? 'border-rose-300 ring-2 ring-rose-200' : 'border-rose-100 hover:border-rose-200'} ${available ? 'opacity-100' : 'opacity-30'}`}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                    >
                      <span className="text-[13px] sm:text-sm font-medium text-gray-800">
                        {name}
                      </span>
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`product-options-item group inline-flex items-center justify-between w-full rounded-xl px-4 py-2.5 border transition-all duration-200 shadow-sm bg-white/90 ${selected ? 'border-rose-300 ring-2 ring-rose-200' : 'border-rose-100 hover:border-rose-200 hover:bg-white'} ${exists && !selected ? 'cursor-pointer' : ''} ${available ? 'opacity-100' : 'opacity-30'}`}
                      key={option.name + name}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          void navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <span className="text-[13px] sm:text-sm font-medium text-gray-800">
                        {name}
                      </span>
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
            <br />
          </div>
        );
      })}
      {/* Quantity + Add to Cart */}
      <div className="flex items-stretch gap-4 w-full">
        <div className="inline-flex items-center bg-white/90 border border-rose-200 rounded-full overflow-hidden h-14">
          <button type="button" onClick={decrement} className="px-4 text-[#c0424e] hover:bg-rose-50 disabled:opacity-50 h-full text-xl" disabled={quantity <= 1} aria-label="Decrease quantity">−</button>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => {
              const v = parseInt(e.target.value || '1', 10);
              if (Number.isFinite(v)) setQuantity(Math.min(99, Math.max(1, v)));
            }}
            className="w-16 text-center outline-none bg-transparent text-gray-900 h-full text-lg"
            aria-label="Quantity"
          />
          <button type="button" onClick={increment} className="px-4 text-[#c0424e] hover:bg-rose-50 h-full text-xl" aria-label="Increase quantity">+</button>
        </div>
      <AddToCartButton
        onClick={() => {
          open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {(fetcher) => (
          <button
            type="submit"
            disabled={!selectedVariant?.availableForSale || fetcher.state !== 'idle'}
            className={`flex-1 h-14 px-7 rounded-[14px] font-semibold text-xl transition-colors duration-200 flex items-center justify-center gap-3 ${
              selectedVariant?.availableForSale
                ? 'bg-[#ff7380] hover:bg-[#ff5c6c] text-white shadow-lg border border-rose-200'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } ${
              fetcher.state !== 'idle' ? 'opacity-70 cursor-wait' : ''
            }`}
          >
            {fetcher.state !== 'idle' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding to Cart...
              </>
            ) : selectedVariant?.availableForSale ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16 11V6a2 2 0 00-2-2H6a2 2 0 00-2 2v5H2l2 5h12l2-5h-2zm-8 0V6h4v5H8z" /></svg>
                Add to Cart
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Sold Out
              </>
            )}
          </button>
        )}
      </AddToCartButton>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   swatch?: Maybe<ProductOptionValueSwatch> | undefined;
 *   name: string;
 * }}
 */
function ProductOptionSwatch({swatch, name}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch ml-3 inline-flex items-center justify-center w-7 h-7 rounded-full border border-rose-200 overflow-hidden shadow-sm"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} className="w-full h-full object-cover" />}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').MappedProductOptions} MappedProductOptions */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Maybe} Maybe */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').ProductOptionValueSwatch} ProductOptionValueSwatch */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
