import {useState} from 'react';

export function AddToCartButton({variant, quantity = 1, disabled = false}) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!variant || disabled) return;
    
    setIsAdding(true);
    try {
      // TODO: Implement cart functionality with Shopify Hydrogen
      console.log('Adding to cart:', variant.id, quantity);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
        disabled || isAdding
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#ff7380] text-white hover:bg-[#ff5c6c]'
      }`}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
