# Italiano Sunglasses Ecommerce Backend

This is the backend API for the Italiano Sunglasses Ecommerce application. It provides RESTful endpoints for managing products and admin authentication, built with Node.js, Express, and MongoDB. Image uploads are handled via Cloudinary.

## Features

- Product CRUD operations (Create, Read, Update, Delete)
- Admin authentication with JWT
- Image upload and management via Cloudinary
- Input validation and error handling
- CORS enabled for cross-origin requests, restricted to a trusted frontend URL

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary (for image storage)
- JWT (JSON Web Tokens) for authentication
- Multer (for file uploads)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd sunglasses-store-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   MONGO_DB_URI=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   JWT_SECRET_KEY=your_jwt_secret
   ADMIN_PASSWORD=your_bcrypt_hashed_admin_password
   FRONTEND_URL=https://your-frontend.com
   ```

   > **Note:** `ADMIN_PASSWORD` should be a bcrypt hash of your desired admin password.

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

#### POST `/admin-login`

- **Description:** Admin login. Returns a JWT token if the password is correct.
- **Request Body:**
  ```json
  { "password": "your_admin_password" }
  ```
- **Response:**
  ```json
  { "token": "<jwt_token>" }
  ```
- **JWT Payload Example:**
  ```json
  { "role": "ADMIN" }
  ```

### Products

All product endpoints are prefixed with `/api/products`.

#### GET `/api/products`

- **Description:** Get a paginated list of products.
- **Query Params:** `page`, `limit`
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": {
      "products": [ ... ],
      "totalPages": 2
    }
  }
  ```

#### GET `/api/products/:productId`

- **Description:** Get a single product by ID.

#### POST `/api/products`

- **Description:** Add a new product. **Requires JWT token in Authorization header.**
- **Headers:** `Authorization: Bearer <token>`
- **Form Data:**
  - `title` (string, required)
  - `description` (string, required)
  - `details` (object, required: brand, manufacturer, material, lenses)
  - `price` (number, required)
  - `images` (array of image files)

#### PUT `/api/products/:productId`

- **Description:** Edit a product. **Requires JWT token in Authorization header.**
- **Headers:** `Authorization: Bearer <token>`
- **Form Data:** Same as POST

#### DELETE `/api/products/:productId`

- **Description:** Delete a product by ID. **Requires JWT token in Authorization header.**

### Images

- Uploaded images are served statically at `/images/<filename>`

## Product Model

```js
{
  title: String,
  description: String,
  details: {
    brand: String,
    manufacturer: String,
    material: String,
    lenses: String
  },
  price: Number,
  images: [
    {
      url: String,
      imgId: String
    }
  ]
}
```

## Error Handling

All error responses follow this format:

```json
{
  "status": "ERROR" | "FAIL",
  "message": "Error message",
  "code": 400
}
```

## Security

- **JWT tokens now include a `role` field** in their payload, allowing for better authorization and future scalability.
- **CORS is restricted** to a trusted frontend URL using the `FRONTEND_URL` environment variable, preventing unauthorized cross-origin requests.
- **Sensitive data is never logged** in production code.
- **All product modification endpoints (POST, PUT, DELETE)** require a valid JWT token in the `Authorization` header.

## Deployment

- The project is configured for deployment on [Vercel](https://vercel.com/) using `vercel.json`.
- The entry point is `index.js`.
