import React from 'react';

function Cart({ cartItems, onRemoveItem }) {
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p style={{ color: 'gray' }}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <div>
                <h4>{item.name}</h4>
                <p style={{ margin: '5px 0', color: '#555' }}>${item.price}</p>
              </div>
              <button 
                onClick={() => onRemoveItem(item.id)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          ))}
          
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;