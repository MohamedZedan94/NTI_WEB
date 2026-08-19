# Crochet Marketplace — Backend

A RESTful backend for a multi-vendor handmade goods marketplace, where registered sellers can open their own **stores** and list the **products** they sell under them. Built with Node.js, Express, and MongoDB (Mongoose), following an MVC folder structure.

## Features Implemented

**Authentication & Authorization**
- User registration (signup) and login (signin) using hashed passwords (bcrypt) and JWT-based sessions
- Two user roles: `buyer` and `seller`, chosen at signup
- Route protection via two middlewares: one verifies the JWT and identifies the user, the other restricts specific routes to specific roles (e.g. only `seller` accounts can create a store or product)
- Optional profile image upload on signup, with a default avatar used when none is provided

**Store Management**
- Create, read, update, and delete stores
- Each store has a name, description, category (crochet, wood, candles, jewelry, or other), and an optional logo image
- Every store is linked to the user who created it (its **owner**) — only that user can update or delete it
- Only accounts with the `seller` role can create a store
- Full schema validation (required fields, length limits, allowed categories)

**Product Management**
- Create, read, update, and delete products
- Each product belongs to a specific store (linked by reference), and includes a name, description, price, quantity, and an optional image
- Only the **owner of the store** a product belongs to can create, update, or delete that product — including when reassigning a product to a different store, which is only allowed if the destination store also belongs to the same user
- Full schema validation (required fields, length limits, non-negative price/quantity)

**Store–Product Relationship**
- When creating or updating a product, the backend verifies that the referenced store actually exists and belongs to the requesting user before proceeding
- **Cascade delete**: deleting a store automatically deletes every product that belonged to it, including their uploaded images — no orphaned products are left behind

**Image Uploads**
- Image uploads are handled with Multer, with separate storage folders for user profile images, store images, and product images
- Only image files are accepted
- Uploaded images are automatically cleaned up (deleted from disk) whenever the related operation fails, whenever an image is replaced during an update, or whenever the related store/product is deleted — so no unused files are left on the server

**Error Handling**
- Consistent JSON response format across all endpoints (`status`, `message`, and `data` where applicable)
- Proper HTTP status codes for success, validation errors, authentication/authorization failures, not-found cases, and server errors

## How to Run the Project

1. Make sure you have Node.js and a MongoDB database (local or Atlas) available.
2. Clone the repository and navigate into the project folder.
3. Install dependencies (including `bcryptjs` and `jsonwebtoken` for the auth system):
   - Run the install command for your package manager (e.g. `npm install`).
4. Create a `.env` file in the project root with the required environment variables:
   - The server port and your MongoDB connection string (check `config/dp-connect.js` for the exact variable name expected)
   - `JWT_SECRET` — a long, random secret string used to sign tokens
   - `JWT_EXPIRES_IN` — optional, defaults to `7d` if not set
5. Start the server:
   - Use the start/dev script defined in `package.json` (the project uses `nodemon` for development, so it restarts automatically on file changes).
6. Once running, the server logs the port it's listening on. All endpoints are available under the `/api/v1` base path, and uploaded images are served statically from `/api/v1/uploads`.

## API Usage Examples

**Registering an account**
A new user signs up with their first name, last name, email, password, and chosen role (buyer or seller), optionally attaching a profile image. A successful signup returns a JWT token immediately, so the user is logged in right away. Weak passwords, duplicate emails, or an invalid role are rejected with a validation error.

**Logging in**
An existing user logs in with their email and password. On success, a fresh JWT token is returned; on failure (wrong password or unknown email), a generic "invalid credentials" error is returned without revealing which part was incorrect.

**Accessing protected routes**
Once a user has a token, it must be included on every request to a protected route as an `Authorization: Bearer <token>` header. Requests without a valid token are rejected before reaching any business logic, and requests from a user whose role doesn't match what the route requires are rejected separately, with a different error.

**Creating a store**
A logged-in user with the `seller` role can create a store by providing its name, description, and category, optionally attaching a logo. The store is automatically linked to the logged-in user as its owner — this cannot be set manually. If the category isn't one of the allowed values, or a required field is missing, the request is rejected and any uploaded image is cleaned up automatically.

**Browsing stores**
Requesting the full list of stores returns every store currently registered, along with a count. A single store can also be retrieved individually by its ID, returning a not-found response if no store matches. Browsing is open to everyone, logged in or not.

**Updating or deleting a store**
Only the store's owner can update or delete it — anyone else attempting to do so, even another logged-in seller, receives a permission error. Updating a store's logo automatically removes the previous one from the server. Deleting a store also removes every product listed under it, along with each of those products' images.

**Creating a product**
Creating a product requires specifying which store it belongs to, along with its name, description, price, and quantity, optionally with an image. Only the owner of that store can add products to it; attempting to add a product to someone else's store is rejected, as is specifying a store that doesn't exist.

**Browsing and updating products**
Products can be listed in full or retrieved individually by ID without logging in. Updating or deleting a product is restricted to the owner of the store it belongs to — this includes reassigning a product to a different store, which is only permitted if the new store also belongs to the same user.
