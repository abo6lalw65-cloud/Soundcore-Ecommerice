from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# Define the User table model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="customer")
    store_name = Column(String, nullable=True)

    # Establish a One-to-Many relationship with the Product model
    products = relationship("Product", back_populates="owner")

# Define the Product table model
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    image = Column(String, nullable=True)
    
    # Foreign key linking the product to a specific seller (user)
    seller_id = Column(Integer, ForeignKey("users.id"))

    # Establish the reverse relationship to access the seller's details
    owner = relationship("User", back_populates="products")