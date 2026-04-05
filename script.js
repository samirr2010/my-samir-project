// GameHub Online Game Store JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'visible');
                backToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showError('Адрес электронной почты обязателен');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showError('Пожалуйста, введите действительный адрес электронной почты');
                return;
            }
            
            // Simulate form submission
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<div class="loading-spinner"></div> подписка...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // Show success message
                successMessage.classList.remove('hidden');
                
                // Reset form
                emailInput.value = '';
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide error if shown
                emailError.classList.add('hidden');
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
        
        function showError(message) {
            emailError.textContent = message;
            emailError.classList.remove('hidden');
            emailInput.classList.add('border-red-500');
            
            // Remove error on input
            emailInput.addEventListener('input', function() {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-red-500');
            }, { once: true });
        }
    }
    
    // Game Purchase/Download Buttons
    const gameButtons = document.querySelectorAll('.game-card button, .deal-card button');
    
    gameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameCard = this.closest('.game-card, .deal-card');
            const gameName = gameCard.querySelector('h3').textContent;
            const priceElement = gameCard.querySelector('.text-green-400, .font-bold.text-green-400');
            const price = priceElement ? priceElement.textContent : 'FREE';
            
            // Check if it's a free game
            const isFree = price === 'FREE' || price.includes('БЕСПЛАТНО');
            
            if (isFree) {
                showNotification(`начинаеться скачиваться for: ${gameName}`, 'success');
                
                // Simulate download
                const originalText = this.innerHTML;
                this.innerHTML = '<div class="loading-spinner"></div> скачиваеться...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-check mr-2"></i>скачалься!';
                    this.classList.remove('bg-gradient-to-r', 'from-indigo-700', 'to-purple-700');
                    this.classList.add('bg-green-600');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('bg-green-600');
                        this.classList.add('bg-gradient-to-r', 'from-indigo-700', 'to-purple-700');
                    }, 2000);
                }, 2000);
            } else {
                showNotification(`КУПЛЕНО ${gameName}  ЗА ${price}`, 'info');
                
                // Simulate adding to cart
                const cartButton = document.querySelector('button:contains("Cart")');
                if (cartButton) {
                    const cartText = cartButton.textContent;
                    const match = cartText.match(/\((\d+)\)/);
                    const currentCount = match ? parseInt(match[1]) : 0;
                    cartButton.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i>Cart (${currentCount + 1})`;
                }
            }
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image Lazy Loading Simulation
    const images = document.querySelectorAll('img');
    
    // Add fade-in effect to images
    images.forEach(img => {
        img.classList.add('game-image', 'loading');
        
        // If image is already loaded, show it
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        } else {
            // Otherwise, wait for load
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
            
            // If image fails to load, show placeholder
            img.addEventListener('error', function() {
                console.log('Image failed to load:', this.src);
                this.classList.remove('loading');
                this.classList.add('loaded');
                // Set a fallback image
                this.src = 'https://static.photos/gaming/640x360/99';
            });
        }
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add special animations for certain elements
                if (entry.target.classList.contains('trending-card')) {
                    const fireIcon = entry.target.querySelector('.fa-fire');
                    if (fireIcon) {
                        fireIcon.classList.add('fire-icon');
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.game-card, .category-card, .platform-card, .trending-card, .deal-card').forEach(card => {
        observer.observe(card);
    });
    
    // Helper function to show notifications
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        
        let icon = 'info-circle';
        let borderColor = 'indigo-600';
        
        if (type === 'success') {
            icon = 'check-circle';
            borderColor = 'green-600';
        } else if (type === 'error') {
            icon = 'exclamation-circle';
            borderColor = 'red-600';
        }
        
        notification.className = `fixed top-24 left-6 bg-gray-900 border-l-4 border-${borderColor} text-white px-6 py-4 rounded-lg shadow-xl z-50 transform translate-x-full opacity-0 transition-all duration-300`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${icon} text-${borderColor} mr-3 text-xl"></i>
                <div>
                    <p class="font-medium">${message}</p>
                    <p class="text-sm text-gray-400 mt-1">samirGaming</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
            notification.classList.add('translate-x-', 'opacity-100');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('translate-x-0', 'opacity-100');
            notification.classList.add('translate-x-full', 'opacity-0');
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add hover effect to social media icons
    const socialIcons = document.querySelectorAll('footer a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const iconElement = this.querySelector('i');
            const originalClass = iconElement.className;
            
            // Add bounce animation
            iconElement.className = originalClass + ' animate-bounce';
            
            // Remove animation after 1 second
            setTimeout(() => {
                iconElement.className = originalClass;
            }, 1000);
        });
    });
    
    // Initialize with a welcome message
    setTimeout(() => {
        showNotification('Добро пожаловать в samirGaming! Откройте для себя тысячи бесплатных и платных игр.', 'success');
    }, 1000);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
        
        // Tab key navigation highlights current section
        if (e.key === 'Tab') {
            const currentSection = getCurrentSection();
            highlightNavLink(currentSection);
        }
    });
    
    // Function to get current section in viewport
    function getCurrentSection() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section.id;
            }
        });
        
        return currentSection;
    }
    
    // Function to highlight current nav link
    function highlightNavLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('text-indigo-400');
            } else {
                link.classList.remove('text-indigo-400');
            }
        });
    }
    
    // Update nav highlight on scroll
    window.addEventListener('scroll', function() {
        const currentSection = getCurrentSection();
        highlightNavLink(currentSection);
    });
    
    // Simulate game countdown for deals
    const dealCountdowns = document.querySelectorAll('.fa-clock');
    dealCountdowns.forEach(countdown => {
        const parent = countdown.parentElement;
        if (parent && parent.textContent.includes('left')) {
            // This would normally be a real countdown timer
            // For demo, we'll just leave the static text
        }
    });
    
    // Add to cart functionality for all purchase buttons
    document.querySelectorAll('.game-card button, .deal-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't trigger if it's a download button for free games
            if (this.textContent.includes('Download')) return;
            
            // For purchase buttons, simulate adding to cart
            const gameName = this.closest('.game-card, .deal-card').querySelector('h3').textContent;
            
            // Find cart button and update count
            const cartButtons = document.querySelectorAll('button');
            cartButtons.forEach(btn => {
                if (btn.textContent.includes('Cart')) {
                    const cartText = btn.textContent;
                    const match = cartText.match(/\((\d+)\)/);
                    const currentCount = match ? parseInt(match[1]) : 0;
                    btn.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i>Cart (${currentCount + 1})`;
                    
                    // Add pulse animation to cart button
                    btn.classList.add('pulse-button');
                    setTimeout(() => {
                        btn.classList.remove('pulse-button');
                    }, 2000);
                }
            });
        });
    });
});