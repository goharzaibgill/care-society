// Volunteer Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu toggle
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

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up, .benefit-card, .faq-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');

            // Update icon
            const icon = item.querySelector('.faq-question i');
            if (item.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'minus');
            } else {
                icon.setAttribute('data-lucide', 'plus');
            }
            lucide.createIcons();
        });
    });

    // Volunteer Form Handling
    const volunteerForm = document.getElementById('volunteerForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            volunteerForm.classList.add('loading');

            // Simulate form submission
            setTimeout(() => {
                volunteerForm.classList.remove('loading');

                // Show success modal
                if (successModal) {
                    successModal.classList.add('active');
                }

                // Reset form
                volunteerForm.reset();

                // Reset select label
                const selectLabel = volunteerForm.querySelector('.select-label');
                if (selectLabel) {
                    selectLabel.style.top = '50%';
                    selectLabel.style.transform = 'translateY(-50%)';
                    selectLabel.style.fontSize = '0.95rem';
                    selectLabel.style.color = 'var(--text-secondary)';
                }
            }, 2000);
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }

    // Close modal on outside click
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Form input animations
    const formInputs = document.querySelectorAll('.volunteer-form input, .volunteer-form textarea, .volunteer-form select');

    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Select field special handling
    const selectField = document.getElementById('interest');
    const selectLabel = document.querySelector('.select-label');

    if (selectField && selectLabel) {
        selectField.addEventListener('change', function() {
            if (this.value) {
                selectLabel.style.top = '-10px';
                selectLabel.style.transform = 'translateY(0)';
                selectLabel.style.fontSize = '0.8rem';
                selectLabel.style.color = 'var(--accent-orange)';
                selectLabel.style.fontWeight = '600';
            }
        });

        selectField.addEventListener('focus', function() {
            selectLabel.style.top = '-10px';
            selectLabel.style.transform = 'translateY(0)';
            selectLabel.style.fontSize = '0.8rem';
            selectLabel.style.color = 'var(--accent-orange)';
            selectLabel.style.fontWeight = '600';
        });
    }

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');

                animateCounter(target, numericValue, suffix);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    // Add CSS class for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .slide-in-left.animate-on-scroll {
            transform: translateX(-50px);
        }

        .slide-in-right.animate-on-scroll {
            transform: translateX(50px);
        }

        .slide-in-left.animate-on-scroll.visible,
        .slide-in-right.animate-on-scroll.visible {
            transform: translateX(0);
        }

        .benefit-card.animate-on-scroll {
            transform: translateY(40px);
        }

        .benefit-card.animate-on-scroll.visible {
            transform: translateY(0);
        }

        .faq-item.animate-on-scroll {
            transform: translateY(20px);
        }

        .faq-item.animate-on-scroll.visible {
            transform: translateY(0);
        }

        .form-group.focused .form-icon {
            color: var(--accent-orange);
        }
    `;
    document.head.appendChild(style);
});
