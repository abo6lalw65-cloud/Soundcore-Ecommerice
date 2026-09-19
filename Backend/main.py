from fastapi import FastAPI

app = FastAPI()
# A simple home route to check if server is working
@app.get("/")
def read_root():
    return {"message": "Welcome to Soundcore Backend API!"}

# A test route to check products
@app.get("/api/products")
def get_products():
    return [
        {"id": 101, "name": "Soundcore C30i", "price": 49.99, "stock": 5},
        {"id": 102, "name": "Soundcore Q40i", "price": 99.99, "stock": 2}
    ]