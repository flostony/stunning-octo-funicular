// Simple JavaScript to load dummy images into the gallery
const galleryImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'
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
