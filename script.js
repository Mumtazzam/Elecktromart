// Ganti dengan URL Web App Google Apps Script Anda
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

const products = [
    // Resistor & Kapasitor
    { id: 1,  name: 'Resistor 1/4W (Pack 100pcs)', price: 15000,  unit: 'pack', icon: 'fa-minus',            category: 'Resistor & Kapasitor' },
    { id: 2,  name: 'Kapasitor Elektrolit 100µF',  price: 3000,   unit: 'pcs',  icon: 'fa-circle',           category: 'Resistor & Kapasitor' },
    { id: 3,  name: 'Kapasitor Keramik 104',        price: 1500,   unit: 'pcs',  icon: 'fa-circle-dot',       category: 'Resistor & Kapasitor' },
    { id: 4,  name: 'Potensiometer 10K',            price: 5000,   unit: 'pcs',  icon: 'fa-sliders',          category: 'Resistor & Kapasitor' },
    // Semikonduktor
    { id: 5,  name: 'Transistor NPN BC547',         price: 2000,   unit: 'pcs',  icon: 'fa-microchip',        category: 'Semikonduktor' },
    { id: 6,  name: 'Dioda 1N4007',                 price: 1500,   unit: 'pcs',  icon: 'fa-arrow-right',      category: 'Semikonduktor' },
    { id: 7,  name: 'LED 5mm Merah',                price: 1000,   unit: 'pcs',  icon: 'fa-lightbulb',        category: 'Semikonduktor' },
    { id: 8,  name: 'IC 555 Timer',                 price: 4000,   unit: 'pcs',  icon: 'fa-microchip',        category: 'Semikonduktor' },
    { id: 9,  name: 'IC LM358 Op-Amp',              price: 5000,   unit: 'pcs',  icon: 'fa-microchip',        category: 'Semikonduktor' },
    { id: 10, name: 'MOSFET IRF540N',               price: 12000,  unit: 'pcs',  icon: 'fa-bolt',             category: 'Semikonduktor' },
    // Modul & Board
    { id: 11, name: 'Arduino Uno R3',               price: 85000,  unit: 'pcs',  icon: 'fa-server',           category: 'Modul & Board' },
    { id: 12, name: 'Arduino Nano',                 price: 55000,  unit: 'pcs',  icon: 'fa-server',           category: 'Modul & Board' },
    { id: 13, name: 'ESP8266 NodeMCU',              price: 45000,  unit: 'pcs',  icon: 'fa-wifi',             category: 'Modul & Board' },
    { id: 14, name: 'ESP32 Dev Board',              price: 65000,  unit: 'pcs',  icon: 'fa-wifi',             category: 'Modul & Board' },
    { id: 15, name: 'Modul Relay 1 Channel',        price: 18000,  unit: 'pcs',  icon: 'fa-toggle-on',        category: 'Modul & Board' },
    { id: 16, name: 'Sensor Suhu DHT11',            price: 22000,  unit: 'pcs',  icon: 'fa-temperature-half', category: 'Modul & Board' },
    // Kabel & Konektor
    { id: 17, name: 'Kabel Jumper Male-Male 40pcs', price: 20000,  unit: 'pack', icon: 'fa-plug',             category: 'Kabel & Konektor' },
    { id: 18, name: 'Kabel Jumper Female-Female',   price: 20000,  unit: 'pack', icon: 'fa-plug',             category: 'Kabel & Konektor' },
    { id: 19, name: 'Header Pin 40 Pin',            price: 5000,   unit: 'pcs',  icon: 'fa-grip-lines',       category: 'Kabel & Konektor' },
    { id: 20, name: 'Konektor JST 2 Pin',           price: 3000,   unit: 'pcs',  icon: 'fa-link',             category: 'Kabel & Konektor' },
    // Power Supply
    { id: 21, name: 'Regulator LM7805',             price: 5000,   unit: 'pcs',  icon: 'fa-battery-full',     category: 'Power Supply' },
    { id: 22, name: 'Modul Step-Down LM2596',       price: 25000,  unit: 'pcs',  icon: 'fa-bolt',             category: 'Power Supply' },
    { id: 23, name: 'Baterai 18650 3.7V',           price: 35000,  unit: 'pcs',  icon: 'fa-battery-three-quarters', category: 'Power Supply' },
    { id: 24, name: 'Adaptor 12V 2A',               price: 55000,  unit: 'pcs',  icon: 'fa-plug-circle-bolt', category: 'Power Supply' },
    // PCB & Tools
    { id: 25, name: 'PCB Lubang 5x7cm',             price: 8000,   unit: 'pcs',  icon: 'fa-border-all',       category: 'PCB & Tools' },
    { id: 26, name: 'Breadboard 830 Titik',         price: 35000,  unit: 'pcs',  icon: 'fa-table-cells',      category: 'PCB & Tools' },
    { id: 27, name: 'Timah Solder 0.8mm 100g',      price: 45000,  unit: 'roll', icon: 'fa-circle-nodes',     category: 'PCB & Tools' },
    { id: 28, name: 'Flux Pasta Solder',            price: 20000,  unit: 'pcs',  icon: 'fa-jar',              category: 'PCB & Tools' },
];

let cart = [];
let activeCategory = 'Semua';
let searchQuery = '';

function formatRupiah(n) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

const PILL_ACTIVE   = 'category-btn whitespace-nowrap px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition border border-primary bg-primary/20 text-primary';
const PILL_INACTIVE = 'category-btn whitespace-nowrap px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition border border-slate-600 bg-card text-muted hover:border-primary hover:text-primary';

function buildCategories() {
    const cats = ['Semua', ...new Set(products.map(p => p.category))];
    document.getElementById('categoryFilter').innerHTML = cats.map(cat => `
        <button onclick="filterCategory('${cat}')" class="${cat === 'Semua' ? PILL_ACTIVE : PILL_INACTIVE}" data-cat="${cat}">${cat}</button>
    `).join('');
}

function filterCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.className = btn.dataset.cat === cat ? PILL_ACTIVE : PILL_INACTIVE;
    });
    renderProducts();
}

function renderProducts() {
    const grid     = document.getElementById('productGrid');
    const noResult = document.getElementById('noResult');
    const counter  = document.getElementById('productCount');

    let filtered = products;
    if (activeCategory !== 'Semua') filtered = filtered.filter(p => p.category === activeCategory);
    if (searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    noResult.classList.toggle('hidden', filtered.length > 0);
    if (counter) counter.textContent = `${filtered.length} produk`;

    grid.innerHTML = filtered.map(p => `
        <div class="bg-card border border-slate-700 rounded-xl overflow-hidden card-hover group cursor-default">
            <div class="p-3 sm:p-4 flex flex-col items-center border-b border-slate-700/60 bg-gradient-to-b from-slate-800/60 to-transparent">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-2 group-hover:border-primary/50 group-hover:bg-primary/20 transition">
                    <i class="fas ${p.icon} text-primary text-sm"></i>
                </div>
                <span class="text-[9px] sm:text-[10px] text-muted bg-slate-700/70 px-2 py-0.5 rounded-full text-center leading-tight">${p.category}</span>
            </div>
            <div class="p-2.5 sm:p-3">
                <h4 class="font-medium text-white text-[11px] sm:text-xs mb-1 leading-snug line-clamp-2 min-h-[2.2rem]">${p.name}</h4>
                <p class="text-accent font-bold text-xs sm:text-sm mb-2">${formatRupiah(p.price)}<span class="text-muted text-[9px] font-normal">/${p.unit}</span></p>
                <div class="flex items-center gap-1">
                    <input type="number" min="1" value="1" id="qty-${p.id}"
                           class="w-10 sm:w-12 px-1 py-1.5 bg-darker border border-slate-600 rounded-md text-white text-xs text-center focus:border-primary focus:outline-none">
                    <button onclick="addToCart(${p.id}, event)"
                            class="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-1.5 rounded-md text-[10px] sm:text-xs font-semibold hover:opacity-90 transition">
                        <i class="fas fa-cart-plus mr-0.5"></i>Tambah
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId, e) {
    const product  = products.find(p => p.id === productId);
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyInput.value) || 1;
    const existing = cart.find(i => i.id === productId);

    if (existing) existing.quantity += quantity;
    else cart.push({ ...product, quantity });

    updateCart();
    qtyInput.value = 1;

    const btn  = e.target.closest('button');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check mr-0.5"></i>Ditambahkan!';
    btn.disabled  = true;
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 1000);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function updateCart() {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    document.getElementById('cartCount').textContent = totalItems;
    document.getElementById('cartTotal').textContent = formatRupiah(totalPrice);

    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted py-10"><i class="fas fa-shopping-cart text-3xl mb-2 block opacity-20"></i>Keranjang masih kosong</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between py-3 border-b border-slate-700 gap-2">
                <div class="flex items-center gap-2 min-w-0">
                    <div class="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                        <i class="fas ${item.icon} text-primary text-xs"></i>
                    </div>
                    <div class="min-w-0">
                        <p class="text-white text-xs sm:text-sm font-medium truncate">${item.name}</p>
                        <p class="text-muted text-[10px] sm:text-xs">${formatRupiah(item.price)} × ${item.quantity} ${item.unit}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <p class="text-accent font-bold text-xs sm:text-sm">${formatRupiah(item.price * item.quantity)}</p>
                    <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-300 text-sm w-6 h-6 flex items-center justify-center">
                        <i class="fas fa-trash text-xs"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

async function submitOrder(customerData) {
    const orderData = {
        timestamp:       new Date().toLocaleString('id-ID'),
        customerName:    customerData.name,
        customerPhone:   customerData.phone,
        customerAddress: customerData.address,
        items:   cart.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(', '),
        total:   cart.reduce((s, i) => s + i.price * i.quantity, 0),
        details: cart.map(i => ({ name: i.name, quantity: i.quantity, unit: i.unit, price: i.price, subtotal: i.price * i.quantity }))
    };
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
    } catch (e) { console.error(e); }
    return true;
}

// ── Event Listeners ──────────────────────────────────────────
document.getElementById('cartBtn').addEventListener('click', () =>
    document.getElementById('cartModal').classList.remove('hidden'));

document.getElementById('closeCart').addEventListener('click', () =>
    document.getElementById('cartModal').classList.add('hidden'));

document.getElementById('closeSuccess').addEventListener('click', () =>
    document.getElementById('successModal').classList.add('hidden'));

// Close modal on backdrop click
document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.add('hidden');
});

document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderProducts();
});

document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (cart.length === 0) { alert('Keranjang masih kosong!'); return; }

    const customerData = {
        name:    document.getElementById('customerName').value,
        phone:   document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value
    };

    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Memproses...';
    btn.disabled  = true;

    await submitOrder(customerData);

    document.getElementById('cartModal').classList.add('hidden');
    document.getElementById('successModal').classList.remove('hidden');
    cart = [];
    updateCart();
    e.target.reset();

    btn.innerHTML = '<i class="fas fa-bolt mr-2"></i>Proses Pesanan Sekarang';
    btn.disabled  = false;
});

// ── Init ─────────────────────────────────────────────────────
buildCategories();
renderProducts();
updateCart();
