// Gallery Data Array
const galleryData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    title: "Misty Pine Forest",
    category: "nature",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    title: "Modern Glass Architecture",
    category: "architecture",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    title: "Circuit Board Electronics",
    category: "technology",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    title: "Serene Mountain Valley",
    category: "nature",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    title: "Minimalist Interior Design",
    category: "architecture",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    title: "Coding & Binary Code",
    category: "technology",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Tropical Beach Sunset",
    category: "nature",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    title: "Developer Workspace",
    category: "technology",
  },
];

// State variables
let currentFilteredImages = [...galleryData];
let currentIndex = 0;

// DOM Elements
const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Render Gallery function (ES6 Arrow Function)
const renderGallery = (images) => {
  galleryGrid.innerHTML = "";
  images.forEach((item, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryItem.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="item-overlay">
        <span>${item.category}</span>
        <h3>${item.title}</h3>
      </div>
    `;

    // Open lightbox on click
    galleryItem.addEventListener("click", () => {
      openLightbox(index, images);
    });

    galleryGrid.appendChild(galleryItem);
  });
};

// Open Lightbox
const openLightbox = (index, images) => {
  currentFilteredImages = images;
  currentIndex = index;
  updateLightboxContent();
  lightbox.classList.add("active");
};

// Close Lightbox
const closeLightbox = () => {
  lightbox.classList.remove("active");
};

// Update Lightbox Content
const updateLightboxContent = () => {
  const currentItem = currentFilteredImages[currentIndex];
  lightboxImg.src = currentItem.src;
  lightboxCaption.innerText = currentItem.title;
};

// Next Image navigation
const showNextImage = () => {
  currentIndex = (currentIndex + 1) % currentFilteredImages.length;
  updateLightboxContent();
};

// Previous Image navigation
const showPrevImage = () => {
  currentIndex =
    (currentIndex - 1 + currentFilteredImages.length) %
    currentFilteredImages.length;
  updateLightboxContent();
};

// Filter Button Click Event Handlers
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    const filterValue = e.target.getAttribute("data-filter");

    if (filterValue === "all") {
      renderGallery(galleryData);
      currentFilteredImages = [...galleryData];
    } else {
      const filtered = galleryData.filter(
        (item) => item.category === filterValue,
      );
      renderGallery(filtered);
      currentFilteredImages = filtered;
    }
  });
});

// Event Listeners for Lightbox Controls
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

// Close lightbox on clicking outside image container
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard Navigation support
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNextImage();
  if (e.key === "ArrowLeft") showPrevImage();
});

// Initial Render
renderGallery(galleryData);
