// Simple JavaScript to load dummy images into the gallery
const galleryImages = [
    'images/1.jpg',
    'images/14.jpg',
    'images/15.jpg',
    'images/20.jpg',
    'images/16.jpg',
    'images/17.jpg',
    'images/19.jpg',
    'images/18.jpg',
    'images/7.jpg',
    'images/6.jpg',
    'images/9.jpg',
    'images/10.jpg',
    'images/11.jpg',
    'images/8.jpg',
    'images/21.jpg',
    'images/12.jpg',
    'images/22.jpg',
    'images/2.jpg',
    'images/5.jpg',
    'images/3.jpg',
    'images/ug.png',
    'images/eg.png',
    'images/og1.png',
    'images/og2.png',
];

const gallery = document.getElementById('gallery');

gallery.innerHTML = `
  <div class="gallery-main-wrapper position-relative d-flex justify-content-center align-items-center mb-3">
    <button id="prevImg" class="btn btn-light gallery-nav-btn position-absolute start-0 top-50 translate-middle-y ms-2">&#8592;</button>
    <img id="mainGalleryImg" src="${galleryImages[0]}" class="img-fluid rounded shadow gallery-main-img" alt="House photo" />
    <button id="nextImg" class="btn btn-light gallery-nav-btn position-absolute end-0 top-50 translate-middle-y me-2">&#8594;</button>
  </div>
  <div class="gallery-thumbnails d-flex justify-content-center flex-wrap gap-2">
    ${galleryImages.map((src, idx) => `<img src="${src}" class="gallery-thumb rounded ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="height:70px;cursor:pointer;object-fit:cover;">`).join('')}
  </div>
`;

let currentIdx = 0;
const mainGalleryImg = document.getElementById('mainGalleryImg');
const thumbs = document.querySelectorAll('.gallery-thumb');

function updateGallery(idx) {
    currentIdx = idx;
    mainGalleryImg.src = galleryImages[idx];
    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === idx);
    });
}

document.getElementById('prevImg').onclick = function() {
    updateGallery((currentIdx - 1 + galleryImages.length) % galleryImages.length);
};
document.getElementById('nextImg').onclick = function() {
    updateGallery((currentIdx + 1) % galleryImages.length);
};
thumbs.forEach(thumb => {
    thumb.onclick = function() {
        updateGallery(Number(thumb.dataset.idx));
    };
});

// --- FULLSCREEN OVERLAY FUNCTIONALITY ---
const overlay = document.createElement('div');
overlay.id = 'galleryOverlay';
overlay.style.cssText = `
  display:none; position:fixed; z-index:2000; inset:0; background:rgba(0,0,0,0.92); 
  justify-content:center; align-items:center; flex-direction:column;
`;
overlay.innerHTML = `
  <button id="closeOverlay" style="position:absolute;top:24px;right:32px;font-size:2.5rem;color:#fff;background:none;border:none;z-index:2010;">&times;</button>
  <button id="overlayPrev" class="btn btn-light gallery-nav-btn position-absolute start-0 top-50 translate-middle-y ms-2">&#8592;</button>
  <img id="overlayImg" src="" style="max-width:90vw;max-height:80vh;border-radius:12px;box-shadow:0 4px 32px #000;" />
  <button id="overlayNext" class="btn btn-light gallery-nav-btn position-absolute end-0 top-50 translate-middle-y me-2">&#8594;</button>
`;
document.body.appendChild(overlay);

const overlayImg = document.getElementById('overlayImg');
const closeOverlay = document.getElementById('closeOverlay');
const overlayPrev = document.getElementById('overlayPrev');
const overlayNext = document.getElementById('overlayNext');

function showOverlay(idx) {
    overlay.style.display = 'flex';
    overlayImg.src = galleryImages[idx];
    overlayImg.dataset.idx = idx;
}
function hideOverlay() {
    overlay.style.display = 'none';
}
function overlayNav(dir) {
    let idx = Number(overlayImg.dataset.idx);
    idx = (idx + dir + galleryImages.length) % galleryImages.length;
    overlayImg.src = galleryImages[idx];
    overlayImg.dataset.idx = idx;
    // Also update main gallery selection for consistency
    updateGallery(idx);
}

closeOverlay.onclick = hideOverlay;
overlayPrev.onclick = () => overlayNav(-1);
overlayNext.onclick = () => overlayNav(1);

// Open overlay on main image or thumbnail click
mainGalleryImg.onclick = () => showOverlay(currentIdx);
thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('dblclick', () => showOverlay(idx)); // double click for desktop
    thumb.addEventListener('touchend', (e) => {
        // single tap for mobile
        if (e.changedTouches.length === 1) showOverlay(idx);
    });
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideOverlay();
});

document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'flex') {
        if (e.key === 'ArrowLeft') overlayNav(-1);
        if (e.key === 'ArrowRight') overlayNav(1);
        if (e.key === 'Escape') hideOverlay();
    }
});

// --- SWIPE SUPPORT FOR MOBILE ---
let startX = null;
overlayImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) startX = e.touches[0].clientX;
});
overlayImg.addEventListener('touchend', (e) => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    let dx = endX - startX;
    if (Math.abs(dx) > 50) {
        if (dx > 0) overlayNav(-1); // swipe right, prev
        else overlayNav(1);         // swipe left, next
    }
    startX = null;
});
