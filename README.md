# Ecommerce Project with Node.js and Express

This is an eCommerce project built using Node.js and Express, incorporating various technologies for authentication, authorization, CRUD operations, payment processing, and network traffic management, logger system with Morgan and Winston for saving logs in files, and upload photos functionality using Multer.

## Technologies Used
- bcrypt: Used for password hashing and security.
- cors: Enables Cross-Origin Resource Sharing for client-server communication.
- dotenv: Loads environment variables from a .env file into process.env.
- express-rate-limit: Implements rate limiting for API endpoints to prevent abuse.
- express-session: Enables session management for user sessions.
- helmet: Enhances security by setting HTTP headers.
- jsonwebtoken: Utilized for generating and verifying JSON Web Tokens (JWT) for authentication.
- mongoose: An ODM for MongoDB, used for data modeling and interactions.
- morgan: A HTTP request logger middleware for Express.
- multer: Handles file uploads for images and other media.
- nodemon: Monitors changes in your Node.js application and restarts the server.
- passport: A popular authentication middleware for Node.js applications.
- passport-github: Passport strategy for authenticating with GitHub using OAuth.
- stripe: Integrates secure payment processing with Stripe.

## Features
- Authentication and Authorization
- Utilizes JWT for secure authentication and authorization.
- Implements register and login functionalities with local strategy and GitHub OAuth.

### User Operations
- Allows CRUD operations for users, including profile management.
- Provides yearly statistics for user activities and purchases.
### Product Management
- Enables CRUD operations for products, including categories and inventory management.
### Cart Management
- Supports CRUD operations for user carts and retrieval of userCart data.
### Order Management
- Facilitates CRUD operations for orders and tracks monthly income.
### Payment Processing
- Integrates Stripe for secure and efficient payment processing.
### Network Traffic Management
- Implements rate limiting and network traffic controls for enhanced security and performance.
### Logger System
- Utilizes Morgan and Winston for logging HTTP requests.
- Logs are saved in a file named combined.log for reference and troubleshooting.
### File Upload
- Uses Multer for handling file uploads, supporting various file types including images.
- Uploaded files are stored in the uploads/ directory.


## License
This project is licensed under the [MIT License].
