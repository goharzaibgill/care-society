/**
 * Care Society - University Landing Page
 * JavaScript for animations, interactions, and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all modules
    initNavbar();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
    initVolunteerForm();
    initSmoothScroll();
    initDedicationVideo();
});

/**
 * Navbar scroll behavior
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.slide-in-left, .slide-in-right, .activity-card, .project-card, .stat-item, .impact-video-content, .impact-video-container'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Animated counters
 */
function initCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                animateCounter(target, countTo);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => counterObserver.observe(el));
}

/**
 * Counter animation function
 */
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const stepTime = 20; // Update every 20ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

/**
 * Volunteer form handling
 */
function initVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                form.reset();
                showModal();
            }, 1500);
        });
    }
    
    // Close modal handlers
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
}

/**
 * Show success modal
 */
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Hide success modal
 */
function hideModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Dedication Video Hover functionality
 */
function initDedicationVideo() {
    const videoWrapper = document.getElementById('dedicationVideoWrapper');
    const video = document.getElementById('dedicationVideo');
    const overlay = document.getElementById('dedicationVideoOverlay');
    
    if (videoWrapper && video && overlay) {
        videoWrapper.addEventListener('mouseenter', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.log("Autoplay prevented:", error));
            }
            overlay.style.opacity = '0';
        });
        
        videoWrapper.addEventListener('mouseleave', () => {
            video.pause();
            overlay.style.opacity = '1';
        });
    }
}

/**
 * Parallax effect for hero section (subtle)
 */
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

/**
 * Button ripple effect
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Re-initialize icons when DOM changes
 * Useful for dynamically added content
 */
function refreshIcons() {
    lucide.createIcons();
}

// Expose refresh function globally for debugging
window.refreshIcons = refreshIcons;
