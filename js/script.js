// Page Loader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('fade-out');
    }, 500);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Show/Hide Sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
    }
    
    // Reset form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
    
    // Hide success message after 5 seconds
    setTimeout(function() {
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }, 5000);
    
    console.log('Form submitted!');
}

// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Close all other FAQ items
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
}

// Handle navigation on page load
window.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.slice(1) || 'hero';
    showSection(hash);
    
    // Initialize components
    initializeCounters();
    initializeSliders();
    initializeTestimonialCarousel();
    initializeMobileCTA();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        showSection(targetId);
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
    
    // Handle mobile sticky CTA visibility
    handleMobileCTAVisibility();
});

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 20);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Transformation Slider
let currentSlide = 0;
let slideInterval;

function initializeSliders() {
    const slider = document.getElementById('transformationSlider');
    if (!slider) return;
    
    const slides = slider.children;
    const totalSlides = slides.length;
    
    // Auto-play slider
    function autoSlide() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }
    
    // Start auto-play
    autoSlide();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlide();
    });
    
    function updateSlider() {
        const translateX = -currentSlide * 100;
        slider.style.transform = `translateX(${translateX}%)`;
    }
    
    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    };
    
    window.previousSlide = function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    };
}

// Testimonial Carousel
let currentTestimonial = 0;
let testimonialInterval;

function initializeTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials every 6 seconds
    testimonialInterval = setInterval(nextTestimonial, 6000);
    
    // Pause on hover
    const testimonialSlider = document.getElementById('testimonialSlider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 6000);
        });
    }
}

// Mobile Sticky CTA
function initializeMobileCTA() {
    const mobileCTA = document.getElementById('mobileCTA');
    if (!mobileCTA) return;
    
    // Show/hide based on scroll position
    function handleMobileCTAVisibility() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show after scrolling past hero section (roughly 600px)
        // Hide when near footer (last 200px of page)
        const showCTA = scrollY > 600 && scrollY < documentHeight - windowHeight - 200;
        
        if (window.innerWidth <= 768) {
            mobileCTA.style.transform = showCTA ? 'translateY(0)' : 'translateY(100%)';
        } else {
            mobileCTA.style.transform = 'translateY(100%)';
        }
    }
    
    // Make function globally available
    window.handleMobileCTAVisibility = handleMobileCTAVisibility;
    
    // Initial check
    handleMobileCTAVisibility();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    // Observe service cards
    document.querySelectorAll('.service-card-new').forEach(card => {
        observer.observe(card);
    });
    
    // Observe advantage cards
    document.querySelectorAll('.advantage').forEach(card => {
        observer.observe(card);
    });
    
    // Observe timeline steps
    document.querySelectorAll('.timeline-step').forEach(step => {
        observer.observe(step);
    });
});

// Smooth scroll polyfill for older browsers
if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based functionality here
    handleMobileCTAVisibility();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler); 