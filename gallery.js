/**
 * Gallery Page JavaScript
 * Superior Care Society
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize gallery modules
    initGalleryAnimations();
    initLightbox();
});

/**
 * Gallery scroll animations
 */
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    galleryItems.forEach(item => observer.observe(item));
}

/**
 * Lightbox functionality
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentIndex = 0;
    const totalImages = galleryItems.length;
    
    // Open lightbox on gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
            closeLightbox();
        }
    });
    
    // Navigation
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                navigateLightbox(1); // Swipe left, go next
            } else {
                navigateLightbox(-1); // Swipe right, go prev
            }
        }
    }
    
    function openLightbox() {
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Re-initialize Lucide icons for lightbox
        lucide.createIcons();
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateLightbox(direction) {
        currentIndex += direction;
        
        // Loop navigation
        if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        } else if (currentIndex >= totalImages) {
            currentIndex = 0;
        }
        
        // Animate image change
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            updateLightboxImage();
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'scale(1)';
        }, 200);
    }
    
    function updateLightboxImage() {
        const currentItem = galleryItems[currentIndex];
        const img = currentItem.querySelector('img');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = img.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
    }
}

/**
 * Navbar scroll behavior for gallery page
 */
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/**
 * Mobile menu toggle
 */
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}
