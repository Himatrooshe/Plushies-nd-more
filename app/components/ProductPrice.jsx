import {Money} from '@shopify/hydrogen';

/**
 * @param {{
 *   price?: MoneyV2;
 *   compareAtPrice?: MoneyV2 | null;
 * }}
 */
export function ProductPrice({price, compareAtPrice, className = ''}) {
  return (
    <div className={`product-price font-caveat ${className}`}>
      {compareAtPrice ? (
        <div className="flex items-baseline gap-3">
          {price ? (
            <span className="text-4xl sm:text-5xl font-black text-[#ff7380]">
              <Money data={price} />
            </span>
          ) : null}
          <s className="text-2xl text-gray-400">
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <span className="text-4xl sm:text-5xl font-black text-[#ff7380]">
          <Money data={price} />
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */
