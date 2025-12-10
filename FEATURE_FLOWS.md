# 🔄 Complete Feature Flow Diagrams

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    FOOD WEBSITE USER JOURNEY                     │
└─────────────────────────────────────────────────────────────────┘

  [Start: localhost:5000]
           ↓
    [Page Loads]
           ↓
  ┌──────────────────┐
  │  User Not Logged │
  │   In (Default)   │
  └────────┬─────────┘
           ↓
  ┌─────────────────────────────────────────┐
  │ Click User Icon in Header               │
  │ ↓                                       │
  │ Shows Login Modal with:                │
  │ • Email field                          │
  │ • Password field                       │
  │ • "Register" link                      │
  └─────────┬───────────────────────────────┘
            ↓
    ┌──────────────────┐
    │ New User?        │
    └────┬───────┬─────┘
         │       │
        YES     NO
         │       │
         ↓       ↓
    [Register] [Login]
         │       │
         └───┬───┘
             ↓
    ┌─────────────────────────────────────────┐
    │ Registered/Logged In                    │
    │ • Username shows in header              │
    │ • JWT token stored in localStorage      │
    │ • Can now access cart features          │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ Browse Food Items                       │
    │ • View "Popular Foods" section          │
    │ • See food name, price, image           │
    │ • "Add to Cart" button available        │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ Add Items to Cart                       │
    │ • Click "Add to Cart" button            │
    │ • Item sent to backend                  │
    │ • Cart badge increments                 │
    │ • Can add multiple items                │
    │ • Quantities increase if same item      │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ Review Cart                             │
    │ • Click cart icon in header             │
    │ • See all items with:                   │
    │   - Food image                          │
    │   - Food name                           │
    │   - Price per item                      │
    │   - Quantity (with +/- buttons)         │
    │   - Subtotal per item                   │
    │ • Total price shown at bottom           │
    │ • "Remove" button for each item         │
    │ • "Proceed to Checkout" button          │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ (Optional) Modify Cart                  │
    │ • Click +/- to change quantities        │
    │ • Click Remove to delete items          │
    │ • Total recalculates automatically      │
    │ • Can go back to shopping               │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ Checkout                                │
    │ • Fill delivery address                 │
    │ • Enter phone number                    │
    │ • Select payment method:                │
    │   - Cash on Delivery                    │
    │   - Card Payment                        │
    │   - UPI Payment                         │
    │ • Click "Place Order"                   │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ Order Confirmation                      │
    │ • Success message appears               │
    │ • Order ID displayed: ORD-xxxxx         │
    │ • Cart automatically cleared            │
    │ • Cart badge resets to 0                │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ View Order History                      │
    │ • Click user profile icon               │
    │ • Click "View Orders"                   │
    │ • See all orders with:                  │
    │   - Order ID                            │
    │   - Total amount                        │
    │   - Order status                        │
    │   - Order date                          │
    │   - Number of items                     │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ Track Order Status                      │
    │ Status progression:                     │
    │ ☐ pending (just placed)                 │
    │ ↓                                       │
    │ ☐ confirmed (restaurant confirmed)     │
    │ ↓                                       │
    │ ☐ preparing (being cooked)              │
    │ ↓                                       │
    │ ☐ out for delivery (on the way)         │
    │ ↓                                       │
    │ ✓ delivered (received!)                 │
    │                                         │
    │ (Or: cancelled if cancelled)             │
    └────────┬────────────────────────────────┘
             ↓
    ┌─────────────────────────────────────────┐
    │ (Optional) Logout                       │
    │ • Click profile icon                    │
    │ • Click "Logout"                        │
    │ • Session cleared                       │
    │ • Back to login state                   │
    └─────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                           │
└──────────────────────────────────────────────────────────────────┘

REGISTRATION:
──────────

[User enters: username, email, password, confirm password]
                          ↓
              [Send to: POST /api/auth/register]
                          ↓
            [Server validates input & checks if email exists]
                          ↓
              [Password hashed with bcryptjs]
                          ↓
           [User document created in MongoDB]
                          ↓
           [JWT token generated (expires in 7 days)]
                          ↓
    [Response: token + user info sent to frontend]
                          ↓
       [Token stored in localStorage (key: 'userToken')]
                          ↓
         [Current user stored in localStorage (key: 'currentUser')]
                          ↓
            [Username displayed in header]
                          ↓
              [User ready to shop]


LOGIN:
─────

[User enters: email, password]
              ↓
      [Send to: POST /api/auth/login]
              ↓
  [Server finds user by email]
              ↓
  [Check password hash with bcryptjs]
              ↓
  [If match: JWT token generated]
      ↓           ↓
    YES          NO
     ↓           ↓
  [Token]   [Error: Invalid credentials]
     ↓
  [Store token in localStorage]
     ↓
  [Display username in header]
     ↓
  [User logged in]


PROTECTED REQUESTS:
──────────────────

[User performs action: add to cart, view cart, create order]
                    ↓
        [Request includes header:]
        Authorization: Bearer {JWT_TOKEN}
                    ↓
          [Server validates token]
                    ↓
    ┌───────────────┴───────────────┐
    ↓                               ↓
[Valid]                        [Invalid/Expired]
    ↓                               ↓
[Process request]          [Error: Unauthorized]
    ↓                               ↓
[Return data]              [User must login again]


LOGOUT:
──────

[User clicks Logout button]
          ↓
[Remove token from localStorage]
          ↓
[Remove user from localStorage]
          ↓
[Reset header UI]
          ↓
[Show login button]
          ↓
[Cart access blocked]
```

---

## Database Schema Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                      DATABASE STRUCTURE                           │
└──────────────────────────────────────────────────────────────────┘

MongoDB: foodDB
│
├─ Collections:
│  │
│  ├─ users
│  │  ├─ _id
│  │  ├─ username
│  │  ├─ email (unique index)
│  │  ├─ password (hashed)
│  │  ├─ cart: [
│  │  │  ├─ foodId
│  │  │  ├─ name
│  │  │  ├─ price
│  │  │  ├─ image
│  │  │  └─ quantity
│  │  ├─ orders: [ObjectId → references orders]
│  │  ├─ role: 'user' | 'admin'
│  │  └─ createdAt
│  │
│  ├─ orders
│  │  ├─ _id
│  │  ├─ orderId (unique: ORD-1234567890-userId)
│  │  ├─ userId (ref: users._id)
│  │  ├─ items: [
│  │  │  ├─ foodId
│  │  │  ├─ name
│  │  │  ├─ price
│  │  │  └─ quantity
│  │  ├─ totalAmount
│  │  ├─ deliveryAddress
│  │  ├─ phoneNumber
│  │  ├─ paymentMethod: 'cash' | 'card' | 'upi'
│  │  ├─ paymentStatus
│  │  ├─ status: 'pending' | 'confirmed' | 'preparing' |
│  │  │           'out for delivery' | 'delivered' | 'cancelled'
│  │  ├─ createdAt
│  │  └─ updatedAt
│  │
│  ├─ carts (auto-calculated via User model)
│  │  ├─ userId (ref)
│  │  ├─ items
│  │  ├─ totalPrice (calculated before save)
│  │  └─ totalItems (calculated before save)
│  │
│  └─ foodcards
│     ├─ _id
│     ├─ name
│     ├─ image
│     ├─ price
│     ├─ category
│     ├─ description
│     └─ createdAt
```

---

## Cart & Order Processing

```
┌──────────────────────────────────────────────────────────────────┐
│                  CART & ORDER PROCESSING                          │
└──────────────────────────────────────────────────────────────────┘

ADD TO CART:
──────────

[User clicks "Add to Cart"]
          ↓
[Check: User logged in?]
    ├─ NO → Show Login Modal
    └─ YES ↓
     [Send: POST /api/cart/add]
     Headers: Authorization: Bearer {token}
     Body: {foodId, name, price, image}
          ↓
   [Server: Find user by token]
          ↓
   [Server: Check if item exists in cart.items]
     ├─ YES → Increment quantity
     └─ NO → Add new item with quantity=1
          ↓
   [Server: Recalculate totalPrice and totalItems]
          ↓
   [Server: Save user document]
          ↓
   [Response: Updated cart sent to frontend]
          ↓
   [Frontend: Update cart badge]
          ↓
   [Show: "Item added to cart!" message]


VIEW CART:
────────

[User clicks cart icon]
          ↓
[Send: GET /api/cart/]
Headers: Authorization: Bearer {token}
          ↓
[Server: Find user, return cart array]
          ↓
[Response: {cart: [...], totalPrice, totalItems}]
          ↓
[Frontend: Generate cart modal with items]
          ↓
[Display: Items with images, prices, quantities]
          ↓
[Display: Total price at bottom]


CHECKOUT:
────────

[User clicks "Proceed to Checkout"]
          ↓
[Modal shows: Delivery address, phone, payment method]
          ↓
[User fills form and clicks "Place Order"]
          ↓
[Send: POST /api/orders/create]
Headers: Authorization: Bearer {token}
Body: {deliveryAddress, phoneNumber, paymentMethod}
          ↓
[Server: Find user and cart items]
          ↓
[Server: Validate cart has items]
          ↓
[Server: Generate Order ID: ORD-{timestamp}-{userId}]
          ↓
[Server: Create Order document in MongoDB]
          ↓
[Server: Add order._id to User.orders array]
          ↓
[Server: Clear User.cart array]
          ↓
[Server: Return {order} with confirmation]
          ↓
[Frontend: Show success with Order ID]
          ↓
[Frontend: Close modal]
          ↓
[Frontend: Update cart badge to 0]


CANCEL ORDER:
────────────

[User clicks "Cancel" on pending order]
          ↓
[Send: PUT /api/orders/{orderId}/cancel]
Headers: Authorization: Bearer {token}
          ↓
[Server: Find order and verify user owns it]
          ↓
[Server: Check if status = 'pending']
    ├─ NO → Error: Cannot cancel non-pending orders
    └─ YES ↓
     [Server: Set status = 'cancelled']
          ↓
     [Server: Save order]
          ↓
     [Response: Updated order sent]
          ↓
     [Frontend: Update order list]
```

---

## API Request/Response Flow

```
┌──────────────────────────────────────────────────────────────────┐
│              API COMMUNICATION FLOW                               │
└──────────────────────────────────────────────────────────────────┘

FRONTEND (Browser)        BACKEND (Express)      DATABASE (MongoDB)
        │                        │                       │
        │─ POST /auth/register →│                       │
        │                        │─ Validate input ─→   │
        │                        │                       │
        │                        │← Check email exists ←│
        │                        │ Hash password         │
        │                        │─ Create user ───────→│
        │                        │                       │
        │                        │← Get user created ←──│
        │                        │ Generate JWT         │
        │← {token, user} ────────│                       │
        │ Store in localStorage  │                       │
        │                        │                       │
        │─ POST /api/cart/add ──→│                       │
        │ Header: Bearer token   │                       │
        │                        │─ Verify token ─→    │
        │                        │                       │
        │                        │← Token valid ────────│
        │                        │─ Find user ────────→│
        │                        │                       │
        │                        │← User found ────────│
        │                        │ Add item to cart      │
        │                        │─ Update user ──────→│
        │                        │                       │
        │                        │← Saved ────────────│
        │← {updatedCart} ────────│                       │
        │ Update UI              │                       │
        │ Show success msg       │                       │
        │                        │                       │
        │─ POST /orders/create ─→│                       │
        │ Header: Bearer token   │                       │
        │                        │─ Verify token ─→    │
        │                        │                       │
        │                        │← Token valid ────────│
        │                        │─ Get user & items ──→│
        │                        │                       │
        │                        │← Cart items ────────│
        │                        │─ Create Order ────→│
        │                        │                       │
        │                        │← Order created ────│
        │                        │─ Clear cart ───────→│
        │                        │                       │
        │← {orderId, success} ───│                       │
        │ Close modal            │                       │
        │ Reset cart badge       │                       │
```

---

## Security Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    SECURITY FLOW                                  │
└──────────────────────────────────────────────────────────────────┘

PASSWORD HASHING:
────────────────

[User registers with password]
            ↓
[Server receives password]
            ↓
[Before saving to DB:]
  [bcryptjs.hash(password, 8 salt rounds)]
            ↓
[Original password deleted from memory]
            ↓
[Only hashed password stored in MongoDB]
            ↓
[Password NEVER sent back in API responses]


LOGIN VERIFICATION:
──────────────────

[User enters password]
        ↓
[Server finds user by email]
        ↓
[bcryptjs.compare(entered_password, hashed_stored_password)]
        ↓
  ┌─────┴─────┐
  ↓           ↓
[MATCH]   [NO MATCH]
  ↓           ↓
[Generate] [Error: Invalid credentials]
 JWT Token


JWT TOKEN FLOW:
──────────────

[After login/register]
        ↓
[Generate JWT token with:]
  ├─ payload: {userId, email}
  ├─ secret: process.env.JWT_SECRET
  └─ expiry: 7 days
        ↓
[Send token to frontend]
        ↓
[Store in localStorage]
        ↓
[Included in all subsequent requests:]
  Header: Authorization: Bearer {token}
        ↓
[Server middleware verifies token:]
  ├─ Check token exists
  ├─ Check signature matches secret
  ├─ Check not expired
  └─ Extract user data
        ↓
  ┌──────┴──────┐
  ↓             ↓
[Valid]    [Invalid/Expired]
  ↓             ↓
[Allow]     [Reject: 401 Unauthorized]
Request       User must re-login


AUTHORIZATION FLOW:
──────────────────

[Protected route accessed]
        ↓
[Check user.role]
  ├─ 'user': Can access user routes
  ├─ 'admin': Can access admin routes
  └─ (other): Forbidden
        ↓
  ┌──────┴──────┐
  ↓             ↓
[Allowed]   [Forbidden: 403]
  ↓             ↓
[Process]   [Return error]
```

---

## Modal State Management

```
┌──────────────────────────────────────────────────────────────────┐
│                 MODAL STATE MANAGEMENT                            │
└──────────────────────────────────────────────────────────────────┘

CLOSED STATE:
───────────
modalsContainer.innerHTML = ''
(Empty div - no modal visible)


OPEN LOGIN MODAL:
────────────────
[User clicks user icon or "Add to Cart" without login]
        ↓
[showLoginModal() function called]
        ↓
[Generate HTML for login form]
        ↓
[Insert into modalsContainer]
        ↓
[Modal visible with:]
  ├─ Close button (X)
  ├─ Email input
  ├─ Password input
  ├─ Login button
  └─ "Register" link


OPEN REGISTER MODAL:
───────────────────
[User clicks "Register" link in login modal]
        ↓
[showRegisterModal() function called]
        ↓
[Generate HTML for register form]
        ↓
[Replace previous modal in container]
        ↓
[Modal visible with:]
  ├─ Close button (X)
  ├─ Username input
  ├─ Email input
  ├─ Password input
  ├─ Confirm password input
  ├─ Register button
  └─ "Login" link


OPEN CART MODAL:
────────────────
[User clicks cart icon]
        ↓
[Check if logged in]
    ├─ NO → Open login modal
    └─ YES ↓
   [showCartModal() called]
        ↓
   [Generate cart modal HTML]
        ↓
   [Insert into container]
        ↓
   [Call loadCart() to fetch cart data]
        ↓
   [Display items dynamically]
        ↓
   [Modal visible with:]
     ├─ Cart items list
     ├─ +/- quantity buttons
     ├─ Remove buttons
     ├─ Total price
     └─ Checkout button


OPEN CHECKOUT MODAL:
────────────────────
[User clicks "Proceed to Checkout"]
        ↓
[showCheckoutModal() called]
        ↓
[Generate checkout form HTML]
        ↓
[Replace cart modal in container]
        ↓
[Modal visible with:]
  ├─ Delivery address field
  ├─ Phone number field
  ├─ Payment method dropdown
  └─ Place Order button


CLOSE MODAL:
───────────
[User clicks X button]
        ↓
[.close onclick listener triggered]
        ↓
[modalsContainer.innerHTML = '']
        ↓
[Modal removed from view]

OR

[User clicks outside modal background]
        ↓
[window.onclick listener triggered]
        ↓
[modalsContainer.innerHTML = '']
        ↓
[Modal removed from view]


MODAL SWITCHING:
────────────────
[Within modal] ← [Link to another modal]
        ↓
[showNewModal() function called]
        ↓
[Old modal replaced by new one]
        ↓
[User sees new modal instantly]
```

---

These diagrams show:
1. ✅ Complete user journey from visiting to order tracking
2. ✅ Authentication flow with password hashing
3. ✅ Database structure and relationships
4. ✅ Cart and order processing pipeline
5. ✅ API request/response communication
6. ✅ Security implementation details
7. ✅ Modal state management and switching

All features are integrated and working together! 🎉
