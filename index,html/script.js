/* ============================================================
   HF MOBILE CARE — script.js
   ============================================================ */
"use strict";

/* ---------- CONFIG (editable) ---------- */
const WHATSAPP_NUMBER = "94770000000"; // WhatsApp number (country code, no +)

/* ---------- DATA ---------- */
const CATEGORIES = [
  { id: "phones",      name: "Mobile Phones",           count: 12, img: "assets/phone.jpg" },
  { id: "cases",       name: "Phone Cases & Covers",    count: 25, img: "assets/case.jpg" },
  { id: "charging",    name: "Chargers & Cables",       count: 30, img: "assets/charger.jpg" },
  { id: "audio",       name: "Earphones & Headphones",  count: 22, img: "assets/headphones.jpg" },
  { id: "power",       name: "Power Banks",             count: 14, img: "assets/powerbank.jpg" },
  { id: "protectors",  name: "Screen Protectors",       count: 18, img: "assets/glass.jpg" },
  { id: "wearables",   name: "Smart Watches",           count: 9,  img: "assets/watch.jpg" },
  { id: "speakers",    name: "Bluetooth Speakers",      count: 11, img: "assets/speaker.jpg" },
  { id: "holders",     name: "Mobile Holders",          count: 8,  img: "assets/holder.jpg" },
  { id: "others",      name: "Other Accessories",       count: 16, img: "assets/flatlay.jpg" },
];

const PRODUCTS = [
  { id: 1,  name: "Wireless Bluetooth Earbuds Pro", cat: "audio",     price: 8500,  oldPrice: 12500, rating: 4.8, reviews: 124, img: "assets/earbuds.jpg",
    desc: "True wireless earbuds with deep bass, crystal-clear calls, touch controls and 24-hour total battery life with charging case." },
  { id: 2,  name: "Fast Charging Adapter 25W",      cat: "charging",  price: 3200,  oldPrice: 4500,  rating: 4.7, reviews: 210, img: "assets/charger.jpg",
    desc: "Super-fast 25W PD adapter with USB-C output. Charges compatible devices from 0 to 50% in under 30 minutes." },
  { id: 3,  name: "USB Type-C Braided Cable 1M",    cat: "charging",  price: 1450,  oldPrice: 2200,  rating: 4.6, reviews: 342, img: "assets/cable.jpg",
    desc: "Premium nylon-braided Type-C cable. Supports fast charging and high-speed data transfer. Built to last 30,000+ bends." },
  { id: 4,  name: "Premium Leather Phone Case",     cat: "cases",     price: 2900,  oldPrice: 4200,  rating: 4.9, reviews: 98,  img: "assets/case.jpg",
    desc: "Luxury gold-plated leather case with shockproof protection, raised edges for the camera and a soft microfiber lining." },
  { id: 5,  name: "10000mAh Power Bank",            cat: "power",     price: 5400,  oldPrice: 7500,  rating: 4.7, reviews: 187, img: "assets/powerbank.jpg",
    desc: "Slim 10000mAh power bank with dual USB output, LED indicator and fast charging support. Charge your phone 2-3 times." },
  { id: 6,  name: "9H Tempered Glass Protector",    cat: "protectors",price: 950,   oldPrice: 1600,  rating: 4.5, reviews: 460, img: "assets/glass.jpg",
    desc: "Ultra-clear 9H hardness tempered glass. Oleophobic coating resists fingerprints, scratches and smudges. Easy installation." },
  { id: 7,  name: "Smart Watch Series Gold",        cat: "wearables", price: 12500, oldPrice: 18000, rating: 4.8, reviews: 76,  img: "assets/watch.jpg",
    desc: "Elegant smart watch with heart-rate monitor, sleep tracking, notifications and a premium gold-finish case. 7-day battery." },
  { id: 8,  name: "Bluetooth Speaker Mini Gold",    cat: "speakers",  price: 4800,  oldPrice: 6900,  rating: 4.6, reviews: 154, img: "assets/speaker.jpg",
    desc: "Compact Bluetooth speaker with rich 360° sound, deep bass, 10-hour playtime and a stunning gold metallic finish." },
  { id: 9,  name: "Wireless Charging Pad 15W",      cat: "charging",  price: 3900,  oldPrice: 5600,  rating: 4.7, reviews: 132, img: "assets/wcharger.jpg",
    desc: "Slim Qi-certified 15W wireless charging pad. Non-slip surface, over-charge protection and case-friendly design." },
  { id: 10, name: "Adjustable Mobile Phone Holder", cat: "holders",   price: 1850,  oldPrice: 2800,  rating: 4.5, reviews: 203, img: "assets/holder.jpg",
    desc: "360° rotatable aluminium desk stand for phones and tablets. Foldable, sturdy and perfect for desks and travel." },
];

const NEW_ARRIVALS = [
  { id: 11, name: "Studio Wireless Headphones",     cat: "audio",     price: 15800, oldPrice: 21500, rating: 4.9, reviews: 67,  img: "assets/headphones2.jpg", isNew: true,
    desc: "Over-ear wireless headphones with active noise cancelling, 40-hour battery and plush memory-foam cushions." },
  { id: 12, name: "Bass Wired Earphones with Mic",  cat: "audio",     price: 1150,  oldPrice: 1800,  rating: 4.4, reviews: 289, img: "assets/wired.jpg", isNew: true,
    desc: "Tangle-free wired earphones with powerful bass, inline microphone and universal 3.5mm jack." },
  { id: 13, name: "25000mAh Laptop Power Bank",     cat: "power",     price: 14900, oldPrice: 19500, rating: 4.8, reviews: 54,  img: "assets/powerbank2.jpg", isNew: true,
    desc: "Massive 25000mAh capacity with 140W USB-C output. Charges laptops, phones and tablets on the go." },
  { id: 14, name: "Retro Bluetooth Boombox",        cat: "speakers",  price: 8900,  oldPrice: 12400, rating: 4.7, reviews: 88,  img: "assets/speaker2.jpg", isNew: true,
    desc: "Vintage-style boombox speaker with 60W stereo sound, RGB lighting, carry handle and 13-hour battery life." },
  { id: 15, name: "Luxury Wallet Case with Strap",  cat: "cases",     price: 3600,  oldPrice: 5100,  rating: 4.6, reviews: 112, img: "assets/case2.jpg", isNew: true,
    desc: "Premium wallet case with card slots, crossbody strap and ring holder. Full 360° protection with a touch of luxury." },
];

const ALL_PRODUCTS = [...PRODUCTS, ...NEW_ARRIVALS];

/* ---------- HELPERS ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const LKR = n => "LKR " + n.toLocaleString("en-US");
const CAT_NAME = id => (CATEGORIES.find(c => c.id === id) || {}).name || id;

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  let s = "";
  for (let i = 0; i < full; i++) s += '<i class="fa-solid fa-star"></i>';
  if (half) s += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) s += '<i class="fa-regular fa-star"></i>';
  return s;
}
function discount(p) { return Math.round((1 - p.price / p.oldPrice) * 100); }

/* ---------- CART (localStorage) ---------- */
let cart = JSON.parse(localStorage.getItem("hf_cart") || "[]");

function saveCart() { localStorage.setItem("hf_cart", JSON.stringify(cart)); }
function cartQty() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartTotal() { return cart.reduce((s, i) => s + i.qty * i.price, 0); }

function addToCart(id, qty = 1) {
  const p = ALL_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const item = cart.find(x => x.id === id);
  if (item) item.qty += qty;
  else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty });
  saveCart();
  renderCart();
  showToast(`${p.name} added to cart!`);
  const cc = $("#cartCount");
  cc.classList.remove("pop"); void cc.offsetWidth; cc.classList.add("pop");
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart(); renderCart();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart(); renderCart();
}

function clearCart() {
  cart = [];
  saveCart(); renderCart();
}

function renderCart() {
  const count = cartQty();
  $("#cartCount").textContent = count;
  $("#cartCountBadge").textContent = count;
  $("#cartSubtotal").textContent = LKR(cartTotal());
  $("#cartTotal").textContent = LKR(cartTotal());

  const box = $("#cartItems");
  if (!cart.length) {
    box.innerHTML = `<div class="cart-empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty.</p>
        <p style="font-size:0.8rem; margin-top:6px;">Add some golden deals!</p>
      </div>`;
    return;
  }
  box.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}">
      <div class="ci-info">
        <h4>${i.name}</h4>
        <span class="ci-price">${LKR(i.price)}</span>
        <div class="qty-row">
          <button class="qty-btn" onclick="changeQty(${i.id}, -1)" aria-label="Decrease">−</button>
          <span class="qty-val">${i.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i.id}, 1)" aria-label="Increase">+</button>
        </div>
      </div>
      <button class="ci-remove" onclick="removeItem(${i.id})" aria-label="Remove"><i class="fa-solid fa-trash"></i></button>
    </div>`).join("");
}

/* ---------- RENDER: CATEGORIES ---------- */
function renderCategories() {
  $("#catGrid").innerHTML = CATEGORIES.map(c => `
    <div class="cat-card reveal" onclick="filterFromCategory('${c.id}')">
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <div class="cat-info">
        <h3>${c.name}</h3>
        <span>${c.count} items</span><i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>`).join("");
}

/* ---------- RENDER: PRODUCTS ---------- */
let activeFilter = "all";
let searchTerm = "";

function productCard(p) {
  return `
    <div class="product-card reveal visible" data-cat="${p.cat}">
      <div class="p-img-wrap">
        <span class="discount-badge">-${discount(p)}%</span>
        ${p.isNew ? '<span class="new-badge">NEW</span>' : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="p-body">
        <span class="p-cat">${CAT_NAME(p.cat)}</span>
        <h3 class="p-name">${p.name}</h3>
        <div class="p-rating">${stars(p.rating)}<span>${p.rating} (${p.reviews})</span></div>
        <div class="p-price-row">
          <span class="p-price">${LKR(p.price)}</span>
          <span class="p-old">${LKR(p.oldPrice)}</span>
        </div>
        <div class="p-actions">
          <button class="btn-gold" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i> Add</button>
          <button class="btn-outline" onclick="buyNow(${p.id})"><i class="fa-solid fa-bolt"></i> Buy Now</button>
          <button class="p-details-link" onclick="openProduct(${p.id})"><i class="fa-regular fa-eye"></i> View Details</button>
        </div>
      </div>
    </div>`;
}

function matches(p) {
  const okCat = activeFilter === "all" || p.cat === activeFilter;
  const okSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm);
  return okCat && okSearch;
}

function renderProducts() {
  const list = PRODUCTS.filter(matches);
  $("#productGrid").innerHTML = list.length
    ? list.map(productCard).join("")
    : `<p style="grid-column:1/-1;text-align:center;color:var(--grey);padding:40px 0;">
         <i class="fa-solid fa-magnifying-glass" style="color:var(--gold);margin-right:8px;"></i>No products found. Try another search.</p>`;
  $("#searchNote").textContent = searchTerm ? `Showing results for "${searchTerm}"` : "";
}

function renderNewArrivals() {
  $("#newGrid").innerHTML = NEW_ARRIVALS.filter(matches).map(productCard).join("");
}

function filterFromCategory(catId) {
  activeFilter = catId;
  $$(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.filter === catId));
  renderProducts();
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

function buyNow(id) { addToCart(id); openCart(); }

/* ---------- PRODUCT DETAILS MODAL ---------- */
function openProduct(id) {
  const p = ALL_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  $("#pmBody").innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <div>
      <span class="pm-cat">${CAT_NAME(p.cat)}</span>
      <h2>${p.name}</h2>
      <div class="p-rating">${stars(p.rating)}<span>${p.rating} · ${p.reviews} reviews</span></div>
      <p class="pm-desc">${p.desc}</p>
      <div class="pm-price-row">
        <span class="pm-price">${LKR(p.price)}</span>
        <span class="pm-old">${LKR(p.oldPrice)}</span>
        <span class="discount-badge" style="position:static;">-${discount(p)}%</span>
      </div>
      <div class="pm-actions">
        <button class="btn-gold" onclick="addToCart(${p.id}); closeModal('productModal');"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
        <button class="btn-whatsapp" onclick="orderSingleOnWhatsApp(${p.id})"><i class="fa-brands fa-whatsapp"></i> WhatsApp</button>
      </div>
    </div>`;
  openModal("productModal");
}

/* ---------- MODALS ---------- */
function openModal(id) {
  $("#" + id).classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  $("#" + id).classList.remove("show");
  document.body.style.overflow = "";
}
$$(".modal-overlay").forEach(m => {
  m.addEventListener("click", e => { if (e.target === m) closeModal(m.id); });
});
$$("[data-close]").forEach(b => b.addEventListener("click", () => closeModal(b.dataset.close)));

/* ---------- CART SIDEBAR ---------- */
function openCart() {
  $("#cartSidebar").classList.add("open");
  $("#cartOverlay").classList.add("show");
}
function closeCart() {
  $("#cartSidebar").classList.remove("open");
  $("#cartOverlay").classList.remove("show");
}
$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#cartOverlay").addEventListener("click", closeCart);
$("#clearCartBtn").addEventListener("click", clearCart);

/* ---------- CHECKOUT ---------- */
$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) { showToast("Your cart is empty!"); return; }
  closeCart();
  renderOrderSummary();
  $("#orderSuccess").classList.remove("show");
  openModal("checkoutModal");
});

function renderOrderSummary() {
  $("#orderSummary").innerHTML = `
    <h4><i class="fa-solid fa-receipt"></i> Order Summary</h4>
    ${cart.map(i => `<div class="os-item"><span>${i.name} × ${i.qty}</span><span>${LKR(i.price * i.qty)}</span></div>`).join("")}
    <div class="os-total"><span>Total</span><span>${LKR(cartTotal())}</span></div>`;
}

function validateForm(form) {
  let ok = true;
  $$(".form-group", form).forEach(g => {
    const input = $("input, textarea", g);
    if (!input || !input.required) return;
    const v = input.value.trim();
    let err = "";
    if (!v) err = "This field is required.";
    else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) err = "Enter a valid email.";
    else if (input.type === "tel" && !/^[0-9+\-\s()]{9,15}$/.test(v)) err = "Enter a valid phone number.";
    g.classList.toggle("error", !!err);
    $(".err-msg", g).textContent = err;
    if (err) ok = false;
  });
  return ok;
}

function orderMessage(details) {
  const lines = [
    "*NEW ORDER — HF MOBILE CARE*",
    "----------------------------",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
    `Address: ${details.address}`,
    `City: ${details.city}`,
    "----------------------------",
    "*Items:*",
    ...cart.map(i => `• ${i.name} × ${i.qty} — ${LKR(i.price * i.qty)}`),
    "----------------------------",
    `*TOTAL: ${LKR(cartTotal())}*`,
  ];
  return encodeURIComponent(lines.join("\n"));
}

$("#placeOrderBtn").addEventListener("click", () => {
  const form = $("#checkoutForm");
  if (!validateForm(form)) return;
  const d = {
    name: $("#coName").value.trim(), phone: $("#coPhone").value.trim(),
    email: $("#coEmail").value.trim(), address: $("#coAddress").value.trim(),
    city: $("#coCity").value.trim(),
  };
  // Save order locally (order history)
  const orders = JSON.parse(localStorage.getItem("hf_orders") || "[]");
  orders.push({ ...d, items: cart, total: cartTotal(), date: new Date().toISOString() });
  localStorage.setItem("hf_orders", JSON.stringify(orders));
  $("#orderSuccess").classList.add("show");
  clearCart();
  form.reset();
  setTimeout(() => closeModal("checkoutModal"), 2200);
});

$("#waOrderBtn").addEventListener("click", () => {
  const form = $("#checkoutForm");
  if (!validateForm(form)) return;
  const d = {
    name: $("#coName").value.trim(), phone: $("#coPhone").value.trim(),
    email: $("#coEmail").value.trim(), address: $("#coAddress").value.trim(),
    city: $("#coCity").value.trim(),
  };
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${orderMessage(d)}`, "_blank");
});

function orderSingleOnWhatsApp(id) {
  const p = ALL_PRODUCTS.find(x => x.id === id);
  const msg = encodeURIComponent(
    `*ORDER REQUEST — HF MOBILE CARE*\n\n• ${p.name}\nPrice: ${LKR(p.price)} (was ${LKR(p.oldPrice)})\n\nPlease confirm availability. Thank you!`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

/* ---------- SEARCH & FILTERS ---------- */
$("#searchBtn").addEventListener("click", doSearch);
$("#searchInput").addEventListener("input", e => { searchTerm = e.target.value.trim().toLowerCase(); renderProducts(); renderNewArrivals(); });
$("#searchInput").addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });
function doSearch() {
  searchTerm = $("#searchInput").value.trim().toLowerCase();
  renderProducts(); renderNewArrivals();
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

$$(".filter-btn").forEach(b => b.addEventListener("click", () => {
  activeFilter = b.dataset.filter;
  $$(".filter-btn").forEach(x => x.classList.toggle("active", x === b));
  renderProducts();
}));

/* ---------- CONTACT FORM ---------- */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!validateForm(e.target)) return;
  e.target.reset();
  $$(".form-group", e.target).forEach(g => g.classList.remove("error"));
  $("#contactSuccess").classList.add("show");
  setTimeout(() => $("#contactSuccess").classList.remove("show"), 4000);
});

/* ---------- LOGIN ---------- */
$("#loginBtn").addEventListener("click", () => openModal("loginModal"));
$("#loginForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!validateForm(e.target)) return;
  showToast("Login successful! Welcome back.");
  e.target.reset();
  closeModal("loginModal");
});

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg) {
  $("#toastMsg").textContent = msg;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2400);
}

/* ---------- COUNTDOWN ---------- */
const SALE_END = Date.now() + 1000 * 60 * 60 * 72; // 72-hour rolling countdown
function tickCountdown() {
  let diff = Math.max(0, SALE_END - Date.now());
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000);  diff %= 3600000;
  const m = Math.floor(diff / 60000);    diff %= 60000;
  const s = Math.floor(diff / 1000);
  $("#cdDays").textContent = String(d).padStart(2, "0");
  $("#cdHours").textContent = String(h).padStart(2, "0");
  $("#cdMins").textContent = String(m).padStart(2, "0");
  $("#cdSecs").textContent = String(s).padStart(2, "0");
}
setInterval(tickCountdown, 1000); tickCountdown();

/* ---------- NAV / SCROLL ---------- */
const navbar = $("#navbar");
const scrollTopBtn = $("#scrollTop");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  scrollTopBtn.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Hamburger menu
const hamburger = $("#hamburger"), navMenu = $("#navMenu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});
$$(".nav-link").forEach(l => l.addEventListener("click", () => {
  hamburger.classList.remove("open");
  navMenu.classList.remove("open");
}));

// Active nav link on scroll
const sections = $$("section[id]");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  $$(".nav-link").forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
}, { passive: true });

// Esc closes everything
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeCart();
    $$(".modal-overlay.show").forEach(m => closeModal(m.id));
  }
});

/* ---------- REVEAL ON SCROLL ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
function observeReveals() { $$(".reveal:not(.visible)").forEach(el => io.observe(el)); }

/* ---------- INIT ---------- */
renderCategories();
renderProducts();
renderNewArrivals();
renderCart();
observeReveals();
