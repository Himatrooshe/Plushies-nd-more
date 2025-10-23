export function CartLineItem({line}) {
  if (!line) return null;

  return (
    <div className="cart-line-item">
      <div className="item-image">
        {line.merchandise?.image && (
          <img 
            src={line.merchandise.image.url} 
            alt={line.merchandise.image.altText || line.merchandise.title}
            className="w-16 h-16 object-cover rounded"
          />
        )}
      </div>
      <div className="item-details">
        <h4 className="font-semibold">{line.merchandise?.title}</h4>
        <p className="text-sm text-gray-600">Quantity: {line.quantity}</p>
        <p className="text-sm text-gray-600">
          {line.cost?.totalAmount?.amount} {line.cost?.totalAmount?.currencyCode}
        </p>
      </div>
    </div>
  );
}
