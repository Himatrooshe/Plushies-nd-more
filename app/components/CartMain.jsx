import {Link} from 'react-router';

export function CartMain({cart}) {
  if (!cart || !cart.lines?.nodes?.length) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <p>Add some items to your cart to get started.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-main">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.lines.nodes.map((line) => (
          <div key={line.id} className="cart-item">
            <div className="item-image">
              {line.merchandise?.image && (
                <img 
                  src={line.merchandise.image.url} 
                  alt={line.merchandise.image.altText || line.merchandise.title}
                  className="w-20 h-20 object-cover"
                />
              )}
            </div>
            <div className="item-details">
              <h3>{line.merchandise?.title}</h3>
              <p>Quantity: {line.quantity}</p>
              <p>Price: {line.cost?.totalAmount?.amount} {line.cost?.totalAmount?.currencyCode}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <p>Total: {cart.cost?.totalAmount?.amount} {cart.cost?.totalAmount?.currencyCode}</p>
      </div>
    </div>
  );
}
