// ========== CONFIGURATION ==========
const API_BASE = 'http://localhost:5000/api';
let currentUser = null;
let userToken = localStorage.getItem('userToken');

// ========== MENU TOGGLE ==========
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }
};

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut();

// ========== AUTHENTICATION MODALS ==========
function showModal(htmlContent) {
  let container = document.getElementById('modalsContainer');
  let modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = htmlContent;
  container.innerHTML = '';
  container.appendChild(modal);

  let closeBtn = modal.querySelector('.close');
  if (closeBtn) {
    closeBtn.onclick = () => container.innerHTML = '';
  }
  window.onclick = (event) => {
    if (event.target == modal) container.innerHTML = '';
  };
}

function showLoginModal() {
  const html = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Login</h2>
      <form id="loginForm">
        <input type="email" id="loginEmail" placeholder="Email" required>
        <input type="password" id="loginPassword" placeholder="Password" required>
        <button type="submit" class="btn">Login</button>
        <p>Don't have an account? <a onclick="showRegisterModal()" style="color: var(--red); cursor: pointer;">Register</a></p>
      </form>
    </div>
  `;
  showModal(html);

  document.getElementById('loginForm').onsubmit = handleLogin;
}

function showRegisterModal() {
  const html = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Register</h2>
      <form id="registerForm">
        <input type="text" id="regUsername" placeholder="Username" required>
        <input type="email" id="regEmail" placeholder="Email" required>
        <input type="password" id="regPassword" placeholder="Password (min 6 chars)" required>
        <input type="password" id="regConfirmPassword" placeholder="Confirm Password" required>
        <button type="submit" class="btn">Register</button>
        <p>Already have an account? <a onclick="showLoginModal()" style="color: var(--red); cursor: pointer;">Login</a></p>
      </form>
    </div>
  `;
  showModal(html);

  document.getElementById('registerForm').onsubmit = handleRegister;
}

function showProfileModal() {
  const html = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Profile</h2>
      <div class="profile-info">
        <p><strong>Username:</strong> ${currentUser.username}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Role:</strong> ${currentUser.role}</p>
      </div>
      <div class="profile-actions">
        <button class="btn" onclick="showOrdersModal()">View Orders</button>
        <button class="btn" onclick="handleLogout()">Logout</button>
      </div>
    </div>
  `;
  showModal(html);
}

function showCartModal() {
  if (!userToken) {
    alert('Please login first to view cart');
    showLoginModal();
    return;
  }

  const html = `
    <div class="modal-content cart-modal">
      <span class="close">&times;</span>
      <h2>Shopping Cart</h2>
      <div id="cartItems"></div>
      <div class="cart-summary">
        <h3>Total: ₹<span id="cartTotal">0</span></h3>
      </div>
      <button class="btn" onclick="showCheckoutModal()">Proceed to Checkout</button>
    </div>
  `;
  showModal(html);
  loadCart();
}

function showCheckoutModal() {
  const html = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Checkout</h2>
      <form id="checkoutForm">
        <input type="text" id="address" placeholder="Delivery Address" required>
        <input type="tel" id="phone" placeholder="Phone Number" required>
        <select id="paymentMethod" required>
          <option value="">Select Payment Method</option>
          <option value="cash">Cash on Delivery</option>
          <option value="card">Card Payment</option>
          <option value="upi">UPI Payment</option>
        </select>
        <button type="submit" class="btn">Place Order</button>
      </form>
    </div>
  `;
  showModal(html);

  document.getElementById('checkoutForm').onsubmit = handleCheckout;
}

function showOrdersModal() {
  const html = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Your Orders</h2>
      <div id="ordersList"></div>
    </div>
  `;
  showModal(html);
  loadOrders();
}

// ========== AUTH FUNCTIONS ==========
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      userToken = data.token;
      localStorage.setItem('userToken', userToken);
      currentUser = data.user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateAuthUI();
      document.getElementById('modalsContainer').innerHTML = '';
      alert('Login successful!');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword })
    });

    const data = await response.json();
    console.log('Register response:', response.status, data);

    if (response.ok) {
      userToken = data.token;
      localStorage.setItem('userToken', userToken);
      currentUser = data.user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateAuthUI();
      document.getElementById('modalsContainer').innerHTML = '';
      alert('Registration successful!');
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Register error:', error);
    alert('Error: ' + error.message);
  }
}

function handleLogout() {
  userToken = null;
  currentUser = null;
  localStorage.removeItem('userToken');
  localStorage.removeItem('currentUser');
  updateAuthUI();
  document.getElementById('modalsContainer').innerHTML = '';
  alert('Logged out successfully');
}

function updateAuthUI() {
  const authBtn = document.getElementById('authBtn');
  if (userToken && currentUser) {
    authBtn.innerHTML = `<i class="fas fa-user"></i> <span>${currentUser.username}</span>`;
    authBtn.onclick = showProfileModal;
  } else {
    authBtn.innerHTML = '<i class="fas fa-user"></i>';
    authBtn.onclick = showLoginModal;
  }
}

// ========== CART FUNCTIONS ==========
async function addToCart(foodName, price, image) {
  if (!userToken) {
    alert('Please login first');
    showLoginModal();
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        foodId: Date.now(),
        name: foodName,
        price: parseInt(price),
        image: image,
        category: 'food'
      })
    });

    const data = await response.json();

    if (response.ok) {
      updateCartCount();
      alert('Item added to cart!');
    } else {
      alert(data.message || 'Failed to add item');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding to cart');
  }
}

async function loadCart() {
  if (!userToken) return;

  try {
    const response = await fetch(`${API_BASE}/cart/`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    const data = await response.json();
    const cartContainer = document.getElementById('cartItems');
    let total = 0;

    if (data.cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty</p>';
      document.getElementById('cartTotal').textContent = '0';
      return;
    }

    let html = '<div class="cart-list">';
    data.cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      html += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>₹${item.price} x ${item.quantity} = ₹${subtotal}</p>
          </div>
          <div class="cart-item-actions">
            <button class="btn-small" onclick="updateQuantity('${item.foodId}', ${item.quantity - 1})">-</button>
            <button class="btn-small" onclick="updateQuantity('${item.foodId}', ${item.quantity + 1})">+</button>
            <button class="btn-small btn-danger" onclick="removeFromCart('${item.foodId}')">Remove</button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    cartContainer.innerHTML = html;
    document.getElementById('cartTotal').textContent = total;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateQuantity(foodId, quantity) {
  if (quantity <= 0) {
    removeFromCart(foodId);
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/cart/update/${foodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ quantity })
    });

    if (response.ok) {
      loadCart();
      updateCartCount();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function removeFromCart(foodId) {
  try {
    const response = await fetch(`${API_BASE}/cart/remove/${foodId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    if (response.ok) {
      loadCart();
      updateCartCount();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateCartCount() {
  if (!userToken) {
    document.getElementById('cartCount').textContent = '0';
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/cart/`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    const data = await response.json();
    document.getElementById('cartCount').textContent = data.totalItems || 0;
  } catch (error) {
    console.error('Error:', error);
  }
}

// ========== CHECKOUT & ORDERS ==========
async function handleCheckout(e) {
  e.preventDefault();
  
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const paymentMethod = document.getElementById('paymentMethod').value;

  try {
    const response = await fetch(`${API_BASE}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        deliveryAddress: address,
        phoneNumber: phone,
        paymentMethod: paymentMethod
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Order placed successfully! Order ID: ${data.order.orderId}`);
      document.getElementById('modalsContainer').innerHTML = '';
      updateCartCount();
    } else {
      alert(data.message || 'Failed to place order');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error placing order');
  }
}

async function loadOrders() {
  if (!userToken) return;

  try {
    const response = await fetch(`${API_BASE}/orders/my-orders`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    const data = await response.json();
    const ordersList = document.getElementById('ordersList');

    if (data.orders.length === 0) {
      ordersList.innerHTML = '<p>No orders yet</p>';
      return;
    }

    let html = '<div class="orders-list">';
    data.orders.forEach(order => {
      html += `
        <div class="order-card">
          <h3>Order ID: ${order.orderId}</h3>
          <p><strong>Total:</strong> ₹${order.totalAmount}</p>
          <p><strong>Status:</strong> <span class="status-${order.status}">${order.status}</span></p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Items:</strong> ${order.items.length}</p>
        </div>
      `;
    });
    html += '</div>';
    ordersList.innerHTML = html;
  } catch (error) {
    console.error('Error:', error);
  }
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  // Restore user session
  const savedToken = localStorage.getItem('userToken');
  const savedUser = localStorage.getItem('currentUser');
  if (savedToken && savedUser) {
    userToken = savedToken;
    currentUser = JSON.parse(savedUser);
  }

  updateAuthUI();
  updateCartCount();

  // Add to cart button listeners
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const food = btn.getAttribute('data-food');
      const price = btn.getAttribute('data-price');
      const image = btn.getAttribute('data-image');
      addToCart(food, price, image);
    });
  });

  // Cart button listener
  if (document.getElementById('cartBtn')) {
    document.getElementById('cartBtn').addEventListener('click', showCartModal);
  }
  if (document.getElementById('authBtn')) {
    document.getElementById('authBtn').addEventListener('click', (e) => {
      e.preventDefault();
      if (userToken) {
        showProfileModal();
      } else {
        showLoginModal();
      }
    });
  }
});