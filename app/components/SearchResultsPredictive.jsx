import {ProductItem} from './ProductItem';

export function SearchResultsPredictive({results, query}) {
  if (!results || !results.length) {
    return (
      <div className="search-results-predictive-empty">
        <p>No results found for "{query}"</p>
      </div>
    );
  }

  return (
    <div className="search-results-predictive">
      <div className="grid grid-cols-1 gap-2">
        {results.slice(0, 5).map((product) => (
          <div key={product.id} className="p-2 hover:bg-gray-50 rounded">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
