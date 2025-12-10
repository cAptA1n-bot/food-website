# Food Website - Full Stack Setup Guide

## Project Overview
A complete full-stack food delivery website with user authentication, shopping cart, and order management. Built with Node.js/Express backend, MongoDB database, and vanilla JavaScript frontend.

## Features
✅ User Registration & Login (JWT Authentication)  
✅ Role-Based Authorization (User/Admin)  
✅ Shopping Cart Management  
✅ Order Processing & Tracking  
✅ MongoDB Database Integration  
✅ Responsive Design  
✅ Real-time Cart Updates  

## Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas cloud database)
- **npm** (Node Package Manager)
- A code editor (VS Code recommended)

## Installation Steps

### Step 1: Install Dependencies
Open PowerShell in the project folder and run:
```powershell
npm install
```

This installs all required packages:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- cors (cross-origin support)
- dotenv (environment variables)

### Step 2: Configure MongoDB Connection
Edit the `.env` file with your MongoDB connection details:

**Option A: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodDB?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_here
   PORT=5000
   ```

**Option B: Local MongoDB**
1. Install MongoDB Community Edition
2. Update `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/foodDB
   JWT_SECRET=your_super_secret_key_here
   PORT=5000
   ```

### Step 3: Start the Server
```powershell
npm start
```

You should see:
```
Server running on port 5000
Connected to MongoDB successfully
```

### Step 4: Open in Browser
1. Open `http://localhost:5000` in your browser
2. You'll see the food website home page

## How to Use

### User Registration
1. Click the **User Profile Icon** in the header (top right)
2. Click **"Register"** link
3. Fill in:
   - Username
   - Email
   - Password (min 6 characters)
   - Confirm Password
4. Click **"Register"** button
5. You'll be logged in automatically

### User Login
1. Click the **User Profile Icon** in the header
2. Enter your email and password
3. Click **"Login"**
4. Your username will appear in the header

### Add Items to Cart
1. **Login first** (required)
2. Find food items in the "Popular Foods" section
3. Click **"Add to Cart"** button
4. Item will be added to your cart

### View Cart
1. Click the **Cart Icon** in the header (shows item count in badge)
2. Cart modal opens showing all items
3. Use **+/-** buttons to change quantities
4. Click **"Remove"** to delete items
5. Total price updates automatically

### Place an Order
1. Click **"Proceed to Checkout"** in cart modal
2. Fill in:
   - Delivery Address
   - Phone Number
   - Payment Method (Cash, Card, or UPI)
3. Click **"Place Order"**
4. Order confirmation with Order ID appears
5. Cart is cleared automatically

### View Order History
1. Click the **User Profile Icon** in the header (your username)
2. Click **"View Orders"**
3. See all your orders with status tracking:
   - **pending**: Order received
   - **confirmed**: Order confirmed
   - **preparing**: Being prepared
   - **out for delivery**: On the way
   - **delivered**: Order delivered
   - **cancelled**: Order cancelled

### Logout
1. Click the **User Profile Icon** in the header
2. Click **"Logout"**

## API Endpoints

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/profile` | Get current user profile |
| POST | `/api/auth/logout` | Logout (client-side) |

### Cart Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/` | Get user's cart |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update/:foodId` | Update item quantity |
| DELETE | `/api/cart/remove/:foodId` | Remove item from cart |
| DELETE | `/api/cart/clear` | Clear entire cart |

### Order Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/create` | Create new order from cart |
| GET | `/api/orders/my-orders` | Get user's orders |
| GET | `/api/orders/:orderId` | Get specific order |
| PUT | `/api/orders/:orderId/cancel` | Cancel order (if pending) |
| GET | `/api/orders/admin/all-orders` | Get all orders (admin only) |
| PUT | `/api/orders/admin/:orderId/status` | Update order status (admin only) |

### Food Card Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards` | Get all food items |
| POST | `/api/cards` | Add new food item |
| PUT | `/api/cards/:id` | Update food item |
| DELETE | `/api/cards/:id` | Delete food item |

## File Structure
```
food website/
├── server.js              # Express server & routes setup
├── package.json           # Dependencies & scripts
├── .env                   # Environment variables
├── models/
│   ├── User.js           # User schema with auth
│   ├── Cart.js           # Cart schema
│   ├── Order.js          # Order schema
│   └── FoodCard.js       # Food items schema
├── routes/
│   ├── auth.js           # Authentication endpoints
│   ├── cart.js           # Cart management endpoints
│   ├── orders.js         # Order processing endpoints
│   └── cards.js          # Food card endpoints
├── index.html            # Main HTML page
├── script.js             # Frontend JavaScript
└── style.css             # Styling
```

## Database Schema

### User Model
```javascript
{
  username: String,
  email: String (unique),
  password: String (hashed),
  cart: [
    {
      foodId: String,
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],
  orders: [ObjectId], // References to Order documents
  role: String (default: 'user'), // 'user' or 'admin'
  createdAt: Date
}
```

### Order Model
```javascript
{
  orderId: String (unique), // e.g., ORD-1634567890-userId
  userId: ObjectId (ref: User),
  items: [
    {
      foodId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  deliveryAddress: String,
  phoneNumber: String,
  paymentMethod: String, // 'cash', 'card', 'upi'
  paymentStatus: String, // 'pending', 'completed', 'failed'
  status: String, // pending, confirmed, preparing, out for delivery, delivered, cancelled
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features
- ✅ Password Hashing with bcryptjs (8 salt rounds)
- ✅ JWT Authentication (7-day expiry)
- ✅ Protected Routes with Authorization Middleware
- ✅ Role-Based Access Control (Admin/User)
- ✅ Secure Token Storage (localStorage)
- ✅ Password Confirmation on Registration

## Troubleshooting

### "MongoDB connection failed"
- Check `.env` file has correct MONGODB_URI
- Verify MongoDB is running (local) or Atlas is accessible (cloud)
- Ensure IP whitelist includes your address (Atlas)

### "Cannot POST /api/auth/register"
- Make sure server is running (`npm start`)
- Check if port 5000 is not already in use
- Verify MongoDB is connected

### "Login fails - email not found"
- Make sure you registered first
- Check email is correct (case-sensitive)
- Verify database has the user collection

### "Cart is empty after refresh"
- Token is stored in localStorage, should persist
- Clear browser cache/cookies if issues persist
- Login again to restore session

### "Cannot add items to cart"
- Must be logged in first
- Check network tab in DevTools for API errors
- Verify server is running

## Next Steps (Advanced)

1. **Add Image Upload**: Let users upload food item images
2. **Payment Gateway**: Integrate Stripe/Razorpay for real payments
3. **Email Notifications**: Send order confirmation emails
4. **Admin Dashboard**: Create admin panel for managing orders
5. **Search & Filter**: Add search functionality for food items
6. **User Reviews**: Add rating and review system
7. **Delivery Tracking**: Real-time delivery updates with maps
8. **Multiple Addresses**: Save multiple delivery addresses

## Support
For issues or questions, check the console (F12) for error messages and verify all steps are followed correctly.

## License
This project is open source and available under the MIT License.
