import {Link} from 'react-router';

export function CartSummary({cart}) {
  if (!cart) return null;

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>
      <div className="summary-line">
        <span>Subtotal:</span>
        <span>{cart.cost?.subtotalAmount?.amount} {cart.cost?.subtotalAmount?.currencyCode}</span>
      </div>
      <div className="summary-line">
        <span>Tax:</span>
        <span>{cart.cost?.totalTaxAmount?.amount} {cart.cost?.totalTaxAmount?.currencyCode}</span>
      </div>
      <div className="summary-line total">
        <span>Total:</span>
        <span>{cart.cost?.totalAmount?.amount} {cart.cost?.totalAmount?.currencyCode}</span>
      </div>
      <Link to="/checkout" className="btn btn-primary w-full">
        Checkout
      </Link>
    </div>
  );
}
