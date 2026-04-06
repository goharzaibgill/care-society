/**
 * Team Page - Superior Care Society
 * JavaScript for team page interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize modules
    initTeamScrollAnimations();
    initMemberFilter();
    initMobileMenu();
    initSmoothScroll();
});

/**
 * Team Page Scroll Animations
 */
function initTeamScrollAnimations() {
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
    
    // Observe executive cards
    const executiveCards = document.querySelectorAll('.executive-card');
    executiveCards.forEach(card => observer.observe(card));
    
    // Observe member cards
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => observer.observe(card));
    
    // Observe slide animations
    const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up');
    slideElements.forEach(el => observer.observe(el));
}

/**
 * Member Filter Functionality
 */
function initMemberFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter member cards
            memberCards.forEach(card => {
                const department = card.getAttribute('data-department');
                
                if (filter === 'all' || department === filter) {
                    card.classList.remove('hidden');
                    // Small delay for smooth appearance
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

/**
 * Mobile Menu Toggle
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
 * Smooth Scroll for anchor links
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
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Navbar scroll behavior for team page
 */
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        const currentScroll = window.pageYOffset;
        
        // Always keep navbar styled on team page (since hero is smaller)
        if (currentScroll > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

/**
 * Add parallax effect to team hero
 */
window.addEventListener('scroll', function() {
    const teamHero = document.querySelector('.team-hero');
    if (teamHero) {
        const scrolled = window.pageYOffset;
        const heroContent = teamHero.querySelector('.team-hero-content');
        if (heroContent && scrolled < window.innerHeight * 0.6) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.5));
        }
    }
});
