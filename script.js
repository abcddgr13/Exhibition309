// Global variables and configuration
const ADMIN_PASSWORD = 'muxdir]skPADMIN111';
let currentSlide = 0;
let slideInterval;
let allArtworks = [];
let filteredArtworks = [];

// Default gallery data - sample artworks for each category (40 per category)
const defaultGalleryData = {
    'แผ่นพับ อาชีพทัศนศิลป์': [
        ...Array.from({length: 40}, (_, i) => {
            // Use Thai Pop Art content for leaflet_2 (index 1)
            if (i === 1) {
                return {
                    id: `leaflet_${i + 1}`,
                    title: `Thai Pop Art Leaflet`,
                    artist: `ศิลปิน Pop Art ไทย`,
                    category: 'แผ่นพับ อาชีพทัศนศิลป์',
                    concept: `แผ่นพับที่นำเสนองานศิลปะป๊อปอาร์ตแนวไทยที่ผสมผสานวัฒนธรรมไทยกับศิลปะสมัยใหม่ เพื่อส่งเสริมความเข้าใจในศิลปะแนวใหม่`,
                    image: generatePlaceholderImage(`Thai Pop Leaflet`, '#E91E63'),
                    isBestWork: i < 2
                };
            }
            return {
                id: `leaflet_${i + 1}`,
                title: `แผ่นพับการศึกษา ${i + 1}`,
                artist: `นักออกแบบ ${i + 1}`,
                category: 'แผ่นพับ อาชีพทัศนศิลป์',
                concept: `แนวคิดในการออกแบบแผ่นพับเพื่อส่งเสริมการศึกษาทางด้านทัศนศิลป์ ผลงานชิ้นที่ ${i + 1}`,
                image: generatePlaceholderImage(`แผ่นพับ ${i + 1}`, '#4CAF50'),
                isBestWork: i < 2
            };
        })
    ],
    'Pop-up': [
        ...Array.from({length: 40}, (_, i) => ({
            id: `popup_${i + 1}`,
            title: `Pop-up Art ${i + 1}`,
            artist: `ศิลปิน Pop-up ${i + 1}`,
            category: 'Pop-up',
            concept: `การสร้างงานศิลปะแบบป๊อปอัปที่มีมิติและความน่าสนใจ ผลงานชิ้นที่ ${i + 1}`,
            image: generatePlaceholderImage(`Pop-up ${i + 1}`, '#FF9800'),
            isBestWork: i === 0
        }))
    ],
    'ประติมากรรม': [
        ...Array.from({length: 40}, (_, i) => ({
            id: `sculpture_${i + 1}`,
            title: `ประติมากรรม ${i + 1}`,
            artist: `ประติมากร ${i + 1}`,
            category: 'ประติมากรรม',
            concept: `งานแกะสลักและประติมากรรมที่แสดงถึงความงดงามของรูปทรง ผลงานชิ้นที่ ${i + 1}`,
            image: generatePlaceholderImage(`ประติมากรรม ${i + 1}`, '#795548'),
            isBestWork: i === 0
        }))
    ],
    'Cubism Art': [
        ...Array.from({length: 40}, (_, i) => ({
            id: `cubism_${i + 1}`,
            title: `Cubism Art ${i + 1}`,
            artist: `Cubist Artist ${i + 1}`,
            category: 'Cubism Art',
            concept: `งานศิลปะแนวคิวบิสม์ที่แสดงมุมมองหลายมิติในงานเดียว ผลงานชิ้นที่ ${i + 1}`,
            image: generatePlaceholderImage(`Cubism ${i + 1}`, '#9C27B0'),
            isBestWork: i === 0
        }))
    ],
    'Thai Pop Art': [
        ...Array.from({length: 40}, (_, i) => ({
            id: `thaipop_${i + 1}`,
            title: `Thai Pop Art ${i + 1}`,
            artist: `ศิลปิน Pop Art ${i + 1}`,
            category: 'Thai Pop Art',
            concept: `งานศิลปะป๊อปอาร์ตแนวไทยที่ผสมผสานวัฒนธรรมไทยกับศิลปะสมัยใหม่ ผลงานชิ้นที่ ${i + 1}`,
            image: generatePlaceholderImage(`Thai Pop ${i + 1}`, '#E91E63'),
            isBestWork: i === 0
        }))
    ]
};

// Generate placeholder image as base64
function generatePlaceholderImage(text, color) {
    const svgContent = `<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#212121"/>
            <rect x="20" y="20" width="360" height="260" fill="${color}" fill-opacity="0.1"/>
            <text x="200" y="140" text-anchor="middle" fill="${color}" font-size="16" font-family="Prompt, sans-serif">${text}</text>
            <text x="200" y="170" text-anchor="middle" fill="#FFD700" font-size="12" font-family="Prompt, sans-serif">Art Gallery Online</text>
        </svg>`;
    
    // Use encodeURIComponent for UTF-8 compatibility
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgContent)}`;
}

// Initialize localStorage with default data if empty
function initializeDefaultData() {
    const savedArtworks = localStorage.getItem('artworks');
    if (!savedArtworks) {
        const allDefaultArtworks = [];
        Object.values(defaultGalleryData).forEach(categoryArtworks => {
            allDefaultArtworks.push(...categoryArtworks);
        });
        localStorage.setItem('artworks', JSON.stringify(allDefaultArtworks));
    }
}

// Get all artworks from localStorage
function getAllArtworks() {
    initializeDefaultData();
    const saved = localStorage.getItem('artworks');
    return saved ? JSON.parse(saved) : [];
}

// Get best works for homepage slider
function getBestWorks() {
    const artworks = getAllArtworks();
    const bestWorks = artworks.filter(artwork => artwork.isBestWork);
    
    // If no best works marked, take first 5 artworks
    if (bestWorks.length === 0) {
        return artworks.slice(0, 5);
    }
    
    // Ensure we have exactly 5 best works
    while (bestWorks.length < 5 && bestWorks.length < artworks.length) {
        const remaining = artworks.filter(artwork => !bestWorks.includes(artwork));
        if (remaining.length > 0) {
            bestWorks.push(remaining[0]);
        } else {
            break;
        }
    }
    
    return bestWorks.slice(0, 5);
}

// Homepage Artwork Slideshow Functions
let artworkSlides = [];

function initializeSlideshow() {
    setupArtworkSlideshow();
}

function setupArtworkSlideshow() {
    artworkSlides = getBestWorks();
    createArtworkSlides();
    createSlideIndicators();
    showArtworkSlide(0);
    startArtworkSlideshow();
}

function createArtworkSlides() {
    const slidesContainer = document.getElementById('artwork-slides');
    if (!slidesContainer) return;
    
    slidesContainer.innerHTML = artworkSlides.map((artwork, index) => `
        <div class="artwork-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
            <img src="${artwork.image}" alt="${artwork.title}" class="artwork-image">
            <div class="artwork-overlay"></div>
        </div>
    `).join('');
}

function createSlideIndicators() {
    const indicatorsContainer = document.querySelector('.slide-indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = artworkSlides.map((_, index) => `
        <button class="slide-indicator ${index === 0 ? 'active' : ''}" 
                onclick="changeArtworkSlide(${index})" 
                data-slide="${index}">
        </button>
    `).join('');
}

function showArtworkSlide(index) {
    // Update slide visibility
    const slides = document.querySelectorAll('.artwork-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    // Update artwork info
    if (artworkSlides[index]) {
        updateArtworkInfo(artworkSlides[index]);
    }
    
    currentSlide = index;
}

function updateArtworkInfo(artwork) {
    const titleEl = document.getElementById('artwork-title');
    const artistEl = document.getElementById('artwork-artist');
    const linkEl = document.getElementById('artwork-link');
    
    if (titleEl) titleEl.textContent = artwork.title;
    if (artistEl) artistEl.textContent = artwork.artist;
    if (linkEl) linkEl.href = `artwork.html?id=${artwork.id}`;
}

function nextArtworkSlide() {
    const nextIndex = (currentSlide + 1) % artworkSlides.length;
    showArtworkSlide(nextIndex);
}

function changeArtworkSlide(index) {
    showArtworkSlide(index);
    
    // Reset interval when user manually changes slide
    clearInterval(slideInterval);
    slideInterval = setInterval(nextArtworkSlide, 3000);
}

function startArtworkSlideshow() {
    // Auto-advance every 3 seconds
    slideInterval = setInterval(nextArtworkSlide, 3000);
}

// Gallery Functions
function initializeGallery() {
    allArtworks = getAllArtworks();
    filteredArtworks = [...allArtworks];
    renderGallery(filteredArtworks);
}

function renderGallery(artworks) {
    const galleryGrid = document.getElementById('gallery-grid');
    const noResults = document.getElementById('no-results');
    
    if (!galleryGrid) return;
    
    if (artworks.length === 0) {
        galleryGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    galleryGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    galleryGrid.innerHTML = artworks.map(artwork => `
        <div class="artwork-card">
            <img src="${artwork.image}" alt="${artwork.title}" loading="lazy">
            <div class="card-info">
                <h3>${artwork.title}</h3>
                <p>ศิลปิน: ${artwork.artist}</p>
                <span class="category">${artwork.category}</span>
                <div style="margin-top: 1rem;">
                    <a href="artwork.html?id=${artwork.id}" class="btn-primary">ดูรายละเอียด</a>
                </div>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            filterArtworks(category);
        });
    });
}

function filterArtworks(category) {
    if (category === 'all') {
        filteredArtworks = [...allArtworks];
    } else {
        filteredArtworks = allArtworks.filter(artwork => artwork.category === category);
    }
    
    // Apply search filter if there's a search term
    const searchInput = document.getElementById('search-input');
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredArtworks = filteredArtworks.filter(artwork =>
            artwork.title.toLowerCase().includes(searchTerm) ||
            artwork.artist.toLowerCase().includes(searchTerm) ||
            artwork.category.toLowerCase().includes(searchTerm)
        );
    }
    
    renderGallery(filteredArtworks);
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
            
            let filtered = category === 'all' ? [...allArtworks] : allArtworks.filter(artwork => artwork.category === category);
            
            if (searchTerm) {
                filtered = filtered.filter(artwork =>
                    artwork.title.toLowerCase().includes(searchTerm) ||
                    artwork.artist.toLowerCase().includes(searchTerm) ||
                    artwork.category.toLowerCase().includes(searchTerm)
                );
            }
            
            renderGallery(filtered);
        });
    }
}

// Artwork Detail Functions
function loadArtworkDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = urlParams.get('id');
    
    const artworkContent = document.getElementById('artwork-content');
    const artworkNotFound = document.getElementById('artwork-not-found');
    
    if (!artworkId) {
        showArtworkNotFound();
        return;
    }
    
    const artworks = getAllArtworks();
    const artwork = artworks.find(art => art.id === artworkId);
    
    if (!artwork) {
        showArtworkNotFound();
        return;
    }
    
    artworkContent.innerHTML = `
        <div class="artwork-content">
            <div class="artwork-image-container">
                <img src="${artwork.image}" alt="${artwork.title}" class="artwork-image-large">
            </div>
            <div class="artwork-details">
                <h1>${artwork.title}</h1>
                <p class="artist">โดย: ${artwork.artist}</p>
                <span class="category-tag">${artwork.category}</span>
                <div class="concept">
                    <h3>แนวคิด/คอนเซ็ปต์</h3>
                    <p>${artwork.concept}</p>
                </div>
            </div>
        </div>
    `;
    
    artworkContent.style.display = 'block';
    artworkNotFound.style.display = 'none';
}

function showArtworkNotFound() {
    const artworkContent = document.getElementById('artwork-content');
    const artworkNotFound = document.getElementById('artwork-not-found');
    
    artworkContent.style.display = 'none';
    artworkNotFound.style.display = 'block';
}

// Admin Authentication Functions
function checkAdminAccess(pageType) {
    const passwordModal = document.getElementById('password-modal');
    const contentSection = document.getElementById(pageType === 'add' ? 'add-artwork-section' : 'admin-section');
    
    // Check if user is already authenticated for this session
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    
    if (isAuthenticated) {
        passwordModal.style.display = 'none';
        contentSection.style.display = 'block';
        return;
    }
    
    // Show password modal
    passwordModal.style.display = 'flex';
    contentSection.style.display = 'none';
    
    // Setup password form
    const passwordForm = document.getElementById('password-form');
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminAuthenticated', 'true');
            passwordModal.style.display = 'none';
            contentSection.style.display = 'block';
        } else {
            const errorDiv = document.getElementById('password-error');
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 3000);
        }
    });
}

function goToHome() {
    window.location.href = 'index.html';
}

// Add Artwork Functions
function setupAddArtworkForm() {
    const form = document.getElementById('add-artwork-form');
    const imageInput = document.getElementById('artwork-image');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    
    // Image preview
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('ไฟล์รูปภาพมีขนาดใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดน้อยกว่า 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const file = imageInput.files[0];
        
        if (!file) {
            showMessage('error', 'กรุณาเลือกรูปภาพ');
            return;
        }
        
        try {
            const base64Image = await fileToBase64(file);
            
            const artwork = {
                id: generateId(),
                title: formData.get('title'),
                artist: formData.get('artist'),
                category: formData.get('category'),
                concept: formData.get('concept'),
                image: base64Image,
                isBestWork: false,
                dateAdded: new Date().toISOString()
            };
            
            saveArtwork(artwork);
            showMessage('success', 'เพิ่มผลงานเรียบร้อยแล้ว!');
            
            setTimeout(() => {
                window.location.href = 'gallery.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error adding artwork:', error);
            showMessage('error', 'เกิดข้อผิดพลาดในการเพิ่มผลงาน');
        }
    });
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function generateId() {
    return 'artwork_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function saveArtwork(artwork) {
    const artworks = getAllArtworks();
    artworks.push(artwork);
    localStorage.setItem('artworks', JSON.stringify(artworks));
}

function resetForm() {
    const form = document.getElementById('add-artwork-form');
    const imagePreview = document.getElementById('image-preview');
    
    form.reset();
    imagePreview.style.display = 'none';
}

function showMessage(type, message) {
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');
    
    if (type === 'success') {
        successMsg.querySelector('p').textContent = message;
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
    } else {
        errorMsg.querySelector('p').textContent = message;
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
    }
    
    setTimeout(() => {
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';
    }, 5000);
}

// Admin Management Functions
function setupAdminPage() {
    loadAdminArtworks();
    setupAdminFilters();
}

function loadAdminArtworks() {
    const artworks = getAllArtworks();
    const adminGallery = document.getElementById('admin-gallery');
    const noArtworks = document.getElementById('no-artworks');
    const totalCount = document.getElementById('total-artworks');
    
    totalCount.textContent = artworks.length;
    
    if (artworks.length === 0) {
        adminGallery.style.display = 'none';
        noArtworks.style.display = 'block';
        return;
    }
    
    adminGallery.style.display = 'grid';
    noArtworks.style.display = 'none';
    
    adminGallery.innerHTML = artworks.map(artwork => `
        <div class="admin-card">
            <img src="${artwork.image}" alt="${artwork.title}" loading="lazy">
            <div class="admin-info">
                <h3>${artwork.title}</h3>
                <p>ศิลปิน: ${artwork.artist}</p>
                <span class="category">${artwork.category}</span>
                <div class="admin-actions">
                    <button class="edit-btn" onclick="openEditModal('${artwork.id}')">แก้ไข</button>
                    <button class="delete-btn" onclick="openDeleteModal('${artwork.id}', '${artwork.title}')">ลบ</button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupAdminFilters() {
    const searchInput = document.getElementById('admin-search');
    const filterSelect = document.getElementById('admin-filter');
    
    searchInput.addEventListener('input', filterAdminArtworks);
    filterSelect.addEventListener('change', filterAdminArtworks);
}

function filterAdminArtworks() {
    const searchTerm = document.getElementById('admin-search').value.toLowerCase();
    const category = document.getElementById('admin-filter').value;
    
    let artworks = getAllArtworks();
    
    if (category !== 'all') {
        artworks = artworks.filter(artwork => artwork.category === category);
    }
    
    if (searchTerm) {
        artworks = artworks.filter(artwork =>
            artwork.title.toLowerCase().includes(searchTerm) ||
            artwork.artist.toLowerCase().includes(searchTerm) ||
            artwork.category.toLowerCase().includes(searchTerm)
        );
    }
    
    renderAdminArtworks(artworks);
}

function renderAdminArtworks(artworks) {
    const adminGallery = document.getElementById('admin-gallery');
    
    adminGallery.innerHTML = artworks.map(artwork => `
        <div class="admin-card">
            <img src="${artwork.image}" alt="${artwork.title}" loading="lazy">
            <div class="admin-info">
                <h3>${artwork.title}</h3>
                <p>ศิลปิน: ${artwork.artist}</p>
                <span class="category">${artwork.category}</span>
                <div class="admin-actions">
                    <button class="edit-btn" onclick="openEditModal('${artwork.id}')">แก้ไข</button>
                    <button class="delete-btn" onclick="openDeleteModal('${artwork.id}', '${artwork.title}')">ลบ</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Edit Modal Functions
function openEditModal(artworkId) {
    const artworks = getAllArtworks();
    const artwork = artworks.find(art => art.id === artworkId);
    
    if (!artwork) return;
    
    const modal = document.getElementById('edit-modal');
    const form = document.getElementById('edit-form');
    
    // Populate form fields
    document.getElementById('edit-id').value = artwork.id;
    document.getElementById('edit-title').value = artwork.title;
    document.getElementById('edit-artist').value = artwork.artist;
    document.getElementById('edit-category').value = artwork.category;
    document.getElementById('edit-concept').value = artwork.concept;
    document.getElementById('current-image').src = artwork.image;
    
    // Setup form submission
    form.onsubmit = (e) => {
        e.preventDefault();
        updateArtwork(artworkId);
    };
    
    // Setup image preview
    const imageInput = document.getElementById('edit-image');
    const editPreview = document.getElementById('edit-preview');
    const editPreviewImg = document.getElementById('edit-preview-img');
    
    imageInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                editPreviewImg.src = e.target.result;
                editPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    };
    
    modal.style.display = 'flex';
}

async function updateArtwork(artworkId) {
    const form = document.getElementById('edit-form');
    const formData = new FormData(form);
    const imageInput = document.getElementById('edit-image');
    
    const artworks = getAllArtworks();
    const artworkIndex = artworks.findIndex(art => art.id === artworkId);
    
    if (artworkIndex === -1) return;
    
    try {
        // Update artwork data
        artworks[artworkIndex] = {
            ...artworks[artworkIndex],
            title: formData.get('title'),
            artist: formData.get('artist'),
            category: formData.get('category'),
            concept: formData.get('concept')
        };
        
        // Update image if new one provided
        if (imageInput.files[0]) {
            const base64Image = await fileToBase64(imageInput.files[0]);
            artworks[artworkIndex].image = base64Image;
        }
        
        localStorage.setItem('artworks', JSON.stringify(artworks));
        closeEditModal();
        loadAdminArtworks();
        
        alert('แก้ไขผลงานเรียบร้อยแล้ว');
        
    } catch (error) {
        console.error('Error updating artwork:', error);
        alert('เกิดข้อผิดพลาดในการแก้ไขผลงาน');
    }
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    const editPreview = document.getElementById('edit-preview');
    
    modal.style.display = 'none';
    editPreview.style.display = 'none';
    document.getElementById('edit-form').reset();
}

// Delete Modal Functions
function openDeleteModal(artworkId, artworkTitle) {
    const modal = document.getElementById('delete-modal');
    const titleSpan = document.getElementById('delete-title');
    const confirmBtn = document.getElementById('confirm-delete');
    
    titleSpan.textContent = artworkTitle;
    
    confirmBtn.onclick = () => {
        deleteArtwork(artworkId);
        closeDeleteModal();
    };
    
    modal.style.display = 'flex';
}

function deleteArtwork(artworkId) {
    const artworks = getAllArtworks();
    const filteredArtworks = artworks.filter(art => art.id !== artworkId);
    
    localStorage.setItem('artworks', JSON.stringify(filteredArtworks));
    loadAdminArtworks();
    
    alert('ลบผลงานเรียบร้อยแล้ว');
}

function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'none';
}

// Export data function
function exportData() {
    const artworks = getAllArtworks();
    const dataStr = JSON.stringify(artworks, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'artworks_backup.json';
    link.click();
}

// Mobile Navigation
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup mobile navigation for all pages
    setupMobileNavigation();
    
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initializeSlideshow();
            break;
        case 'gallery.html':
            initializeGallery();
            setupFilters();
            setupSearch();
            break;
        case 'artwork.html':
            loadArtworkDetail();
            break;
        case 'add.html':
            checkAdminAccess('add');
            setupAddArtworkForm();
            break;
        case 'admin.html':
            checkAdminAccess('admin');
            setupAdminPage();
            break;
    }
});

// Cleanup slideshow interval when leaving the page
window.addEventListener('beforeunload', () => {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
});