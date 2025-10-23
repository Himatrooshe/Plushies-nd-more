import {ProductItem} from './ProductItem';

export function SearchResults({results, query}) {
  if (!results || !results.length) {
    return (
      <div className="search-results-empty">
        <h2>No results found for "{query}"</h2>
        <p>Try adjusting your search terms or browse our products.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>Search results for "{query}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
