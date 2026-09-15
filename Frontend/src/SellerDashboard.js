import React, { useState } from 'react';

const brandColor = '#00b0ff';

function SellerDashboard({ products, setProducts, currentUser }) {
  // Temporary state for the new product form
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the uploaded file

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle local image file selection from device
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local temporary URL for the selected file
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    
    const productItem = {
      id: Date.now(),
      seller_id: currentUser.id,
      seller_name: currentUser.fullName,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category || 'General',
      stock: parseInt(newProduct.stock) || 1,
      // Use the selected local image or fallback to default logo
      image: selectedImage || '/images/logo.png'
    };

    setProducts([...products, productItem]);
    // Reset form states
    setNewProduct({ name: '', price: '', category: '', stock: '' });
    setSelectedImage(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((item) => item.id !== productId));
  };

  // Filter products to show ONLY the ones uploaded by the logged-in seller
  const myProducts = products.filter(product => product.seller_id === currentUser.id);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: brandColor, textAlign: 'center' }}>My Inventory Management</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3>Add New Product</h3>
        <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required />
          <input type="number" name="price" placeholder="Price ($)" value={newProduct.price} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required />
          <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="number" name="stock" placeholder="Stock Quantity" value={newProduct.stock} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required />
        </div>

        {/* File input for device image selection */}
        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Product Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ padding: '5px', width: '100%', boxSizing: 'border-box' }} 
          />
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div style={{ marginTop: '10px', textAlign: 'left' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>Preview:</span><br />
            <img src={selectedImage} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '5px', border: '1px solid #ddd', marginTop: '5px' }} />
          </div>
        )}

        <button type="submit" style={{ backgroundColor: brandColor, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '15px', width: '100%', fontWeight: 'bold' }}>
          Add Product to Marketplace
        </button>
      </form>

      {/* Seller's Product List */}
      <h3>Your Uploaded Products</h3>
      {myProducts.length === 0 ? (
        <p style={{ color: 'gray' }}>You haven't added any products yet.</p>
      ) : (
        <div>
          {myProducts.map((product) => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '5px', border: '1px solid #eee' }} />
              <div style={{ flex: 1, marginLeft: '15px', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{product.name}</h4>
                <p style={{ margin: '0', color: '#555' }}>Price: <span style={{ color: brandColor, fontWeight: 'bold' }}>${product.price}</span> | Stock: {product.stock}</p>
              </div>
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;