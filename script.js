/* ==========================================================================
   GOLDEN CRUMB BAKERY — SHARED SCRIPT
   One JS file powers every page. Organized in clearly labeled sections.

   TABLE OF CONTENTS
   1.  Product Database (20+ products)
   2.  LocalStorage Helpers
   3.  Toast Notification System
   4.  Page Loader
   5.  Navbar (sticky, hamburger, active link, cart badge)
   6.  Dark Mode Toggle
   7.  Scroll To Top Button
   8.  Scroll Reveal Animations
   9.  Smooth Scroll (in-page anchors)
   10. Home Page: Featured Products / Best Sellers Render
   11. Menu Page: Render, Search, Filter, Sort
   12. Quick View Modal
   13. Wishlist Logic
   14. Product Details Page
   15. Cart Logic (add/remove/qty/totals/coupon)
   16. Checkout Logic (validation + place order)
   17. Orders Page (order history render)
   18. Sign Up / Sign In Validation
   19. Contact Form Validation
   20. Newsletter Form
   21. Init — runs the right functions per page on load
   ========================================================================== */


/* ==========================================================================
   1. PRODUCT DATABASE
   24 bakery products across 6 categories. This array is the single source
   of truth used by Home, Menu, Product Details, and Cart pages.
   ========================================================================== */

const PRODUCTS = [
  { id: 1,  name: "Belgian Dark Chocolate Cake",   category: "Cakes", img: "bakery 6.jpg",     price: 1850, oldPrice: 2100, rating: 4.9, badge: "Sale",       desc: "Layers of moist dark cocoa sponge filled with silky ganache and finished with a mirror chocolate glaze.", imgNote: "Belgian Dark Chocolate Cake Image" },
  { id: 2,  name: "Classic Red Velvet Cake",        category: "Cakes", img: "bakery 1.jpg",     price: 1650, oldPrice: null, rating: 4.8, badge: "Best Seller", desc: "Velvety red sponge layered with tangy cream cheese frosting — a timeless bakery favourite.", imgNote: "Red Velvet Cake Image" },
  { id: 3,  name: "Vanilla Bean Celebration Cake",  category: "Cakes", img: "bakery 2.jpg",     price: 1550, oldPrice: null, rating: 4.7, badge: null,          desc: "Fluffy Madagascar vanilla bean sponge with buttercream rosettes, perfect for any celebration.", imgNote: "Vanilla Celebration Cake Image" },
  { id: 4,  name: "Salted Caramel Drip Cake",       category: "Cakes", img: "bakery 3.jpg",     price: 1950, oldPrice: null, rating: 4.9, badge: "New",         desc: "Caramel-soaked sponge with a glossy salted caramel drip and toasted pecan crown.", imgNote: "Salted Caramel Drip Cake Image" },
  { id: 5,  name: "Butter Croissant",               category: "Pastries", img: "bakery 4.jpg", price: 220,  oldPrice: null, rating: 4.8, badge: "Best Seller", desc: "Laminated 27 times for a golden, flaky shell and a soft buttery crumb inside.", imgNote: "Butter Croissant Image" },
  { id: 6,  name: "Almond Croissant",                category: "Pastries", img: "bakery 5.jpg", price: 280,  oldPrice: null, rating: 4.7, badge: null,          desc: "A classic croissant filled with almond cream and topped with toasted almond flakes.", imgNote: "Almond Croissant Image" },
  { id: 7,  name: "Pain au Chocolat",                category: "Pastries", img: "bakery 7.jpg", price: 260,  oldPrice: 300,  rating: 4.8, badge: "Sale",        desc: "Buttery laminated pastry wrapped around two batons of dark chocolate.", imgNote: "Pain au Chocolat Image" },
  { id: 8,  name: "Apple Cinnamon Danish",           category: "Pastries", img: "bakery 8.jpg", price: 240,  oldPrice: null, rating: 4.6, badge: null,          desc: "Flaky danish pastry topped with cinnamon-spiced apple compote and a honey glaze.", imgNote: "Apple Cinnamon Danish Image" },
  { id: 9,  name: "Artisan Sourdough Loaf",          category: "Breads", img: "image 9.jpg",   price: 480,  oldPrice: null, rating: 4.9, badge: "Best Seller", desc: "72-hour cold-fermented sourdough with a crackling crust and open, airy crumb.", imgNote: "Sourdough Loaf Image" },
  { id: 10, name: "Whole Wheat Multigrain Bread",    category: "Breads", img: "image 9jpg.jpg",   price: 380,  oldPrice: null, rating: 4.5, badge: null,          desc: "A hearty loaf packed with oats, flaxseed, and sunflower seeds for everyday goodness.", imgNote: "Multigrain Bread Image" },
  { id: 11, name: "French Baguette",                 category: "Breads", img: "bakery 11.jpg",   price: 220,  oldPrice: null, rating: 4.7, badge: null,          desc: "Crisp golden crust with a light, airy interior — baked fresh every morning.", imgNote: "French Baguette Image" },
  { id: 12, name: "Garlic Herb Focaccia",            category: "Breads", img:  "image 12.jpg",   price: 420,  oldPrice: 480,  rating: 4.6, badge: "Sale",        desc: "Olive-oil rich focaccia topped with roasted garlic, rosemary, and sea salt.", imgNote: "Focaccia Bread Image" },
  { id: 13, name: "Classic Chocolate Chip Cookies",  category: "Cookies", img: "bakery 13.jpg",  price: 150,  oldPrice: null, rating: 4.8, badge: "Best Seller", desc: "Thick, chewy cookies loaded with premium Belgian chocolate chunks.", imgNote: "Chocolate Chip Cookies Image" },
  { id: 14, name: "Double Chocolate Fudge Cookies",  category: "Cookies", img: "bakery 14.jpg",  price: 170,  oldPrice: null, rating: 4.9, badge: null,          desc: "Fudgy cocoa cookies with molten chocolate centres — rich and decadent.", imgNote: "Double Chocolate Cookies Image" },
  { id: 15, name: "Oatmeal Raisin Cookies",          category: "Cookies", img: "bakery 15.jpg",  price: 140,  oldPrice: null, rating: 4.4, badge: null,          desc: "Wholesome rolled oats and plump raisins in a soft, chewy cookie.", imgNote: "Oatmeal Raisin Cookies Image" },
  { id: 16, name: "Pistachio Shortbread Cookies",    category: "Cookies", img: "bakery 16.jpg",  price: 190,  oldPrice: 220,  rating: 4.7, badge: "Sale",        desc: "Buttery shortbread studded with crushed pistachios and a delicate crumble.", imgNote: "Pistachio Shortbread Image" },
  { id: 17, name: "Red Velvet Cupcake",              category: "Cupcakes", img: "bakery 17.jpg", price: 180,  oldPrice: null, rating: 4.7, badge: null,          desc: "A single-serve red velvet cake topped with a swirl of cream cheese frosting.", imgNote: "Red Velvet Cupcake Image" },
  { id: 18, name: "Vanilla Buttercream Cupcake",     category: "Cupcakes", img: "bakery 18.jpg", price: 160,  oldPrice: null, rating: 4.6, badge: null,          desc: "Light vanilla sponge crowned with a generous swirl of buttercream.", imgNote: "Vanilla Cupcake Image" },
  { id: 19, name: "Lemon Zest Cupcake",              category: "Cupcakes", img: "bakery 19.jpg", price: 170,  oldPrice: null, rating: 4.5, badge: "New",         desc: "Zesty lemon sponge with a tangy lemon curd centre and citrus buttercream.", imgNote: "Lemon Cupcake Image" },
  { id: 20, name: "Nutella Swirl Cupcake",           category: "Cupcakes", img: "bakery 20.jpg", price: 200,  oldPrice: null, rating: 4.9, badge: "Best Seller", desc: "Hazelnut-cocoa sponge with a Nutella core and a glossy hazelnut swirl.", imgNote: "Nutella Cupcake Image" },
  { id: 21, name: "Classic Glazed Donut",            category: "Donuts", img:"bakery 21.jpg"  , price: 130,  oldPrice: null, rating: 4.6, badge: null,          desc: "Pillowy soft yeast donut dipped in a light vanilla glaze.", imgNote: "Glazed Donut Image" },
  { id: 22, name: "Chocolate Sprinkle Donut",        category: "Donuts", img: "bakery 22.jpg",   price: 150,  oldPrice: null, rating: 4.7, badge: "Best Seller", desc: "Rich chocolate glaze piled high with rainbow sprinkles.", imgNote: "Chocolate Sprinkle Donut Image" },
  { id: 23, name: "Strawberry Filled Donut",         category: "Donuts", img: "bakery 23.jpg",   price: 160,  oldPrice: 190,  rating: 4.5, badge: "Sale",        desc: "Soft donut generously filled with real strawberry compote.", imgNote: "Strawberry Filled Donut Image" },
  { id: 24, name: "Boston Cream Donut",              category: "Donuts", img: "bakery 24.jpg",   price: 170,  oldPrice: null, rating: 4.8, badge: "New",         desc: "Vanilla custard filled donut topped with a rich chocolate glaze.", imgNote: "Boston Cream Donut Image" }
];

const CATEGORIES = ["Cakes", "Pastries", "Breads", "Cookies", "Cupcakes", "Donuts"];

/* Valid coupon codes for the cart page */
const COUPONS = {
  "SWEET10":  0.10,
  "BAKERY20": 0.20,
  "WELCOME50": 0.05
};

const DELIVERY_CHARGE = 150;
const FREE_DELIVERY_THRESHOLD = 2000;


/* ==========================================================================
   2. LOCALSTORAGE HELPERS
   Small wrapper functions so every page reads/writes storage consistently.
   ========================================================================== */

function getCart() {
  return JSON.parse(localStorage.getItem("gc_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("gc_cart", JSON.stringify(cart));
  updateCartBadge();
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("gc_wishlist") || "[]");
}

function saveWishlist(list) {
  localStorage.setItem("gc_wishlist", JSON.stringify(list));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("gc_orders") || "[]");
}

function saveOrders(orders) {
  localStorage.setItem("gc_orders", JSON.stringify(orders));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("gc_current_user") || "null");
}

function getUsers() {
  return JSON.parse(localStorage.getItem("gc_users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("gc_users", JSON.stringify(users));
}


/* ==========================================================================
   3. TOAST NOTIFICATION SYSTEM
   Call showToast("message", "success" | "error" | "info") from anywhere.
   ========================================================================== */

function showToast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const icons = { success: "✓", error: "✕", info: "ℹ" };

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger enter animation on next frame
  requestAnimationFrame(() => toast.classList.add("show"));

  // Auto-remove after 3.2 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}


/* ==========================================================================
   4. PAGE LOADER
   A brief loading animation shown while the page first renders.
   ========================================================================== */

function initPageLoader() {
  const loader = document.querySelector(".page-loader");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("loaded"), 350);
  });
}


/* ==========================================================================
   5. NAVBAR — sticky shadow, hamburger menu, active link, cart badge
   ========================================================================== */

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Sticky shadow on scroll
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  // Hamburger toggle for mobile
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  // Highlight the active page link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("active");
  });

  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-badge").forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}


/* ==========================================================================
   6. DARK MODE TOGGLE
   Preference saved to LocalStorage so it persists across pages.
   ========================================================================== */

function initDarkMode() {
  const toggleBtns = document.querySelectorAll(".theme-toggle");
  const isDark = localStorage.getItem("gc_dark_mode") === "true";

  if (isDark) document.body.classList.add("dark-mode");

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("gc_dark_mode", document.body.classList.contains("dark-mode"));
    });
  });
}


/* ==========================================================================
   7. SCROLL TO TOP BUTTON
   ========================================================================== */

function initScrollTop() {
  const btn = document.querySelector(".scroll-top-btn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ==========================================================================
   8. SCROLL REVEAL ANIMATIONS
   Any element with class="reveal" fades/slides in when scrolled into view.
   ========================================================================== */

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}


/* ==========================================================================
   9. SMOOTH SCROLL for in-page anchor links (e.g. "#menu")
   ========================================================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}


/* ==========================================================================
   10. HOME PAGE — Featured Products & Best Sellers
   ========================================================================== */

function renderHomeProducts() {
  const featuredWrap = document.querySelector("#featured-products");
  const bestSellerWrap = document.querySelector("#best-sellers");

  if (featuredWrap) {
    const featured = PRODUCTS.slice(0, 8);
    featuredWrap.innerHTML = featured.map(p => buildProductCard(p)).join("");
  }

  if (bestSellerWrap) {
    const best = PRODUCTS.filter(p => p.badge === "Best Seller").slice(0, 4);
    bestSellerWrap.innerHTML = best.map(p => buildProductCard(p)).join("");
  }

  attachProductCardEvents();
}


/* ==========================================================================
   11. MENU PAGE — Render, Search, Filter, Sort
   ========================================================================== */

let currentFilter = "All";
let currentSort = "default";
let currentSearch = "";

function buildProductCard(p) {
  const badgeHtml = p.badge
    ? `<span class="badge ${p.badge === 'New' ? 'badge-new' : ''}">${p.badge}</span>`
    : "";

  const oldPriceHtml = p.oldPrice
    ? `<span class="price-old">Rs ${p.oldPrice}</span>`
    : "";

  const wishlist = getWishlist();
  const isWished = wishlist.includes(p.id);

  // If a real image filename is set on the product, show the <img>.
  // Otherwise fall back to the text placeholder so layout never breaks.
  const cardImageContent = p.img
    ? `<img src="images/${p.img}" alt="${p.name}">`
    : `<!-- ${p.imgNote} -->${p.imgNote}`;

  return `
    <div class="card reveal" data-id="${p.id}">
      ${badgeHtml}
      <div class="card-quick-actions">
        <button class="wishlist-btn ${isWished ? 'active' : ''}" data-id="${p.id}" title="Add to Wishlist">♥</button>
        <button class="quickview-btn" data-id="${p.id}" title="Quick View">👁</button>
      </div>
      <a href="product.html?id=${p.id}">
        <div class="card-image">
          ${cardImageContent}
        </div>
      </a>
      <div class="card-body">
        <span class="card-category">${p.category}</span>
        <h3 class="card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="stars">${"★".repeat(Math.round(p.rating))}${"☆".repeat(5 - Math.round(p.rating))}</div>
        <div class="card-footer">
          <div class="price-tag ${p.oldPrice ? 'price-tag-sale' : ''}">Rs ${p.price} ${oldPriceHtml}</div>
          <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${p.id}">Add +</button>
        </div>
      </div>
    </div>
  `;
}

function renderMenuProducts() {
  const grid = document.querySelector("#menu-grid");
  const resultCount = document.querySelector("#result-count");
  if (!grid) return;

  let list = [...PRODUCTS];

  // Apply category filter
  if (currentFilter !== "All") {
    list = list.filter(p => p.category === currentFilter);
  }

  // Apply search
  if (currentSearch.trim() !== "") {
    const q = currentSearch.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  // Apply sort
  if (currentSort === "low-high") list.sort((a, b) => a.price - b.price);
  if (currentSort === "high-low") list.sort((a, b) => b.price - a.price);
  if (currentSort === "rating") list.sort((a, b) => b.rating - a.rating);

  if (resultCount) resultCount.textContent = `${list.length} product${list.length !== 1 ? "s" : ""} found`;

  grid.innerHTML = list.length
    ? list.map(p => buildProductCard(p)).join("")
    : `<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-state-icon">🔍</div><h3>No products found</h3><p>Try a different search or filter.</p></div>`;

  attachProductCardEvents();
  initScrollReveal();
}

function initMenuControls() {
  const searchInput = document.querySelector("#search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const sortSelect = document.querySelector("#sort-select");

  // If arriving from a "Shop by Category" link (e.g. menu.html?category=Cakes),
  // pre-select that category filter automatically.
  const params = new URLSearchParams(window.location.search);
  const categoryFromUrl = params.get("category");
  if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
    currentFilter = categoryFromUrl;
    filterBtns.forEach(b => {
      b.classList.toggle("active-filter", b.dataset.category === categoryFromUrl);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderMenuProducts();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active-filter"));
      btn.classList.add("active-filter");
      currentFilter = btn.dataset.category;
      renderMenuProducts();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderMenuProducts();
    });
  }

  renderMenuProducts();
}


/* ==========================================================================
   12. QUICK VIEW MODAL
   ========================================================================== */

function openQuickView(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const overlay = document.querySelector("#quickview-modal");
  if (!overlay) return;

  const modalImgContent = product.img
    ? `<img src="images/${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md);">`
    : `<!-- ${product.imgNote} -->${product.imgNote}`;
  overlay.querySelector(".modal-image").innerHTML = modalImgContent;
  overlay.querySelector(".modal-title").textContent = product.name;
  overlay.querySelector(".modal-category").textContent = product.category;
  overlay.querySelector(".modal-desc").textContent = product.desc;
  overlay.querySelector(".modal-price").innerHTML = `Rs ${product.price}`;
  overlay.querySelector(".modal-add-btn").dataset.id = product.id;
  overlay.querySelector(".modal-view-link").href = `product.html?id=${product.id}`;

  overlay.classList.add("active");
}

function initQuickViewModal() {
  const overlay = document.querySelector("#quickview-modal");
  if (!overlay) return;

  overlay.querySelector(".modal-close").addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("active");
  });

  overlay.querySelector(".modal-add-btn").addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    addToCart(id, 1);
    overlay.classList.remove("active");
  });
}


/* ==========================================================================
   13. WISHLIST LOGIC
   ========================================================================== */

function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter(item => item !== id);
    showToast("Removed from wishlist", "info");
  } else {
    list.push(id);
    showToast("Added to wishlist ♥", "success");
  }
  saveWishlist(list);
}


/* ==========================================================================
   Shared: attach click handlers to product cards (used on Home + Menu)
   ========================================================================== */

function attachProductCardEvents() {
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(parseInt(btn.dataset.id), 1);
    });
  });

  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleWishlist(parseInt(btn.dataset.id));
      btn.classList.toggle("active");
    });
  });

  document.querySelectorAll(".quickview-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openQuickView(parseInt(btn.dataset.id));
    });
  });
}


/* ==========================================================================
   14. PRODUCT DETAILS PAGE
   ========================================================================== */

function renderProductDetails() {
  const wrap = document.querySelector("#product-detail-wrap");
  if (!wrap) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id")) || 1;
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  document.title = `${product.name} — Golden Crumb Bakery`;

  const detailImgContent = product.img
    ? `<img src="images/${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg);">`
    : `<!-- ${product.imgNote} -->${product.imgNote}`;

  wrap.innerHTML = `
    <div class="modal-image" style="aspect-ratio:1;border-radius:var(--radius-lg);">
      ${detailImgContent}
    </div>
    <div class="product-info">
      <span class="card-category">${product.category}</span>
      <h1 style="margin:0.4rem 0;">${product.name}</h1>
      <div class="stars">${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))} <span style="color:var(--text-secondary);font-size:0.85rem;">(${product.rating} rating)</span></div>
      <div class="price-tag mt-md ${product.oldPrice ? 'price-tag-sale' : ''}">Rs ${product.price} ${product.oldPrice ? `<span class="price-old">Rs ${product.oldPrice}</span>` : ""}</div>
      <p class="mt-md">${product.desc}</p>

      <div class="qty-control mt-lg" style="width:fit-content;">
        <button id="detail-qty-minus">−</button>
        <input type="text" id="detail-qty-input" value="1" readonly>
        <button id="detail-qty-plus">+</button>
      </div>

      <div class="flex mt-md" style="gap:0.8rem;">
        <button class="btn btn-primary" id="detail-add-cart-btn" data-id="${product.id}">
          <span class="btn-text">Add to Cart</span>
          <span class="btn-spinner"></span>
        </button>
        <button class="btn-icon wishlist-btn ${getWishlist().includes(product.id) ? 'active' : ''}" data-id="${product.id}">♥</button>
      </div>
    </div>
  `;

  document.querySelector("#detail-qty-plus").addEventListener("click", () => {
    const input = document.querySelector("#detail-qty-input");
    input.value = parseInt(input.value) + 1;
  });

  document.querySelector("#detail-qty-minus").addEventListener("click", () => {
    const input = document.querySelector("#detail-qty-input");
    input.value = Math.max(1, parseInt(input.value) - 1);
  });

  document.querySelector("#detail-add-cart-btn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const qty = parseInt(document.querySelector("#detail-qty-input").value);
    btn.classList.add("loading");
    setTimeout(() => {
      addToCart(product.id, qty);
      btn.classList.remove("loading");
    }, 500);
  });

  attachProductCardEvents();

  // Related products: same category, excluding current
  const relatedWrap = document.querySelector("#related-products");
  if (relatedWrap) {
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedWrap.innerHTML = related.map(p => buildProductCard(p)).join("");
    attachProductCardEvents();
  }

  initScrollReveal();
}


/* ==========================================================================
   15. CART LOGIC
   ========================================================================== */

function addToCart(id, qty) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, category: product.category, imgNote: product.imgNote, img: product.img || null, qty: qty });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart`, "success");
}

function renderCartPage() {
  const wrap = document.querySelector("#cart-items-wrap");
  if (!wrap) return;

  const cart = getCart();

  if (cart.length === 0) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p class="mb-md">Looks like you haven't added anything sweet yet.</p>
        <a href="menu.html" class="btn btn-primary">Browse Menu</a>
      </div>
    `;
  } else {
    wrap.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">${item.img ? `<img src="images/${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm);">` : `<!-- ${item.imgNote} -->${item.imgNote}`}</div>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-cat">${item.category}</div>
        </div>
        <div class="qty-control">
          <button class="cart-qty-minus" data-id="${item.id}">−</button>
          <input type="text" value="${item.qty}" readonly>
          <button class="cart-qty-plus" data-id="${item.id}">+</button>
        </div>
        <div class="price-tag">Rs ${item.price * item.qty}</div>
        <button class="remove-item-btn" data-id="${item.id}">Remove</button>
      </div>
    `).join("");
  }

  attachCartEvents();
  updateCartTotals();
}

function attachCartEvents() {
  document.querySelectorAll(".cart-qty-plus").forEach(btn => {
    btn.addEventListener("click", () => changeCartQty(parseInt(btn.dataset.id), 1));
  });

  document.querySelectorAll(".cart-qty-minus").forEach(btn => {
    btn.addEventListener("click", () => changeCartQty(parseInt(btn.dataset.id), -1));
  });

  document.querySelectorAll(".remove-item-btn").forEach(btn => {
    btn.addEventListener("click", () => removeCartItem(parseInt(btn.dataset.id)));
  });
}

function changeCartQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
    showToast("Item removed from cart", "info");
  }

  saveCart(cart);
  renderCartPage();
}

function removeCartItem(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  showToast("Item removed from cart", "info");
  renderCartPage();
}

let appliedCoupon = 0;

function updateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const discount = subtotal * appliedCoupon;
  const grandTotal = subtotal - discount + delivery;

  const subtotalEl = document.querySelector("#summary-subtotal");
  const deliveryEl = document.querySelector("#summary-delivery");
  const discountEl = document.querySelector("#summary-discount");
  const totalEl = document.querySelector("#summary-total");

  if (subtotalEl) subtotalEl.textContent = `Rs ${subtotal}`;
  if (deliveryEl) deliveryEl.textContent = delivery === 0 ? "Free" : `Rs ${delivery}`;
  if (discountEl) discountEl.textContent = `- Rs ${discount.toFixed(0)}`;
  if (totalEl) totalEl.textContent = `Rs ${grandTotal.toFixed(0)}`;

  // Persist totals for checkout page to read
  sessionStorage.setItem("gc_totals", JSON.stringify({ subtotal, delivery, discount, grandTotal }));
}

function initCouponLogic() {
  const applyBtn = document.querySelector("#apply-coupon-btn");
  const input = document.querySelector("#coupon-input");
  const successMsg = document.querySelector("#coupon-success");

  if (!applyBtn) return;

  applyBtn.addEventListener("click", () => {
    const code = input.value.trim().toUpperCase();
    if (COUPONS[code]) {
      appliedCoupon = COUPONS[code];
      successMsg.textContent = `Coupon applied! ${appliedCoupon * 100}% off.`;
      successMsg.classList.add("show");
      showToast("Coupon applied successfully", "success");
    } else {
      appliedCoupon = 0;
      successMsg.classList.remove("show");
      showToast("Invalid coupon code", "error");
    }
    updateCartTotals();
  });
}


/* ==========================================================================
   16. CHECKOUT LOGIC
   ========================================================================== */

function initCheckoutPage() {
  const form = document.querySelector("#checkout-form");
  if (!form) return;

  // Render order summary from cart
  const cart = getCart();
  const summaryWrap = document.querySelector("#checkout-order-items");
  const totals = JSON.parse(sessionStorage.getItem("gc_totals") || "{}");

  if (summaryWrap) {
    summaryWrap.innerHTML = cart.map(item => `
      <div class="order-item-row">
        <span>${item.name} × ${item.qty}</span>
        <span>Rs ${item.price * item.qty}</span>
      </div>
    `).join("") || `<p>No items in cart.</p>`;
  }

  const subtotalEl = document.querySelector("#checkout-subtotal");
  const deliveryEl = document.querySelector("#checkout-delivery");
  const totalEl = document.querySelector("#checkout-total");

  const subtotal = totals.subtotal || cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = totals.delivery ?? (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE);
  const grandTotal = totals.grandTotal || (subtotal + delivery);

  if (subtotalEl) subtotalEl.textContent = `Rs ${subtotal}`;
  if (deliveryEl) deliveryEl.textContent = delivery === 0 ? "Free" : `Rs ${delivery}`;
  if (totalEl) totalEl.textContent = `Rs ${grandTotal.toFixed(0)}`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#checkout-name");
    const phone = document.querySelector("#checkout-phone");
    const email = document.querySelector("#checkout-email");
    const address = document.querySelector("#checkout-address");
    const city = document.querySelector("#checkout-city");

    let valid = true;
    valid = validateField(name, name.value.trim() !== "", "Full name is required.") && valid;
    valid = validateField(phone, /^[0-9]{10,13}$/.test(phone.value.trim()), "Enter a valid phone number (10-13 digits).") && valid;
    valid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Enter a valid email address.") && valid;
    valid = validateField(address, address.value.trim() !== "", "Delivery address is required.") && valid;
    valid = validateField(city, city.value.trim() !== "", "City is required.") && valid;

    if (!cart.length) {
      showToast("Your cart is empty", "error");
      valid = false;
    }

    if (!valid) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.classList.add("loading");

    // Simulate processing delay for realism
    setTimeout(() => {
      const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "Cash on Delivery";

      const order = {
        orderId: "GC" + Date.now().toString().slice(-8),
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        items: cart,
        subtotal, delivery, grandTotal,
        payment: paymentMethod,
        customer: { name: name.value.trim(), phone: phone.value.trim(), email: email.value.trim(), address: address.value.trim(), city: city.value.trim() },
        status: "Confirmed"
      };

      const orders = getOrders();
      orders.unshift(order);
      saveOrders(orders);

      saveCart([]); // empty the cart
      submitBtn.classList.remove("loading");

      showToast("Order placed successfully! 🎉", "success");
      setTimeout(() => { window.location.href = "orders.html"; }, 1200);
    }, 900);
  });
}

/* Generic field validator used by checkout, signup, signin, contact */
function validateField(inputEl, isValid, message) {
  const errorEl = inputEl.parentElement.querySelector(".error-message");
  if (!isValid) {
    inputEl.classList.add("input-error");
    if (errorEl) { errorEl.textContent = message; errorEl.classList.add("show"); }
    return false;
  } else {
    inputEl.classList.remove("input-error");
    if (errorEl) errorEl.classList.remove("show");
    return true;
  }
}


/* ==========================================================================
   17. ORDERS PAGE — Order History from LocalStorage
   ========================================================================== */

function renderOrdersPage() {
  const wrap = document.querySelector("#orders-wrap");
  if (!wrap) return;

  const orders = getOrders();

  if (!orders.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📦</div>
        <h3>No orders yet</h3>
        <p class="mb-md">Your placed orders will show up here.</p>
        <a href="menu.html" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    return;
  }

  wrap.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <strong>Order #${order.orderId}</strong>
          <div style="font-size:0.82rem;color:var(--text-secondary);">${order.date}</div>
        </div>
        <span class="order-status">${order.status}</span>
      </div>
      ${order.items.map(item => `
        <div class="order-item-row">
          <span>${item.name} × ${item.qty}</span>
          <span>Rs ${item.price * item.qty}</span>
        </div>
      `).join("")}
      <div class="summary-row total mt-sm">
        <span>Total</span>
        <span>Rs ${order.grandTotal.toFixed(0)}</span>
      </div>
      <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.5rem;">
        Paid via ${order.payment} · Delivering to ${order.customer.city}
      </div>
    </div>
  `).join("");
}


/* ==========================================================================
   18. SIGN UP / SIGN IN VALIDATION (Frontend Demo Only)
   ========================================================================== */

function initPasswordToggle() {
  document.querySelectorAll(".password-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector("input");
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggle.textContent = isPassword ? "Hide" : "Show";
    });
  });
}

function initSignupForm() {
  const form = document.querySelector("#signup-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#signup-name");
    const email = document.querySelector("#signup-email");
    const phone = document.querySelector("#signup-phone");
    const password = document.querySelector("#signup-password");
    const confirmPassword = document.querySelector("#signup-confirm-password");

    let valid = true;
    valid = validateField(name, name.value.trim() !== "", "Full name is required.") && valid;
    valid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Enter a valid email address.") && valid;
    valid = validateField(phone, /^[0-9]{10,13}$/.test(phone.value.trim()), "Enter a valid phone number.") && valid;
    valid = validateField(password, password.value.length >= 6, "Password must be at least 6 characters.") && valid;
    valid = validateField(confirmPassword, confirmPassword.value === password.value && password.value !== "", "Passwords do not match.") && valid;

    if (!valid) {
      showToast("Please fix the errors below", "error");
      return;
    }

    const users = getUsers();
    if (users.find(u => u.email === email.value.trim())) {
      validateField(email, false, "An account with this email already exists.");
      showToast("Email already registered", "error");
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.classList.add("loading");

    setTimeout(() => {
      users.push({ name: name.value.trim(), email: email.value.trim(), phone: phone.value.trim(), password: password.value });
      saveUsers(users);
      submitBtn.classList.remove("loading");
      showToast("Account created successfully!", "success");
      setTimeout(() => { window.location.href = "signin.html"; }, 1000);
    }, 700);
  });
}

function initSigninForm() {
  const form = document.querySelector("#signin-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#signin-email");
    const password = document.querySelector("#signin-password");

    let valid = true;
    valid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Enter a valid email address.") && valid;
    valid = validateField(password, password.value.trim() !== "", "Password is required.") && valid;

    if (!valid) {
      showToast("Please fix the errors below", "error");
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.classList.add("loading");

    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email.value.trim() && u.password === password.value);

      submitBtn.classList.remove("loading");

      if (!user) {
        showToast("Invalid email or password (this is a frontend demo)", "error");
        return;
      }

      localStorage.setItem("gc_current_user", JSON.stringify({ name: user.name, email: user.email }));
      showToast(`Welcome back, ${user.name}!`, "success");
      setTimeout(() => { window.location.href = "index.html"; }, 1000);
    }, 700);
  });
}


/* ==========================================================================
   19. CONTACT FORM VALIDATION
   ========================================================================== */

function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#contact-name");
    const email = document.querySelector("#contact-email");
    const phone = document.querySelector("#contact-phone");
    const message = document.querySelector("#contact-message");

    let valid = true;
    valid = validateField(name, name.value.trim() !== "", "Name is required.") && valid;
    valid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Enter a valid email address.") && valid;
    valid = validateField(phone, /^[0-9]{10,13}$/.test(phone.value.trim()), "Enter a valid phone number.") && valid;
    valid = validateField(message, message.value.trim().length >= 10, "Message must be at least 10 characters.") && valid;

    if (!valid) {
      showToast("Please fix the errors below", "error");
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.classList.add("loading");

    setTimeout(() => {
      submitBtn.classList.remove("loading");
      showToast("Message sent! We'll get back to you soon.", "success");
      form.reset();
    }, 700);
  });
}


/* ==========================================================================
   20. NEWSLETTER FORM
   ========================================================================== */

function initNewsletterForm() {
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        showToast("Please enter a valid email address", "error");
        return;
      }
      showToast("Subscribed! Sweet deals are on the way 🍰", "success");
      form.reset();
    });
  });
}


/* ==========================================================================
   21. INIT — Runs on every page load
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initPageLoader();
  initNavbar();
  initDarkMode();
  initScrollTop();
  initSmoothScroll();
  initNewsletterForm();
  initPasswordToggle();

  // Page-specific initializers (each function safely exits if its
  // target elements aren't present on the current page)
  renderHomeProducts();
  initMenuControls();
  initQuickViewModal();
  renderProductDetails();
  renderCartPage();
  initCouponLogic();
  initCheckoutPage();
  renderOrdersPage();
  initSignupForm();
  initSigninForm();
  initContactForm();

  initScrollReveal();
});
