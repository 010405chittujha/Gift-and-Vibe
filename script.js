/* --- Data --- */
const products = [
    { id: 1, name: "Futuristic VR Headset", price: 349.99, image: "https://plus.unsplash.com/premium_photo-1678308581023-1d8c1c466465?w=1200&auto=format&fit=crop&q=60", description: "Immerse yourself in new worlds with 6K resolution and haptic feedback. The future of entertainment.", category: "Electronics", badge: "New", badgeType: "badge-new" },
    { id: 2, name: "Cybernetic Fashion Jacket", price: 279.50, image: "https://plus.unsplash.com/premium_photo-1682146351588-e8a55c65f0e3?w=1200&auto=format&fit=crop&q=60", description: "Stay warm and connected. This jacket features customizable LED panels and smart-fabric controls.", category: "Fashion", badge: "Hot", badgeType: "badge-hot" },
    { id: 3, name: "Levitating Plant Pot", price: 129.00, image: "https://plus.unsplash.com/premium_photo-1679921453482-a0b0f20dca3f?w=1200&auto=format&fit=crop&q=60", description: "A touch of magic for your home. This pot uses magnetic levitation to float your plant in mid-air.", category: "Home Decor", badge: "Sale", badgeType: "badge-sale" },
    { id: 4, name: "Smart Galaxy Projector", price: 89.99, image: "https://images.unsplash.com/photo-1618703417103-e6b88b0f32cf?w=1200&auto=format&fit=crop&q=60", description: "Turn your ceiling into a star-filled galaxy. Connects to Alexa and Google Assistant.", category: "Smart Home" },
    { id: 5, name: "Personalized Holo-Frame", price: 199.99, image: "https://plus.unsplash.com/premium_photo-1683140683017-b769611c3c9e?w=1200&auto=format&fit=crop&q=60", description: "Display your favorite memories in 3D holographic form. A truly unique and personal gift.", category: "Personalized" },
    { id: 6, name: "Quantum Smartwatch", price: 499.00, image: "https://images.unsplash.com/photo-1544117519-315a2e881c31?w=1200&auto=format&fit=crop&q=60", description: "More than a watch. It's your life assistant with biometric scanning and a holographic interface.", category: "Wearables", badge: "New", badgeType: "badge-new" },
    { id: 7, name: "Holographic AI Assistant", price: 799.00, image: "https://images.unsplash.com/photo-1518314916381-9d74c0f88238?w=1200&auto=format&fit=crop&q=60", description: "A smart home hub with a holographic personality. Controls your home and answers your questions.", category: "Smart Home" },
    { id: 8, name: "Mystery Gift Box", price: 49.99, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=60", description: "A curated box of mystery gadgets and gifts. What will you get?", category: "Gifts" },
    { id: 9, name: "Smart Neuro-Headband", price: 299.99, image: "https://images.unsplash.com/photo-1589382226270-d53b2d66b5e3?w=1200&auto=format&fit=crop&q=60", description: "Monitor your focus and sleep patterns with this advanced EEG headband. Connects to your phone.", category: "Wearables" },
    { id: 10, name: "Custom Star Map", price: 79.99, image: "https://images.unsplash.com/photo-1635035882841-c88b22e1a3d3?w=1200&auto=format&fit=crop&q=60", description: "A personalized map of the stars on your special night. The perfect anniversary gift.", category: "Personalized" },
    { id: 11, name: "Drone Delivery Bot", price: 1299.00, image: "https://images.unsplash.com/photo-1588117367375-590b1c03c5d8?w=1200&auto=format&fit=crop&q=60", description: "Your personal delivery drone. (Experimental - check local regulations!)", category: "Gadgets", badge: "Hot", badgeType: "badge-hot" },
    { id: 12, name: "Cyberpunk LED Visor", price: 119.50, image: "https://images.unsplash.com/photo-1608154143459-a76d8b3de3f0?w=1200&auto=format&fit=crop&q=60", description: "The ultimate fashion accessory for your next night out. Fully customizable LEDs.", category: "Fashion" }
];

const aiQuestions = [
    { q: "What are the trending gifts?", a: "Our top trending items right now are the Futuristic VR Headset and the Levitating Plant Pot. Check out the 'Trending Now' section!" },
    { q: "Do you offer international shipping?", a: "Yes, we ship globally! Shipping times vary by location, typically 5-10 business days." },
    { q: "How can I track my order?", a: "Once your order ships, you'll receive an email with a tracking link. You can also view it in your account profile." },
    { q: "What is your return policy?", a: "We offer a 30-day return policy on all non-customized items. Original packaging is required." },
    { q: "Can I customize a product?", a: "Absolutely! Look for the 'Personalized' category. We offer custom engraving and holographic setups." },
    { q: "Is my payment secure?", a: "Yes, we use industry-standard encryption (SSL) to ensure your payment details are 100% secure." }
];

/* --- Initialization (Theme & Errors) --- */
(function initTheme() {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    const savedColorTheme = localStorage.getItem('color-theme');
    if (savedColorTheme) {
        document.body.classList.add(savedColorTheme);
    }
    // Prevent image load errors globally (Replaces inline onerror)
    window.addEventListener('error', function(e) {
        if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
            e.target.src = 'https://placehold.co/600x600/12121c/00e0ff?text=Image+Not+Found';
            e.target.alt = 'Fallback Image';
        }
    }, true); 
})();

/* --- Main Logic --- */
document.addEventListener('DOMContentLoaded', () => {
    // Add transition class after load to prevent flickering
    document.body.classList.add('theme-transition');

    /* --- State Management --- */
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let toastTimeout;
    let currentSlide = 0;
    let slideInterval;

    /* --- DOM Elements --- */
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const themeBtn = document.getElementById('color-theme-toggle');
    const productGrid = document.getElementById('product-grid');
    const recommendedGrid = document.getElementById('recommended-grid');
    const cartCount = document.querySelector('.cart-item-count');
    const wishlistCount = document.querySelector('.wishlist-item-count');
    const toast = document.getElementById('notification-toast');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const nav = document.querySelector('.nav');

    /* --- Helper Functions --- */
    const showNotification = (message) => {
        toast.innerHTML = message;
        toast.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    };

    const saveWishlist = () => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateCartUI();
    };

    const updateCartUI = () => {
        const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalCartItems;
            cartCount.style.display = totalCartItems > 0 ? 'flex' : 'none';
        }
        if (wishlistCount) {
            wishlistCount.textContent = wishlist.length;
            wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
        }
    };

    const updateWishlistIcons = () => {
        const allWishlistButtons = document.querySelectorAll('.add-to-wishlist');
        allWishlistButtons.forEach(btn => {
            const productId = parseInt(btn.dataset.id);
            if (wishlist.some(item => item.id === productId)) {
                btn.classList.add('in-wishlist');
            } else {
                btn.classList.remove('in-wishlist');
            }
        });
    };

    /* --- Cart & Wishlist Logic --- */
    const addToCart = (productId, quantity = 1) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        saveCart();
        showNotification(`<i class="fa-solid fa-check-circle"></i> ${product.name} added to cart!`);
    };

    const removeFromCart = (productId) => {
        const product = products.find(p => p.id === productId);
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        if (product) showNotification(`${product.name} removed from cart.`);
        if (document.getElementById('page-cart').classList.contains('active')) {
            renderCartPage();
        }
    };

    const updateCartQuantity = (productId, newQuantity) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
            }
        }
        if (document.getElementById('page-cart').classList.contains('active')) {
            renderCartPage();
        }
    };

    const toggleWishlist = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItemIndex = wishlist.findIndex(item => item.id === productId);
        if (existingItemIndex > -1) {
            wishlist.splice(existingItemIndex, 1);
            showNotification(`<i class="fa-solid fa-heart"></i> ${product.name} removed from wishlist.`);
        } else {
            wishlist.push(product);
            showNotification(`<i class="fa-solid fa-heart"></i> ${product.name} added to wishlist!`);
        }
        saveWishlist();
        updateWishlistIcons();
        if (document.getElementById('page-wishlist').classList.contains('active')) {
            renderWishlistPage();
        }
    };

    /* --- Rendering Functions --- */
    const createProductCard = (product) => {
        const badgeHtml = product.badge ? `<span class="product-badge ${product.badgeType}">${product.badge}</span>` : '';
        return `
        <div class="product-card">
            ${badgeHtml}
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-card-actions">
                    <a href="#" class="action-btn" data-page="product" data-id="${product.id}" aria-label="View Details"><i class="fa-solid fa-link"></i></a>
                    <button class="action-btn quick-view-trigger" data-id="${product.id}" aria-label="Quick View"><i class="fa-solid fa-eye"></i></button>
                    <button class="action-btn add-to-wishlist" data-id="${product.id}" aria-label="Add to Wishlist"><i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary btn-block add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>`;
    };

    const renderProducts = () => {
        if (productGrid) {
            productGrid.innerHTML = '';
            products.slice(0, 4).forEach(product => productGrid.innerHTML += createProductCard(product));
        }
        if (recommendedGrid) {
            recommendedGrid.innerHTML = '';
            products.slice(4, 8).forEach(product => recommendedGrid.innerHTML += createProductCard(product));
        }
        updateWishlistIcons();
    };

    const renderProductDetail = (productId) => {
        const container = document.getElementById('product-detail-container');
        if (!container) return;
        const product = products.find(p => p.id === productId);

        if (product) {
            container.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <div class="product-detail-reviews">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-alt"></i>
                    <span>(120 Reviews)</span>
                </div>
                <p class="product-detail-price">$${product.price.toFixed(2)}</p>
                <p class="product-detail-desc">${product.description}</p>
                <div class="product-detail-actions">
                    <input type="number" class="quantity-input" id="product-quantity" value="1" min="1">
                    <button class="btn btn-primary" id="detail-add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="btn btn-secondary add-to-wishlist" data-id="${product.id}"><i class="fa-solid fa-heart"></i></button>
                </div>
            </div>`;
            
            document.getElementById('detail-add-to-cart').addEventListener('click', (e) => {
                const qty = parseInt(document.getElementById('product-quantity').value) || 1;
                addToCart(parseInt(e.target.dataset.id), qty);
            });
        } else {
            container.innerHTML = `<p class="empty-cart-message">Sorry, product not found.</p>`;
        }
        updateWishlistIcons();
    };

    const renderCartPage = () => {
        const listContainer = document.getElementById('cart-items-list');
        const summaryContainer = document.getElementById('cart-summary');
        if (!listContainer || !summaryContainer) return;

        if (cart.length === 0) {
            listContainer.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
            summaryContainer.innerHTML = '';
            return;
        }

        listContainer.innerHTML = `<div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;"><button class="btn btn-secondary" id="clear-cart-btn">Clear Cart</button></div>`;
        
        cart.forEach(item => {
            listContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <label for="qty-${item.id}">Qty:</label>
                        <input type="number" id="qty-${item.id}" class="cart-item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="cart-item-remove" data-id="${item.id}">&times; Remove</button>
                    </div>
                </div>
                <div class="cart-item-total"><p>$${(item.price * item.quantity).toFixed(2)}</p></div>
            </div>`;
        });

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        summaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="cart-summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="cart-summary-row"><span>Tax (5%)</span><span>$${tax.toFixed(2)}</span></div>
            <div class="cart-summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
            <a href="#" class="btn btn-primary btn-block" data-page="checkout">Proceed to Checkout</a>
        `;

        document.getElementById('clear-cart-btn').addEventListener('click', () => {
            if (confirm("Are you sure you want to clear your cart?")) {
                cart = [];
                saveCart();
                renderCartPage();
                showNotification("Cart cleared.");
            }
        });
    };

    const renderWishlistPage = () => {
        const grid = document.getElementById('wishlist-product-grid');
        if(!grid) return;
        grid.innerHTML = '';
        if(wishlist.length === 0) {
            grid.innerHTML = '<p class="empty-cart-message" style="grid-column: 1/-1;">Your wishlist is empty.</p>';
        } else {
            wishlist.forEach(product => grid.innerHTML += createProductCard(product));
        }
        updateWishlistIcons();
    };

    const renderListingPage = (titleText, productList) => {
        const title = document.getElementById('category-page-title');
        const gridContainer = document.getElementById('category-product-grid');
        if (!title || !gridContainer) return;

        title.textContent = titleText;
        let itemsToRender = productList || products.filter(p => p.category === titleText);

        gridContainer.innerHTML = '';
        if (!itemsToRender || itemsToRender.length === 0) {
            gridContainer.innerHTML = `<p class="empty-cart-message">No products found.</p>`;
        } else {
            itemsToRender.forEach(product => gridContainer.innerHTML += createProductCard(product));
        }
        updateWishlistIcons();
    };

    const renderQuickView = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const content = document.getElementById('quick-view-content');
        content.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="quick-view-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description.substring(0, 100)}...</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                <a href="#" class="btn btn-secondary" data-page="product" data-id="${product.id}" id="quick-view-details">View Full Details</a>
            </div>`;
        
        document.getElementById('quick-view-details').addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('quick-view-modal');
            navigateTo('page-product', { id: product.id });
        });
        openModal('quick-view-modal');
    };

    /* --- Navigation & Router --- */
    const navigateTo = (pageId, params = {}) => {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.add('active');

        document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active-page'));
        const activeNav = document.querySelector(`.nav-icon[data-page="${pageId.replace('page-', '')}"]`);
        if (activeNav) activeNav.classList.add('active-page');

        if (pageId === 'page-product') renderProductDetail(params.id);
        else if (pageId === 'page-cart') renderCartPage();
        else if (pageId === 'page-home') renderProducts();
        else if (pageId === 'page-category') renderListingPage(params.category || params.query, params.searchResults);
        else if (pageId === 'page-wishlist') renderWishlistPage();

        window.scrollTo(0, 0);
    };

    /* --- Theme Logic --- */
    themeToggle.checked = document.body.classList.contains('dark-mode');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme-mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    const colorThemes = ['', 'theme-crimson', 'theme-emerald', 'theme-sunset'];
    let currentThemeIndex = 0;
    const savedColorTheme = localStorage.getItem('color-theme');
    if (savedColorTheme) currentThemeIndex = colorThemes.indexOf(savedColorTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 0;

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (colorThemes[currentThemeIndex]) document.body.classList.remove(colorThemes[currentThemeIndex]);
        currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
        const newTheme = colorThemes[currentThemeIndex];
        if (newTheme) document.body.classList.add(newTheme);
        localStorage.setItem('color-theme', newTheme);
        
        let themeName = newTheme ? newTheme.replace('theme-', '').charAt(0).toUpperCase() + newTheme.replace('theme-', '').slice(1) : "Default Blue";
        showNotification(`<i class="fa-solid fa-palette"></i> Switched to ${themeName} Theme`);
    });

    /* --- Modal Logic --- */
    const openModal = (modalId) => document.getElementById(modalId)?.classList.add('active');
    const closeModal = (modalId) => document.getElementById(modalId)?.classList.remove('active');

    document.querySelectorAll('#login-trigger').forEach(trigger => trigger.addEventListener('click', (e) => { e.preventDefault(); openModal('login-modal'); }));
    document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.target)));
    document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal.id); }));

    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetTab = tab.dataset.tab;
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.toggle('active', form.id === `${targetTab}-form`);
            });
        });
    });

    /* --- Slider Logic --- */
    const showSlide = (index) => {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-nav-dot');
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentSlide = index;
    };

    const initSlider = () => {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;
        const dotsContainer = document.getElementById('hero-dots');
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('hero-nav-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => { showSlide(i); resetSlideTimer(); });
            dotsContainer.appendChild(dot);
        });
        showSlide(0);
        resetSlideTimer();
    };

    const resetSlideTimer = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => showSlide((currentSlide + 1) % document.querySelectorAll('.hero-slide').length), 5000);
    };

    document.getElementById('hero-next')?.addEventListener('click', () => { showSlide((currentSlide + 1) % document.querySelectorAll('.hero-slide').length); resetSlideTimer(); });
    document.getElementById('hero-prev')?.addEventListener('click', () => { showSlide((currentSlide - 1 + document.querySelectorAll('.hero-slide').length) % document.querySelectorAll('.hero-slide').length); resetSlideTimer(); });

    /* --- Search Logic --- */
    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;
        const results = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        navigateTo('page-category', { query: `Search Results: "${query}"`, searchResults: results });
        searchInput.value = '';
        document.querySelector('.nav.mobile-active')?.classList.remove('mobile-active');
    };
    searchBtn?.addEventListener('click', (e) => { e.preventDefault(); performSearch(); });
    searchInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); performSearch(); } });

    /* --- Global Event Delegation --- */
    document.body.addEventListener('click', (e) => {
        const target = e.target;
        
        // Navigation
        const navLink = target.closest('[data-page]');
        if (navLink) {
            e.preventDefault();
            navigateTo("page-" + navLink.dataset.page, { id: navLink.dataset.id ? parseInt(navLink.dataset.id) : null, category: navLink.dataset.category });
            if (target.closest('.modal')) closeModal(target.closest('.modal').id);
            document.querySelector('.nav.mobile-active')?.classList.remove('mobile-active');
        }

        // Add to Cart
        if (target.classList.contains('add-to-cart')) {
            e.preventDefault();
            addToCart(parseInt(target.dataset.id));
        }

        // Add to Wishlist
        const wishlistBtn = target.closest('.add-to-wishlist');
        if (wishlistBtn) {
            e.preventDefault();
            toggleWishlist(parseInt(wishlistBtn.dataset.id));
        }

        // Quick View
        const quickViewBtn = target.closest('.quick-view-trigger');
        if (quickViewBtn) {
            e.preventDefault();
            renderQuickView(parseInt(quickViewBtn.dataset.id));
        }

        // Remove from Cart
        if (target.classList.contains('cart-item-remove')) {
            e.preventDefault();
            removeFromCart(parseInt(target.dataset.id));
        }
    });

    document.body.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-item-quantity')) {
            const qty = parseInt(e.target.value);
            const id = parseInt(e.target.dataset.id);
            if (qty > 0) updateCartQuantity(id, qty);
            else e.target.value = 1;
        }
    });

    /* --- UI Events --- */
    mobileToggleBtn?.addEventListener('click', () => nav?.classList.toggle('mobile-active'));
    
    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!document.getElementById('checkout-name').value || !document.getElementById('checkout-email').value) {
            const err = document.getElementById('checkout-error');
            err.textContent = "Please fill in Name and Email.";
            err.style.display = 'block';
            return;
        }
        cart = [];
        saveCart();
        navigateTo('page-confirmation');
    });

    const newsletterBtn = document.getElementById('newsletter-btn');
    newsletterBtn?.addEventListener('click', () => {
        const emailInput = document.getElementById('newsletter-email');
        if(emailInput.value.trim() !== "") {
            showNotification('<i class="fa-solid fa-check-circle"></i> Subscribed successfully!');
            emailInput.value = "";
        } else {
            showNotification('<i class="fa-solid fa-exclamation-circle"></i> Please enter an email.');
        }
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    /* --- AI Chat --- */
    const aiWidget = document.getElementById('ai-chat-widget');
    const chatMessages = document.getElementById('ai-chat-messages');
    const chatOptions = document.getElementById('ai-chat-options');

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const renderChatOptions = () => {
        chatOptions.innerHTML = '';
        aiQuestions.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.classList.add('chat-option-btn');
            btn.textContent = item.q;
            btn.addEventListener('click', () => {
                chatOptions.innerHTML = '';
                addMessage(item.q, 'user');
                setTimeout(() => {
                    addMessage(item.a, 'ai');
                    setTimeout(() => {
                        const resetBtn = document.createElement('button');
                        resetBtn.classList.add('chat-option-btn');
                        resetBtn.textContent = "Ask another question";
                        resetBtn.style.margin = "0 auto";
                        resetBtn.addEventListener('click', renderChatOptions);
                        chatOptions.appendChild(resetBtn);
                    }, 1000);
                }, 500);
            });
            chatOptions.appendChild(btn);
        });
    };

    document.getElementById('ai-assistant-trigger')?.addEventListener('click', () => {
        aiWidget.classList.add('active');
        if (chatMessages.children.length === 0) {
            addMessage("Hello! I'm Vibe AI. How can I help you today?", 'ai');
            renderChatOptions();
        }
    });
    document.getElementById('close-ai-chat')?.addEventListener('click', () => aiWidget.classList.remove('active'));

    /* --- Final Init --- */
    initSlider();
    updateCartUI();
    renderProducts();
});