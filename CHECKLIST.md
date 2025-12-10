# Installation & Testing Checklist

## Pre-Installation Checklist
- [ ] Node.js installed (check with `node --version`)
- [ ] npm installed (check with `npm --version`)
- [ ] MongoDB connection ready (Atlas account or local setup)
- [ ] Code editor open (VS Code)
- [ ] Terminal/PowerShell ready

## Installation Steps
- [ ] Run `npm install` in project folder
- [ ] All dependencies installed successfully
- [ ] Update `.env` file with MongoDB URI
- [ ] Update `.env` file with JWT_SECRET (any random string)
- [ ] Save `.env` file

## Server Startup
- [ ] Run `npm start` in terminal
- [ ] See message: "Server running on port 5000"
- [ ] See message: "Connected to MongoDB successfully"
- [ ] No error messages in console

## Frontend Loading
- [ ] Open `http://localhost:5000` in browser
- [ ] Page loads without errors (check console F12)
- [ ] See food website home page
- [ ] Header displays with cart icon and user icon
- [ ] Food items visible in "Popular Foods" section
- [ ] "Add to Cart" buttons visible

## Authentication Tests
- [ ] Can see Login/Register modal by clicking user icon
- [ ] Register modal shows all fields (username, email, password)
- [ ] Can register with valid data
- [ ] After registration, logged in and see username in header
- [ ] Can logout and return to login state
- [ ] Can login with registered credentials
- [ ] Cannot login with wrong password (error shown)
- [ ] Cannot register with existing email (error shown)

## Cart Functionality
- [ ] Cart icon shows "0" badge when not logged in
- [ ] Can click "Add to Cart" buttons after login
- [ ] Cart badge updates with item count
- [ ] Can click cart icon to view cart modal
- [ ] Cart shows added items with images and prices
- [ ] Can increase/decrease item quantities
- [ ] Can remove items from cart
- [ ] Total price updates correctly
- [ ] Can see "Proceed to Checkout" button

## Checkout & Orders
- [ ] Click "Proceed to Checkout" opens checkout form
- [ ] Can fill in delivery address
- [ ] Can enter phone number
- [ ] Can select payment method
- [ ] Click "Place Order" shows success with Order ID
- [ ] Cart clears after order
- [ ] Cart badge resets to "0"

## Order History
- [ ] Click user profile icon shows profile modal
- [ ] Profile shows username, email, role
- [ ] "View Orders" button visible
- [ ] Click "View Orders" shows order list
- [ ] Orders show Order ID, total, status, date
- [ ] Can close modals by clicking X or outside

## Browser Console (F12)
- [ ] No JavaScript errors in console
- [ ] No 404 errors for images/files
- [ ] No CORS errors in Network tab

## Network/API Tests
- [ ] Register endpoint working (check Network tab)
- [ ] Login endpoint working
- [ ] Add to cart endpoint working
- [ ] Get cart endpoint working
- [ ] Create order endpoint working
- [ ] Get orders endpoint working
- [ ] All responses are JSON format

## Database Tests
- [ ] User is created in MongoDB
- [ ] User document has cart array
- [ ] User document has orders array
- [ ] Cart items save correctly
- [ ] Orders are created with all fields
- [ ] Order status is "pending" initially

## Security Tests
- [ ] Password is not visible in frontend code
- [ ] Token stored in localStorage
- [ ] Token sent in Authorization header
- [ ] Cannot access cart without login
- [ ] Cannot place order without address
- [ ] Session persists after page refresh

## Performance Tests
- [ ] Page loads within reasonable time
- [ ] Buttons respond immediately to clicks
- [ ] Cart updates are instant
- [ ] No duplicate items when adding same food twice (quantity increases)

## Mobile Responsiveness
- [ ] Open DevTools (F12) → Toggle device toolbar
- [ ] Modals are readable on mobile screen
- [ ] Forms are usable on mobile
- [ ] Cart displays well on mobile
- [ ] Buttons are clickable on mobile

## Final Production Readiness
- [ ] `.env` file has strong JWT_SECRET
- [ ] MongoDB URI is correct
- [ ] All npm dependencies installed
- [ ] No console errors on production features
- [ ] Tested complete user workflow:
  1. Register → Login → Add to Cart → Checkout → Order → View History
- [ ] All modals close properly
- [ ] Logout clears all user data

## Troubleshooting Checklist

### If page won't load:
- [ ] Server is running (`npm start`)
- [ ] URL is correct: `http://localhost:5000`
- [ ] Check console for errors (F12)
- [ ] Restart server and refresh page

### If login fails:
- [ ] Check MongoDB is running
- [ ] Verify `.env` has correct MONGODB_URI
- [ ] Check Network tab for API response
- [ ] Try registering a new user first
- [ ] Verify email/password combination

### If add to cart fails:
- [ ] Must be logged in first
- [ ] Check Authorization header is sent
- [ ] Check Network tab response for error message
- [ ] Verify token is valid (not expired)
- [ ] Check MongoDB connection

### If cart doesn't show items:
- [ ] Verify items were actually added (check DB)
- [ ] Check `GET /api/cart/` response in Network tab
- [ ] Refresh page to reload cart
- [ ] Check browser localStorage has token

### If order creation fails:
- [ ] Cart must have at least one item
- [ ] All checkout fields must be filled
- [ ] User must be logged in
- [ ] Check `POST /api/orders/create` response
- [ ] Verify MongoDB is storing orders

## Quick Reference Commands

```powershell
# Install dependencies
npm install

# Start server
npm start

# Check Node version
node --version

# Check npm version
npm --version

# Stop server (Ctrl + C)
```

## Final Verification

✅ **All checks passed?** 

Your food website is ready to use! 🎉

### Congratulations! You now have:
- ✅ User authentication with JWT
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ MongoDB database integration
- ✅ Role-based authorization
- ✅ Full responsive design

**Next Steps:**
1. Add real MongoDB Atlas account
2. Update JWT_SECRET to strong value
3. Deploy to production (Heroku, Vercel, AWS)
4. Add payment gateway integration
5. Set up email notifications

Happy coding! 🍔🍕🍜
