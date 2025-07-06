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
