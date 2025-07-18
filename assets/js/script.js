// Portfolio Website JavaScript - Jocelyn Beauchesne

document.addEventListener('DOMContentLoaded', function() {
    // Initialize shared navigation
    initSharedNavigation();
    
    // Navigation highlighting
    highlightActiveNavigation();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Navbar transparency on scroll
    initNavbarScrollEffect();
    
    // Initialize dynamic navbar height
    initDynamicNavbarHeight();
});

/**
 * Initialize shared navigation component
 */
function initSharedNavigation() {
    const navContainer = document.getElementById('shared-nav');
    
    if (navContainer) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <strong class="brand-text">JB</strong>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">
                                    <i class="fas fa-home d-lg-none"></i>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'experience.html' ? 'active' : ''}" href="experience.html">
                                    <i class="fas fa-briefcase d-lg-none"></i>
                                    <span>Experience</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'publications.html' ? 'active' : ''}" href="publications.html">
                                    <i class="fas fa-file-alt d-lg-none"></i>
                                    <span>Publications</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'education.html' ? 'active' : ''}" href="education.html">
                                    <i class="fas fa-graduation-cap d-lg-none"></i>
                                    <span>Education</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        
        // Initialize mobile-specific behaviors
        initMobileNavigation();
    }
}

/**
 * Initialize mobile-specific navigation behaviors
 */
function initMobileNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbar && navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) { // Bootstrap lg breakpoint
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        hide: true
                    });
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    hide: true
                });
            }
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                if (window.innerWidth >= 992) {
                    navbarCollapse.classList.remove('show');
                }
            }, 100);
        });
    }
}

/**
 * Initialize dynamic navbar height calculation
 */
function initDynamicNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Function to update navbar height
        const updateNavbarHeight = () => {
            const navbarHeight = navbar.offsetHeight;
            document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
        };
        
        // Initial calculation
        updateNavbarHeight();
        
        // Update on window resize
        window.addEventListener('resize', updateNavbarHeight);
        
        // Update on orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(updateNavbarHeight, 100);
        });
        
        // Update when mobile menu opens/closes
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            const observer = new MutationObserver(updateNavbarHeight);
            observer.observe(navbarCollapse, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
}



/**
 * Highlight active navigation based on current page
 */
function highlightActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add navbar transparency effect on scroll
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(25px)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });
    }
}



/**
 * Copy email to clipboard functionality
 */
function copyEmailToClipboard() {
    const email = 'jocelyn.beauchesne@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Email copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy email');
        }
        
        document.body.removeChild(textArea);
    }
}

/**
 * Show toast notification
 */
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

/**
 * Initialize project filtering (for projects page)
 */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }
                });
            });
        });
    }
}

/**
 * Initialize typing animation for hero section
 */
function initTypingAnimation() {
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        const texts = [
            'Lead Research Engineer',
            'Applied Scientist',
            'ML Innovation Expert',
            'AI Product Strategist'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = 150;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        typeWriter();
    }
}

/**
 * Add click event to email links for copying
 */
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href^="mailto:"]')) {
        e.preventDefault();
        copyEmailToClipboard();
    }
});

/**
 * Initialize all features when page loads
 */
window.addEventListener('load', function() {
    initProjectFiltering();
    initTypingAnimation();
}); 