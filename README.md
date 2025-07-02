# 🛒 Express.js Products API

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB running locally or a MongoDB Atlas URI

### Installation

git clone <your-repo-url>
cd <your-repo-folder>
npm install
```

### Environment Variables

Create a `.env` file in the root directory. See `.env.example` for required variables.

### Running the Server

```bash
npm start
```
The server will run on the port specified in `.env` (default: 3000).

---

## 📚 API Documentation

All endpoints require an `x-api-key` header with your API key.

### Base URL

```
http://localhost:3000
```

### Endpoints

#### GET `/products`
- List all products
- Supports filtering, search, and pagination:
  - `?category=Electronics`
  - `?search=phone`
  - `?page=2&limit=5`

#### GET `/products/:id`
- Get a product by MongoDB `_id`

#### POST `/products`
- Create a new product  
- **Body:**
  ```json
  {
    "id": 1,
    "name": "Phone",
    "description": "A smart phone",
    "price": 299.99,
    "category": "Electronics",
    "inStock": true
  }
  ```

#### PUT `/products/:id`
- Update an existing product  
- **Body:** (same as POST)

#### DELETE `/products/:id`
- Delete a product

#### GET `/products/stats`
- Get product count by category

---

## 📝 Example Requests

**Create a product:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: <your-api-key>" \
  -d '{"id":1,"name":"Phone","description":"A smart phone","price":299.99,"category":"Electronics","inStock":true}'
```

**Get all products in Electronics:**
```bash
curl -H "x-api-key: <your-api-key>" "http://localhost:3000/products?category=Electronics"
```

---

## 🛡️ .env.example

```
MONGO_URI=mongodb://localhost:27017/productsDb
PORT=3000
API_KEY=your_api_key_here
```
