import React, { useState } from 'react';
import SellerDashboard from './SellerDashboard';

// Mock Data for the storefront using local images path structure (/images/...)
const products = [
  { id: 1, name: 'Soundcore C30i', price: 49.99, category: 'Earbuds', seller: 'Tech Store', image: '/images/c30i.png' },
  { id: 2, name: 'Soundcore Q40i', price: 99.99, category: 'Headphones', seller: 'Audio Hub', image: '/images/q40i.png' },
  { id: 3, name: 'Soundcore P30i', price: 59.99, category: 'Earbuds', seller: 'Tech Store', image: '/images/p30i.png' }
];

const brandColor = '#00b0ff';

function App() {
  const [cart, setCart] = useState([]);
  // currentView tracks whether to show 'products', 'cart', or 'seller'
  const [currentView, setCurrentView] = useState('products');

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/images/logo.png" alt="Soundcore Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
          <h2 style={{ margin: 0, color: brandColor }}>Soundcore Store</h2>
        </div>
        <div>
          <button 
            onClick={() => setCurrentView('products')} 
            style={{ marginRight: '10px', padding: '8px 15px', cursor: 'pointer', backgroundColor: currentView === 'products' ? brandColor : '#f8f9fa', color: currentView === 'products' ? 'white' : 'black', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            Products
          </button>
          <button 
            onClick={() => setCurrentView('cart')} 
            style={{ marginRight: '10px', padding: '8px 15px', cursor: 'pointer', backgroundColor: currentView === 'cart' ? brandColor : '#f8f9fa', color: currentView === 'cart' ? 'white' : 'black', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            Cart ({totalItemsCount})
          </button>
          <button 
            onClick={() => setCurrentView('seller')} 
            style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: currentView === 'seller' ? brandColor : '#f8f9fa', color: currentView === 'seller' ? 'white' : 'black', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            Seller Dashboard
          </button>
        </div>
      </nav>

      {/* Main Views Rendering */}
      {currentView === 'products' && (
        <div>
          <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1>Browse Latest Audio Gear</h1>
            <p>Explore multi-vendor sound products</p>
          </header>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {products.map((product) => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', width: '220px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'contain', borderRadius: '5px', marginBottom: '10px' }} />
                <h3>{product.name}</h3>
                <p style={{ color: 'gray', fontSize: '14px' }}>Seller: {product.seller}</p>
                <p style={{ color: '#555' }}>Category: {product.category}</p>
                <h2 style={{ color: brandColor }}>${product.price}</h2>
                <button 
                  onClick={() => addToCart(product)}
                  style={{ backgroundColor: '#282c34', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'cart' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p style={{ color: 'gray' }}>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '5px' }} />
                  <div style={{ flex: 1, marginLeft: '15px', textAlign: 'left' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                    <p style={{ margin: '0', color: brandColor, fontWeight: 'bold' }}>${item.price} x {item.quantity}</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => addToCart(item)}
                      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
              
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <h3 style={{ color: '#333' }}>Total: <span style={{ color: brandColor }}>${totalPrice.toFixed(2)}</span></h3>
                <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === 'seller' && (
        <SellerDashboard />
      )}

    </div>
  );
}

export default App;