# Food Website API Testing Guide

## Overview
This guide shows how to test all API endpoints using any HTTP client (Postman, Insomnia, or curl).

## Base URL
```
http://localhost:5000/api
```

## Testing Steps

### 1. REGISTRATION & LOGIN

#### Register New User
**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (Success):**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Save the token for all subsequent requests!**

---

#### Login User
**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

#### Get User Profile
**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "cart": [],
    "orders": []
  }
}
```

---

### 2. CART OPERATIONS

#### Get Cart
**Endpoint:** `GET /cart/`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "cart": [
    {
      "foodId": "1634567890000",
      "name": "Tasty Burger",
      "price": 150,
      "image": "images/p-1.jpg",
      "quantity": 2
    }
  ],
  "totalPrice": 300,
  "totalItems": 2
}
```

---

#### Add Item to Cart
**Endpoint:** `POST /cart/add`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request:**
```json
{
  "foodId": "1634567890000",
  "name": "Tasty Burger",
  "price": 150,
  "image": "images/p-1.jpg",
  "category": "food"
}
```

**Response:**
```json
{
  "message": "Item added to cart",
  "cart": {
    "items": [
      {
        "foodId": "1634567890000",
        "name": "Tasty Burger",
        "price": 150,
        "image": "images/p-1.jpg",
        "quantity": 1
      }
    ],
    "totalPrice": 150,
    "totalItems": 1
  }
}
```

---

#### Update Item Quantity
**Endpoint:** `PUT /cart/update/1634567890000`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request:**
```json
{
  "quantity": 3
}
```

**Response:**
```json
{
  "message": "Quantity updated",
  "cart": {
    "items": [
      {
        "foodId": "1634567890000",
        "name": "Tasty Burger",
        "price": 150,
        "image": "images/p-1.jpg",
        "quantity": 3
      }
    ],
    "totalPrice": 450,
    "totalItems": 3
  }
}
```

---

#### Remove Item from Cart
**Endpoint:** `DELETE /cart/remove/1634567890000`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "message": "Item removed from cart",
  "cart": {
    "items": [],
    "totalPrice": 0,
    "totalItems": 0
  }
}
```

---

#### Clear Entire Cart
**Endpoint:** `DELETE /cart/clear`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "message": "Cart cleared",
  "cart": {
    "items": [],
    "totalPrice": 0,
    "totalItems": 0
  }
}
```

---

### 3. ORDER OPERATIONS

#### Create Order from Cart
**Endpoint:** `POST /orders/create`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request:**
```json
{
  "deliveryAddress": "123 Main Street, Apt 4B, New York, NY 10001",
  "phoneNumber": "9876543210",
  "paymentMethod": "cash"
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439012",
    "orderId": "ORD-1634567890-507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "foodId": "1634567890000",
        "name": "Tasty Burger",
        "price": 150,
        "quantity": 2
      }
    ],
    "totalAmount": 300,
    "deliveryAddress": "123 Main Street, Apt 4B, New York, NY 10001",
    "phoneNumber": "9876543210",
    "paymentMethod": "cash",
    "paymentStatus": "pending",
    "status": "pending",
    "createdAt": "2023-10-19T10:30:00.000Z"
  }
}
```

**Note:** Cart is automatically cleared after order creation.

---

#### Get User's Orders
**Endpoint:** `GET /orders/my-orders`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "orderId": "ORD-1634567890-507f1f77bcf86cd799439011",
      "items": [
        {
          "foodId": "1634567890000",
          "name": "Tasty Burger",
          "price": 150,
          "quantity": 2
        }
      ],
      "totalAmount": 300,
      "status": "pending",
      "createdAt": "2023-10-19T10:30:00.000Z"
    }
  ]
}
```

---

#### Get Specific Order
**Endpoint:** `GET /orders/ORD-1634567890-507f1f77bcf86cd799439011`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439012",
    "orderId": "ORD-1634567890-507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "totalAmount": 300,
    "deliveryAddress": "123 Main Street, Apt 4B, New York, NY 10001",
    "phoneNumber": "9876543210",
    "paymentMethod": "cash",
    "paymentStatus": "pending",
    "status": "pending",
    "createdAt": "2023-10-19T10:30:00.000Z"
  }
}
```

---

#### Cancel Order (Only if status is 'pending')
**Endpoint:** `PUT /orders/ORD-1634567890-507f1f77bcf86cd799439011/cancel`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "message": "Order cancelled successfully",
  "order": {
    "orderId": "ORD-1634567890-507f1f77bcf86cd799439011",
    "status": "cancelled"
  }
}
```

---

### 4. ADMIN OPERATIONS (Requires role: 'admin')

#### Get All Orders
**Endpoint:** `GET /orders/admin/all-orders`

**Headers:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
```

**Response:**
```json
{
  "orders": [
    {
      "orderId": "ORD-1634567890-507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439011",
      "totalAmount": 300,
      "status": "pending",
      "createdAt": "2023-10-19T10:30:00.000Z"
    }
  ]
}
```

---

#### Update Order Status (Admin Only)
**Endpoint:** `PUT /orders/admin/ORD-1634567890-507f1f77bcf86cd799439011/status`

**Headers:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
Content-Type: application/json
```

**Request:**
```json
{
  "status": "confirmed"
}
```

**Valid status values:**
- `pending` - Order received
- `confirmed` - Order confirmed
- `preparing` - Being prepared
- `out for delivery` - On the way
- `delivered` - Order delivered
- `cancelled` - Order cancelled

**Response:**
```json
{
  "message": "Order status updated",
  "order": {
    "orderId": "ORD-1634567890-507f1f77bcf86cd799439011",
    "status": "confirmed"
  }
}
```

---

## Testing Workflow

### Complete User Journey Test

1. **Register**
   - POST `/auth/register` → Get token

2. **Add Items to Cart**
   - POST `/cart/add` (Item 1)
   - POST `/cart/add` (Item 2)
   - GET `/cart/` → Verify items

3. **View Cart**
   - GET `/cart/` → Should show 2 items

4. **Modify Cart**
   - PUT `/cart/update/{foodId}` → Change quantity
   - GET `/cart/` → Verify update

5. **Create Order**
   - POST `/orders/create` → Place order
   - Get Order ID from response

6. **Check Orders**
   - GET `/orders/my-orders` → See order in list
   - GET `/orders/{orderId}` → See order details

7. **Verify Cart Cleared**
   - GET `/cart/` → Should be empty

8. **Admin Updates (if admin user)**
   - PUT `/orders/admin/{orderId}/status` → Update to "confirmed"

---

## Common Test Cases

### Test Case 1: Empty Cart Order
- Create empty order
- **Expected Result:** Error (cart cannot be empty)

### Test Case 2: Duplicate Login
- Register user twice with same email
- **Expected Result:** Error (user already exists)

### Test Case 3: Wrong Password
- Login with correct email, wrong password
- **Expected Result:** Error (invalid credentials)

### Test Case 4: Unauthorized Access
- Try to cancel delivered order
- **Expected Result:** Error (cannot cancel non-pending orders)

### Test Case 5: Invalid Token
- Use invalid/expired token in header
- **Expected Result:** 401 Unauthorized error

---

## Using curl for Testing

### Register with curl
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
    confirmPassword = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $body
```

### Add to Cart with curl
```powershell
$body = @{
    foodId = "1634567890000"
    name = "Tasty Burger"
    price = 150
    image = "images/p-1.jpg"
    category = "food"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/cart/add" `
  -Method POST `
  -Headers @{
      "Content-Type" = "application/json"
      "Authorization" = "Bearer YOUR_TOKEN_HERE"
  } `
  -Body $body
```

---

## Debugging Tips

1. **Check Server Console**
   - Look for logs when requests are made
   - Errors will be printed to console

2. **Use Browser DevTools**
   - Network tab to see requests/responses
   - Console for JavaScript errors

3. **Verify Token Format**
   - Token should start with "Bearer "
   - Example: `Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`

4. **Check MongoDB Connection**
   - If database errors appear, verify MongoDB is running
   - Check connection string in .env file

5. **Enable CORS**
   - Requests should work if server CORS is configured
   - Already enabled in server.js for all origins

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (not admin) |
| 404 | Not Found (resource doesn't exist) |
| 500 | Server Error |

---

## Notes

- All timestamps are in ISO 8601 format
- Prices are in INR (₹)
- Token expires after 7 days
- Passwords are automatically hashed (never sent back in response)
- Cart is stored per user in the User document
- Orders are permanent records and cannot be deleted, only cancelled
