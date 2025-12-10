# ⚡ Quick Reference Card

## 🚀 Start Here - 3 Minutes to Running

```powershell
# 1. Navigate to project
cd "c:\coding\food website"

# 2. Install dependencies (first time only)
npm install

# 3. Configure MongoDB in .env file
# Update: MONGODB_URI=your_connection_string
# Update: JWT_SECRET=any_random_string

# 4. Start server
npm start

# 5. Open browser
http://localhost:5000
```

---

## 🔑 Key Credentials for Testing

```
Test User Account:
├─ Email: test@example.com
├─ Password: password123
└─ Username: testuser

Admin Account (optional):
├─ Email: admin@example.com
├─ Password: adminpass123
└─ Username: admin
```

To create test account:
1. Click user icon → Register
2. Fill in test data above
3. Done! Automatically logged in

---

## 🎯 Complete User Workflow (2 Minutes)

```
┌─────────────────────────────────────┐
│ 1. REGISTER (1 minute)              │
│ • Click user icon (top right)       │
│ • Click "Register"                  │
│ • Fill: username, email, password   │
│ • Click "Register"                  │
│ ✓ Logged in - username shows        │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│ 2. ADD TO CART (30 seconds)         │
│ • Scroll to "Popular Foods"         │
│ • Click "Add to Cart" on item       │
│ • Cart badge increments             │
│ • Repeat for multiple items         │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│ 3. CHECKOUT (30 seconds)            │
│ • Click cart icon (top right)       │
│ • Review items & totals             │
│ • Click "Proceed to Checkout"       │
│ • Fill: address, phone, payment     │
│ • Click "Place Order"               │
│ ✓ Order confirmed with ID           │
└─────────────────────────────────────┘
```

---

## 📱 Navigation Guide

### Header (Top of Page)
```
┌──────────────────────────────────────────┐
│ 🍕 Logo  │  Navbar  │ 🛒 Cart  │ 👤 User  │
└──────────────────────────────────────────┘
                          ↓
                    Cart Badge (0-99+)
```

**Cart Icon** → View/manage cart items  
**User Icon** → Login/Register or Profile/Logout

### Main Content
```
1. Header - Logo, Navigation
2. Hero Section - Welcome message
3. Popular Foods - Browse & add items
4. Footer - Copyright info
```

### Modals (Popups)
```
Login Modal       → Username/Password
Register Modal    → Registration form
Cart Modal        → Shopping cart review
Checkout Modal    → Delivery details
Orders Modal      → Order history
Profile Modal     → User info & actions
```

---

## 🔐 User Roles & Permissions

### Regular User (default)
```
✓ Register account
✓ Login/Logout
✓ View profile
✓ Add to cart
✓ Manage cart items
✓ Place orders
✓ View own orders
✗ Modify other users' orders
✗ Update order status
✗ View all orders
```

### Admin User
```
✓ All regular user permissions
✓ View all orders (system-wide)
✓ Update order status
✓ Change order delivery status
✓ Manage all orders
```

*To create admin: Manually set role='admin' in MongoDB*

---

## 💾 Data Persistence

### Browser Storage (localStorage)
```javascript
// Your browser stores:
1. userToken          → JWT authentication token
2. currentUser        → User profile info

// Cleared on:
• Browser cache clear
• Logout action
• Manual localStorage.clear()

// Persists:
• Page refresh
• Browser close/open
• New tab (same domain)
```

### Database Storage (MongoDB)
```javascript
// Permanently stored:
1. User accounts (email, password hash)
2. Cart items (per user)
3. Orders (order history)
4. Food cards (menu items)

// Auto-deleted:
• Cart items (cleared after order)
• Sessions (removed on logout)
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
```
✓ Check .env file has MONGODB_URI
✓ Test connection string in MongoDB Atlas
✓ Verify IP whitelist includes your IP
✓ Check internet connection
✓ Restart server: npm start
```

### Issue: "Cart not working"
```
✓ Must be logged in first
✓ Check Authorization header sent
✓ Check browser DevTools Network tab
✓ Verify token not expired (7 days)
✓ Refresh page (F5) to reload
```

### Issue: "Login fails"
```
✓ Verify user was registered first
✓ Check email is correct (case-sensitive)
✓ Verify password is correct
✓ Check MongoDB connection
✓ Look for error in browser console (F12)
```

### Issue: "Page won't load"
```
✓ Server running? (Check terminal)
✓ Correct URL? (http://localhost:5000)
✓ Port 5000 available? (Check netstat)
✓ No JavaScript errors? (F12 → Console)
✓ Try hard refresh: Ctrl+Shift+R
```

---

## 🧪 Quick API Tests (Using Browser)

### Test 1: Check Server is Running
```
Open: http://localhost:5000/api/health
Expected: ✓ Page loads, ✓ No errors
```

### Test 2: Register & Get Token
```
1. Click user icon → Register
2. Fill form → Register
3. Open DevTools (F12)
4. Application → localStorage
5. Find: userToken (should be long string)
```

### Test 3: Verify Token
```
1. DevTools → Network tab
2. Add item to cart
3. Check cart request has:
   Authorization: Bearer {token}
   Response: 200 OK with cart data
```

### Test 4: Create Order
```
1. Add item to cart
2. Click checkout
3. Fill address/phone/payment
4. Place order
5. Check response has:
   orderId: ORD-xxxxx
   status: pending
```

---

## 📊 API Endpoints Quick Reference

```javascript
// AUTHENTICATION
POST   /api/auth/register      // Register new user
POST   /api/auth/login         // Login user → get token
GET    /api/auth/profile       // Get current user info

// CART (requires token)
GET    /api/cart/              // Get user's cart
POST   /api/cart/add           // Add item
PUT    /api/cart/update/{id}   // Update quantity
DELETE /api/cart/remove/{id}   // Remove item
DELETE /api/cart/clear         // Clear all

// ORDERS (requires token)
POST   /api/orders/create           // Create order from cart
GET    /api/orders/my-orders        // Get user's orders
GET    /api/orders/{id}             // Get order details
PUT    /api/orders/{id}/cancel      // Cancel order

// ADMIN ONLY (requires admin token)
GET    /api/orders/admin/all-orders        // All orders
PUT    /api/orders/admin/{id}/status       // Update status
```

---

## ⏰ Default Timeouts & Limits

```
JWT Token Expiry:        7 days
Session Timeout:         No limit (token-based)
Cart Item Limit:         Unlimited
Order Size:              Unlimited items
Address Length:          Max 500 characters
Phone Number:            Any length (validation in form)
Payment Methods:         cash, card, upi
Order Statuses:          pending, confirmed, preparing,
                         out for delivery, delivered, cancelled
```

---

## 🔧 Environment Variables (.env)

```properties
# Database Connection (Required)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/foodDB

# JWT Secret (Change in production!)
JWT_SECRET=your_super_secret_key_here

# Server Port
PORT=5000

# Optional: Log Level
# LOG_LEVEL=debug
```

---

## 📁 Important File Locations

```
Configuration:
  └─ c:\coding\food website\.env

Frontend:
  ├─ c:\coding\food website\index.html
  ├─ c:\coding\food website\script.js
  └─ c:\coding\food website\style.css

Backend:
  ├─ c:\coding\food website\server.js
  ├─ c:\coding\food website\models\*.js
  └─ c:\coding\food website\routes\*.js

Documentation:
  ├─ c:\coding\food website\SETUP_GUIDE.md
  ├─ c:\coding\food website\API_TESTING_GUIDE.md
  ├─ c:\coding\food website\CHECKLIST.md
  └─ c:\coding\food website\README.md
```

---

## 🎯 Success Indicators

✅ **Server Ready**
- Terminal shows: "Server running on port 5000"
- Terminal shows: "Connected to MongoDB successfully"
- No error messages

✅ **Page Loads**
- URL: http://localhost:5000
- Page displays food website
- No blank pages or 404 errors
- Browser console has no errors (F12)

✅ **Auth Works**
- Can register new account
- Can login with credentials
- Username appears in header
- Can logout

✅ **Cart Works**
- Cart badge shows item count
- Can add items from menu
- Can view cart with items
- Total price calculates correctly

✅ **Orders Work**
- Can fill checkout form
- Can place order
- Get Order ID confirmation
- Can view order history

---

## 📞 Help Resources

### Quick Answers
- **Questions about setup?** → Read SETUP_GUIDE.md
- **API not working?** → Check API_TESTING_GUIDE.md
- **Need to verify features?** → Use CHECKLIST.md
- **Want to understand flow?** → See FEATURE_FLOWS.md

### Debugging Steps
1. Check browser console: F12 → Console
2. Check Network tab: F12 → Network
3. Check server terminal for error logs
4. Verify MongoDB is running
5. Check .env file is correct

### When Stuck
1. Check corresponding documentation file
2. Verify all prerequisites are met
3. Try restarting server: `npm start`
4. Clear browser cache: Ctrl+Shift+Delete
5. Check project file structure

---

## 🚀 Performance Optimization

### Server Performance
- ~500ms per API request
- Indexed database queries on email
- Mongoose connection pooling
- Gzip compression enabled
- Static file caching

### Frontend Performance
- Vanilla JavaScript (no framework overhead)
- Minimal CSS (~50KB)
- Event delegation for efficiency
- Lazy modal loading
- No unnecessary DOM reflows

### Database Performance
- Email index for fast lookups
- Auto-calculated totals
- Efficient update operations
- Connection pooling

---

## 📝 Cheat Sheet

```bash
# Common Commands
npm install             # Install dependencies
npm start              # Start server
npm dev               # Dev mode (same as start)

# Browser Shortcuts
F12                   # Open DevTools
Ctrl+Shift+R          # Hard refresh
Ctrl+Shift+Delete     # Clear cache
```

```javascript
// Common Endpoints (in browser)
GET  http://localhost:5000/api/auth/profile
GET  http://localhost:5000/api/cart
POST http://localhost:5000/api/orders/create
```

```powershell
# Database Checks
# (From MongoDB Atlas or local)
db.users.find()       # View users
db.orders.find()      # View orders
db.users.deleteMany({}) # Clear users (dev only)
```

---

## ✅ Verification Checklist

- [ ] npm install completed
- [ ] .env file configured
- [ ] Server starts without errors
- [ ] Page loads at localhost:5000
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can add items to cart
- [ ] Can view cart
- [ ] Can place order
- [ ] Can view order history
- [ ] No console errors (F12)

---

## 🎉 You're All Set!

Your food website is **ready to use right now**. Start with:

```powershell
npm install
npm start
```

Then open: `http://localhost:5000`

**Enjoy your food website! 🍕🍔🍜**
