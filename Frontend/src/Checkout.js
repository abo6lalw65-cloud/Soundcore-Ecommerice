import React, { useState } from 'react';

const brandColor = '#00b0ff';

function Checkout({ cart, totalPrice, onPaymentSuccess, onCancel }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    // Simulating API call to a Payment Gateway (Stripe/PayPal)
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate a mock gateway reference ID based on DB specs
      const mockGatewayRef = `TXN-${Math.floor(Math.random() * 1000000)}`;
      
      alert(`Payment Succeeded! \nMethod: ${paymentMethod} \nTransaction ID: ${mockGatewayRef}`);
      
      // Trigger success function in App.js to clear cart and save order
      onPaymentSuccess(shippingAddress, paymentMethod, mockGatewayRef);
    }, 2000); // 2 seconds fake delay
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: brandColor, textAlign: 'center' }}>Secure Checkout</h2>
      
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <h3>Order Summary</h3>
        <p>Total Items: {cart.length}</p>
        <h2 style={{ color: '#28a745' }}>Amount to Pay: ${totalPrice.toFixed(2)}</h2>
      </div>

      <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Shipping Address:</label>
          <textarea 
            required 
            placeholder="Enter your full delivery address..."
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Method:</label>
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          >
            <option value="stripe">Credit Card (Stripe)</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isProcessing}
            style={{ flex: 1, padding: '12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: isProcessing ? 'not-allowed' : 'pointer' }}
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            disabled={isProcessing}
            style={{ flex: 2, padding: '12px', backgroundColor: isProcessing ? '#999' : '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: isProcessing ? 'not-allowed' : 'pointer' }}
          >
            {isProcessing ? 'Processing Payment...' : `Pay $${totalPrice.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;