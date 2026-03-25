// VARIABLES GLOBALES
const menuBurger = document.getElementById('menu-burger');
const navigation = document.querySelector('.navigation');
const preloader = document.querySelector('.preloader');
const backToTopBtn = document.querySelector('.back-to-top');
const themeSwitcher = document.querySelector('.theme-switcher');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navigation a');
const skillProgressBars = document.querySelectorAll('.skill-progress-bar');

// PRELOADER
window.addEventListener('load', () => {
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 800);
    }
});

// MENU BURGER
menuBurger.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuBurger.classList.toggle('bx-x');
});

// Fermer le menu lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        menuBurger.classList.remove('bx-x');
    });
});

// SCROLL EVENTS
window.addEventListener('scroll', () => {
    // Header sticky
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
    
    // Back to top button
    if(backToTopBtn) {
        backToTopBtn.classList.toggle('active', window.scrollY > 500);
    }
    
    // Scroll Spy (Active Links)
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });

    // Skills Animation
    animateSkills();
});

// ANIMATION DES COMPÉTENCES
function animateSkills() {
    sections.forEach(sec => {
        if(sec.id === 'about') {
            const top = window.scrollY;
            const offset = sec.offsetTop - 400;
            if(top >= offset) {
                skillProgressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }
        }
    });
}

// TEXTE ANIMÉ (TYPED.JS)
if (document.querySelector('.multiple-text')) {
    new Typed('.multiple-text', {
        strings: ['Frontend Developer', 'UI/UX Designer', 'Tech Enthusiast', 'Freelancer'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true
    });
}

// THEME SWITCHER
themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeSwitcher.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// LOAD SAVED THEME
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeSwitcher.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
});

// BACK TO TOP ACTION
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// YEAR AUTO
const year = document.getElementById('current-year');
if(year) year.innerText = new Date().getFullYear();