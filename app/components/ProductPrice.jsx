export function ProductPrice({price, compareAtPrice}) {
  if (!price) return null;

  return (
    <div className="product-price">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-900">
          {price.amount} {price.currencyCode}
        </span>
        {compareAtPrice && compareAtPrice.amount && (
          <span className="text-lg text-gray-500 line-through">
            {compareAtPrice.amount} {compareAtPrice.currencyCode}
          </span>
        )}
      </div>
    </div>
  );
}
