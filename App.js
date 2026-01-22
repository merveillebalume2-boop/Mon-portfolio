
// VARIABLES GLOBALES

const menuBurger = document.getElementById('menu-burger');
const navigation = document.querySelector('.navigation');
const preloader = document.querySelector('.preloader');
const backToTopBtn = document.querySelector('.back-to-top');
const themeSwitcher = document.querySelector('.theme-switcher');
const contactForm = document.getElementById('contact-form');
const downloadCvBtn = document.getElementById('download-cv');
const currentYearSpan = document.getElementById('current-year');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navigation a');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const skillProgressBars = document.querySelectorAll('.skill-progress-bar');


// PRELOADER

window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('loaded');
        
        // Cache le preloader après l'animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});


// MENU BURGEUR
menuBurger.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuBurger.classList.toggle('bx-x');
    
    // Empêche le scroll quand le menu est ouvert
    document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : 'auto';
});

// Fermer le menu en cliquant sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        menuBurger.classList.remove('bx-x');
        document.body.style.overflow = 'auto';
    });
});

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (!navigation.contains(e.target) && !menuBurger.contains(e.target) && navigation.classList.contains('active')) {
        navigation.classList.remove('active');
        menuBurger.classList.remove('bx-x');
        document.body.style.overflow = 'auto';
    }
});


// SCROLL SPY NAVIGATION

window.addEventListener('scroll', () => {
    // Header sticky
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Back to top button
    backToTopBtn.classList.toggle('show', window.scrollY > 300);
    
    // Navigation active
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Animation des barres de compétences
    animateSkillsOnScroll();
});


// ANIMATION TEXTE TYPED
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.multiple-text')) {
        const typed = new Typed('.multiple-text', {
            strings: [
                'Développeur Web', 
                'Designer UI/UX', 
                'Freelancer',
                'Passionné de Tech'
            ],
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});


// ANIMATION DES COMPÉTENCES

function animateSkillsOnScroll() {
    const aboutSection = document.getElementById('about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (aboutPosition < screenPosition) {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
}


// BACK TO TOP

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// THEME SWITCHER

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Changer l'icône
    const icon = themeSwitcher.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Charger le thème sauvegardé
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = themeSwitcher.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});


// PORTFOLIO MODAL

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        // Créer le modal
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img class="modal-img" src="${item.querySelector('img').src}" alt="${item.querySelector('h3').textContent}">
                <div class="modal-info">
                    <h3 class="modal-title">${item.querySelector('h3').textContent}</h3>
                    <p class="modal-desc">Cliquez sur "Voir le projet" pour explorer cette réalisation.</p>
                    <div class="modal-tech">
                        <span class="tech-tag">HTML/CSS</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">Responsive</span>
                    </div>
                    <a class="modal-link" href="#" target="_blank">Voir le projet</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Afficher le modal
        setTimeout(() => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
        
        // Fermer le modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        // Fermer en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
        
        // Fermer avec la touche ESC
        document.addEventListener('keydown', function closeModalOnEscape(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                    document.removeEventListener('keydown', closeModalOnEscape);
                }, 300);
            }
        });
    });
});


// FORMULAIRE DE CONTACT

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation basique
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Veuillez entrer un email valide', 'error');
            return;
        }
        
        // Simulation d'envoi
        showNotification('Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.', 'success');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


// NOTIFICATIONS

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="close-notif">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fermer la notification
    notification.querySelector('.close-notif').addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}


// TÉLÉCHARGEMENT CV

if (downloadCvBtn) {
    
}
   