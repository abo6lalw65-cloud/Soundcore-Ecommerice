from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Soundcore Backend API!"}

@app.get("/api/products")
def get_products():
    return [
        {
            "id": 101, 
            "seller_id": 2, 
            "seller_name": "Audio Hub", 
            "name": "Soundcore C30i", 
            "price": 49.99, 
            "category": "Earbuds", 
            "stock": 5, 
            "image": "/images/c30i.png"
        },
        {
            "id": 102, 
            "seller_id": 2, 
            "seller_name": "Audio Hub", 
            "name": "Soundcore Q40i", 
            "price": 99.99, 
            "category": "Headphones", 
            "stock": 2, 
            "image": "/images/q40i.png"
        }
    ]