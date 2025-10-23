import {useState} from 'react';
import {Link} from 'react-router';

export function PaginatedResourceSection({
  connection,
  children,
  className = '',
  resourcesClassName = '',
  ...props
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Default items per page

  if (!connection?.nodes) {
    return (
      <div className={`paginated-resource-section ${className}`}>
        <div className="text-center py-8">
          <p className="text-gray-500">No items found</p>
        </div>
      </div>
    );
  }

  const totalItems = connection.nodes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = connection.nodes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`paginated-resource-section ${className}`} {...props}>
      {/* Resources Grid */}
      <div className={`resources-grid ${resourcesClassName}`}>
        {currentItems.map((node, index) => 
          children({ node, index: startIndex + index })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls mt-8 flex justify-center items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current page
              const shouldShow = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (!shouldShow) {
                // Show ellipsis for gaps
                if (page === 2 && currentPage > 4) {
                  return <span key={`ellipsis-${page}`} className="px-2 py-2 text-gray-400">...</span>;
                }
                if (page === totalPages - 1 && currentPage < totalPages - 3) {
                  return <span key={`ellipsis-${page}`} className="px-2 py-2 text-gray-400">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    page === currentPage
                      ? 'bg-[#ff7380] text-white border-[#ff7380]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
      </div>
    </div>
  );
}
