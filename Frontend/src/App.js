import React, { useState } from 'react';
import RoleSelector from './RoleSelector';
import Auth from './Auth';
import SellerDashboard from './SellerDashboard';
import AdminDashboard from './AdminDashboard';
import Checkout from './Checkout';

const brandColor = '#00b0ff';

const initialUsersDB = [
  { id: 1, fullName: 'Admin User', email: 'admin@soundcore.com', password: '123', role: 'admin' },
  { id: 2, fullName: 'Test Seller', email: 'seller@store.com', password: '123', role: 'seller' },
  { id: 3, fullName: 'Test Customer', email: 'customer@mail.com', password: '123', role: 'customer' }
];

const initialSellersDB = [
  { seller_id: 2, store_name: 'Audio Hub', approval_status: 'approved' }
];

const initialProducts = [
  { id: 101, seller_id: 2, seller_name: 'Test Seller', name: 'Soundcore C30i', price: 49.99, category: 'Earbuds', stock: 5, image: '/images/c30i.png' },
  { id: 102, seller_id: 2, seller_name: 'Test Seller', name: 'Soundcore Q40i', price: 99.99, category: 'Headphones', stock: 2, image: '/images/q40i.png' }
];

function App() {
  const [usersDB, setUsersDB] = useState(initialUsersDB);
  const [sellersDB, setSellersDB] = useState(initialSellersDB);
  const [products, setProducts] = useState(initialProducts);
  const [notifications, setNotifications] = useState([]); 

  const [currentUser, setCurrentUser] = useState(null); 
  const [authRole, setAuthRole] = useState(null);       
  const [showAuthModal, setShowAuthModal] = useState(false); 

  const [currentView, setCurrentView] = useState('market'); 
  const [cart, setCart] = useState([]);

  const handleAuthSubmit = (authData) => {
    const { email, password, fullName, role, isLogin } = authData;

    if (isLogin) {
      const user = usersDB.find(u => u.email === email && u.password === password && u.role === role);
      if (user) {
        if (user.role === 'seller') {
          const sellerData = sellersDB.find(s => s.seller_id === user.id);
          if (sellerData && sellerData.approval_status !== 'approved') {
            alert('Your seller account is pending admin approval.');
            return;
          }
        }
        setCurrentUser(user);
        setShowAuthModal(false);
        setCurrentView(user.role === 'seller' ? 'inventory' : 'market');
      } else {
        alert('Invalid credentials or wrong role selected!');
      }
    } else {
      const userExists = usersDB.find(u => u.email === email);
      if (userExists) {
        alert('Email already registered!');
        return;
      }
      const newUser = { id: usersDB.length + 1, fullName: fullName, email: email, password: password, role: role };
      setUsersDB([...usersDB, newUser]);

      if (role === 'seller') {
        setSellersDB([...sellersDB, { seller_id: newUser.id, store_name: `${fullName}'s Store`, approval_status: 'pending' }]);
        alert('Account created! Please wait for admin approval.');
      } else {
        alert('Account created successfully! You can now login.');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setCurrentView('market');
  };

  const handlePaymentSuccess = (address, method, gatewayRef) => {
    let updatedProducts = [...products];
    let newNotifications = [...notifications];

    cart.forEach(cartItem => {
      updatedProducts = updatedProducts.map(prod => {
        if (prod.id === cartItem.id) {
          const newStock = Math.max(0, prod.stock - cartItem.quantity);
          
          newNotifications.push({
            seller_id: prod.seller_id,
            message: `New Order! Customer bought ${cartItem.quantity}x of "${prod.name}". Ref: ${gatewayRef}`,
            address: address,
            time: new Date().toLocaleTimeString()
          });

          return { ...prod, stock: newStock };
        }
        return prod;
      });
    });

    setProducts(updatedProducts);
    setNotifications(newNotifications);

    alert('Payment Succeeded! Order placed and sellers have been notified.');
    setCart([]); 
    setCurrentView('market'); 
  };

  const addToCart = (product) => {
    if (!currentUser || currentUser.role !== 'customer') {
      alert('Please login as a Customer to add items to your cart.');
      setAuthRole('customer');
      setShowAuthModal(true);
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert(`Stock Limit Reached: Only ${product.stock} items of ${product.name} are available.`);
          return prevCart;
        }
        return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      if (product.stock < 1) {
        alert(`Sorry, ${product.name} is completely out of stock.`);
        return prevCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem.quantity > 1) {
        return prevCart.map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (showAuthModal) {
    return (
      <Auth 
        role={authRole || 'customer'} 
        onLogin={handleAuthSubmit} 
        onBack={() => setShowAuthModal(false)} 
      />
    );
  }

  // Admin Dashboard Routing with Full Data Passing
  if (currentUser && currentUser.role === 'admin') {
    return (
      <AdminDashboard 
        usersDB={usersDB} 
        sellersDB={sellersDB} 
        products={products} 
        setSellersDB={setSellersDB} 
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '10px 20px', borderRadius: '5px', marginBottom: '20px' }}>
        <span>
          {currentUser ? `Welcome, ${currentUser.fullName} (${currentUser.role})` : 'Browsing as Guest'}
        </span>
        <div>
          {currentUser ? (
            <button onClick={handleLogout} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setAuthRole('customer'); setShowAuthModal(true); }} style={{ backgroundColor: brandColor, color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Login / Signup</button>
              <button onClick={() => { setAuthRole('seller'); setShowAuthModal(true); }} style={{ backgroundColor: '#282c34', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Seller Login</button>
              <button onClick={() => { setAuthRole('admin'); setShowAuthModal(true); }} style={{ backgroundColor: '#ffc107', color: '#333', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Admin Login</button>
            </div>
          )}
        </div>
      </div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/images/logo.png" alt="Soundcore Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
          <h2 style={{ margin: 0, color: brandColor }}>Soundcore Store</h2>
        </div>
        <div>
          <button onClick={() => setCurrentView('market')} style={navButtonStyle(currentView === 'market')}>
            Marketplace
          </button>
          
          {(!currentUser || currentUser.role === 'customer') && (
            <button onClick={() => setCurrentView('cart')} style={navButtonStyle(currentView === 'cart')}>
              Cart ({totalItemsCount})
            </button>
          )}

          {currentUser && currentUser.role === 'seller' && (
            <button onClick={() => setCurrentView('inventory')} style={navButtonStyle(currentView === 'inventory')}>
              My Inventory & Orders
            </button>
          )}
        </div>
      </nav>

      {currentView === 'inventory' && currentUser && currentUser.role === 'seller' && (
        <SellerDashboard 
          products={products} 
          setProducts={setProducts} 
          currentUser={currentUser} 
          notifications={notifications} 
        />
      )}

      {currentView === 'market' && (
        <div>
          <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1>Browse Latest Audio Gear</h1>
            <p>Explore products from all our trusted vendors</p>
          </header>

          {products.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'gray' }}>No products available in the market right now.</p>
          ) : (
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {products.map((product) => (
                <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', width: '220px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'contain', borderRadius: '5px', marginBottom: '10px' }} />
                  <h3>{product.name}</h3>
                  <p style={{ color: 'gray', fontSize: '14px', margin: '5px 0' }}>Sold by: {product.seller_name}</p>
                  <p style={{ color: '#555', margin: '5px 0' }}>Category: {product.category}</p>
                  <p style={{ color: product.stock > 0 ? '#28a745' : '#ff4d4d', fontSize: '12px', fontWeight: 'bold' }}>
                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                  </p>
                  <h2 style={{ color: brandColor, margin: '10px 0' }}>${product.price}</h2>
                  
                  {(!currentUser || currentUser.role === 'customer') && (
                    <button 
                      onClick={() => addToCart(product)}
                      style={{ backgroundColor: '#282c34', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {currentView === 'cart' && (!currentUser || currentUser.role === 'customer') && (
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
                    <button onClick={() => addToCart(item)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>-</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <h3 style={{ color: '#333' }}>Total: <span style={{ color: brandColor }}>${totalPrice.toFixed(2)}</span></h3>
                <button 
                  onClick={() => setCurrentView('checkout')} 
                  style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === 'checkout' && (!currentUser || currentUser.role === 'customer') && (
        <Checkout 
          cart={cart} 
          totalPrice={totalPrice} 
          onPaymentSuccess={handlePaymentSuccess} 
          onCancel={() => setCurrentView('cart')} 
        />
      )}

    </div>
  );
}

function navButtonStyle(isActive) {
  return {
    marginRight: '10px', 
    padding: '8px 15px', 
    cursor: 'pointer', 
    backgroundColor: isActive ? brandColor : '#f8f9fa', 
    color: isActive ? 'white' : 'black', 
    border: '1px solid #ddd', 
    borderRadius: '5px',
    fontWeight: isActive ? 'bold' : 'normal'
  };
}

export default App;