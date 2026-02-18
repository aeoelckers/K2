/* ============================================
   KPS Logistics - Main JavaScript
   ============================================ */

(function () {
    'use strict';

    /* --- Header scroll effect --- */
    const header = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero');

    function updateHeader() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /* --- Mobile menu --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(10,22,40,0.4);z-index:998;opacity:0;transition:opacity 0.3s;pointer-events:none;';
    document.body.appendChild(overlay);

    function openMenu() {
        menuToggle.classList.add('open');
        mainNav.classList.add('open');
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuToggle.classList.remove('open');
        mainNav.classList.remove('open');
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', function () {
        if (mainNav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    /* --- Smooth scroll for anchor links --- */
    const headerHeight = header.offsetHeight;
    const allAnchors = document.querySelectorAll('a[href^="#"]');

    allAnchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    /* --- Active nav link on scroll (throttled with rAF) --- */
    const sections = document.querySelectorAll('section[id]');
    const sectionData = Array.from(sections).map(function (section) {
        var link = document.querySelector('.main-nav a[href="#' + section.id + '"]');
        return { section: section, link: link };
    }).filter(function (entry) {
        return entry.link !== null;
    });

    var scrollTicking = false;

    function updateActiveNav() {
        var fromTop = window.scrollY + headerHeight + 20;
        var activeLink = null;
        sectionData.forEach(function (entry) {
            if (entry.section.offsetTop <= fromTop &&
                entry.section.offsetTop + entry.section.offsetHeight > fromTop) {
                activeLink = entry.link;
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });
        if (activeLink) activeLink.classList.add('active');
    }

    window.addEventListener('scroll', function () {
        updateHeader();
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(function () {
                updateActiveNav();
                scrollTicking = false;
            });
        }
    });

    /* --- Contact form handling --- */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var formData = new FormData(contactForm);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.textContent = 'Enviado';
                submitBtn.style.background = '#25d366';
                contactForm.reset();
                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2500);
            }, 1200);
        });
    }

    /* --- WhatsApp button --- */
    var whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function () {
            var phone = '56912345678';
            var message = encodeURIComponent('Hola, me interesa conocer los servicios de KPS Logistics.');
            window.open('https://wa.me/' + phone + '?text=' + message, '_blank');
        });
    }

    /* --- Intersection Observer for fade-in animations --- */
    var animatedElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* --- Initialize --- */
    updateHeader();
    updateActiveNav();

})();
